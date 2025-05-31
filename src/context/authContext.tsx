import { createContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

// Use ReturnType to get the exact type that useAuth returns
type AuthContextType = ReturnType<typeof useAuth>;

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const queryClient = useQueryClient();

  // Listen for auth state changes and update React Query cache
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData(['user'], session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
