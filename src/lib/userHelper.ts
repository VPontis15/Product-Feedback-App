import { supabase } from '../lib/supabase';

export interface UserProfile {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
}

export const getUserProfile = async (
  userId: string
): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>
) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
