import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { uploadProfileImage } from '../lib/storageHelper';

interface AuthCredentials {
  email: string;
  password: string;
}

interface SignUpData extends AuthCredentials {
  fullName?: string; // Keeping for backward compatibility
  firstName?: string;
  lastName?: string;
  username?: string;
  avatar?: File | null;
}

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Get current user with profile data
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) return null;

      // Fetch user profile from your custom users table with explicit column selection
      const { data: profile, error } = await supabase
        .from('users')
        .select(
          `
          id,
          username,
          first_name,
          last_name,
          avatar_image_url,
          created_at,
          updated_at
        `
        )
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        // Return auth user with basic info if profile fetch fails
        return {
          id: authUser.id,
          email: authUser.email,
          username: null,
          first_name: null,
          last_name: null,
          avatar_url: null,
        };
      }

      // Merge auth user with profile data
      return {
        id: authUser.id,
        email: authUser.email,
        username: profile.username,
        first_name: profile.first_name,
        last_name: profile.last_name,
        avatar_url: profile.avatar_image_url,
        created_at: profile.created_at,
        updated_at: profile.updated_at,
      };
    },
    staleTime: Infinity,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: AuthCredentials) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (!data.user) throw new Error('No user returned'); // Fetch profile data after successful login
      const { data: profile } = await supabase
        .from('users')
        .select(
          `
          id,
          username,
          first_name,
          last_name,
          avatar_image_url,
          created_at,
          updated_at
        `
        )
        .eq('id', data.user.id)
        .single();

      return {
        ...data,
        user: {
          id: data.user.id,
          email: data.user.email,
          username: profile?.username,
          first_name: profile?.first_name,
          last_name: profile?.last_name,
          avatar_url: profile?.avatar_image_url,
          created_at: profile?.created_at,
          updated_at: profile?.updated_at,
        },
      };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
    },
    onError: () => {
      queryClient.setQueryData(['user'], null);
    },
  }); // Signup mutation with profile creation
  const signupMutation = useMutation({
    mutationFn: async ({
      email,
      password,
      firstName,
      lastName,
      username,
      avatar,
    }: SignUpData) => {      // Check if username is taken first
      if (username) {
        const { data: existingUsers, error: checkError } = await supabase
          .from('users')
          .select('username')
          .eq('username', username);

        if (checkError) {
          console.error('Error checking username:', checkError);
          throw new Error('Failed to check username availability');
        }

        if (existingUsers && existingUsers.length > 0) {
          throw new Error(
            'Username is already taken. Please choose another one.'
          );
        }
      }

      // Sign up the user with metadata
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName || '',
            last_name: lastName || '',
            username: username || email.split('@')[0],
          },
        },
      });

      if (error) throw error;
      if (!data.user) throw new Error('No user returned from signup');

      // Wait a bit for the trigger to create the profile
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Try to create/update the user profile explicitly
      try {
        const profileData = {
          id: data.user.id,
          username: username || email.split('@')[0],
          first_name: firstName || '',
          last_name: lastName || '',
          updated_at: new Date().toISOString(),
        };

        const { error: upsertError } = await supabase
          .from('users')
          .upsert(profileData, {
            onConflict: 'id',
            ignoreDuplicates: false,
          });

        if (upsertError) {
          console.error('Error upserting user profile:', upsertError);
          // Try insert instead of upsert
          const { error: insertError } = await supabase
            .from('users')
            .insert(profileData);

          if (insertError) {
            console.error('Error inserting user profile:', insertError);
          }
        }
      } catch (profileError) {
        console.error('Error creating user profile:', profileError);      } // Handle avatar upload if provided
      if (avatar) {
        console.log('Starting avatar upload process...');
        try {
          const avatarUrl = await uploadProfileImage({
            userId: data.user.id,
            file: avatar,
          });          // Update the user's profile with the avatar URL
          const { error: updateError } = await supabase
            .from('users')
            .update({ avatar_image_url: avatarUrl })
            .eq('id', data.user.id);

          if (updateError) {
            console.error(
              'Error updating user profile with avatar URL:',
              updateError
            );
            throw new Error(
              `Failed to update profile with avatar URL: ${updateError.message}`
            );
          } else {
            console.log('Avatar URL updated in user profile successfully');
          }
        } catch (error) {
          console.error('Error handling avatar upload:', error);
          // Don't throw here to avoid breaking the signup process
          // The user is created successfully, just the avatar failed
        }
      } else {
        console.log('No avatar provided for upload');
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate user query to refetch the updated profile
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.clear(); // Clear all cached data on logout
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: loginMutation.mutateAsync,
    signup: signupMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoginLoading: loginMutation.isPending,
    isSignupLoading: signupMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    loginError: loginMutation.error,
    signupError: signupMutation.error,
    logoutError: logoutMutation.error,
  };
};
