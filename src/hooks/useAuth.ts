import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

interface AuthCredentials {
  email: string;
  password: string;
}

interface SignUpData extends AuthCredentials {
  fullName?: string;
  username?: string;
}

interface UserProfile {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthUser {
  id: string;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  // ... other auth properties
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
      if (!data.user) throw new Error('No user returned');

      // Fetch profile data after successful login
      const { data: profile } = await supabase
        .from('users')
        .select(
          `
          id,
          username,
          first_name,
          last_name,
          avatar_url,
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
          avatar_url: profile?.avatar_url,
          created_at: profile?.created_at,
          updated_at: profile?.updated_at,
        },
      };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
    },
    onError: (error) => {
      queryClient.setQueryData(['user'], null);
    },
  });

  // Signup mutation with profile creation
  const signupMutation = useMutation({
    mutationFn: async ({ email, password, fullName, username }: SignUpData) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            username: username,
          },
        },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      // Note: For signup, the profile will be created by the trigger
      // The user will be available after email confirmation
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
