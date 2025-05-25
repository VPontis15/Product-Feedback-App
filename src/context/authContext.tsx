import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

interface AuthContextType {
  user: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<any>;
  signup: (data: {
    email: string;
    password: string;
    fullName?: string;
  }) => Promise<any>;
  logout: () => Promise<void>;
  isLoginLoading: boolean;
  isSignupLoading: boolean;
  isLogoutLoading: boolean;
  loginError: Error | null;
  signupError: Error | null;
  logoutError: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const queryClient = useQueryClient();

  // Listen for auth state changes and update React Query cache
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      queryClient.setQueryData(['user'], session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
