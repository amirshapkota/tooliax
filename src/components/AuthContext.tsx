// src/components/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { Database } from '@/lib/database.types';

type UserProfile = Database['public']['Tables']['users']['Row'];

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<AuthResult>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<AuthResult>;
  refreshProfile: () => Promise<void>;
}

interface AuthResult {
  success: boolean;
  data?: any;
  error?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from database
  const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (mounted) {
            setLoading(false);
          }
          return;
        }

        if (initialSession?.user && mounted) {
          setSession(initialSession);
          setUser(initialSession.user);
          
          // Fetch user profile
          const userProfile = await fetchProfile(initialSession.user.id);
          if (mounted) {
            setProfile(userProfile);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.email);

        if (mounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);

          if (currentSession?.user) {
            // Fetch updated profile
            const userProfile = await fetchProfile(currentSession.user.id);
            if (mounted) {
              setProfile(userProfile);
            }
          } else {
            setProfile(null);
          }

          // Only set loading to false after we've handled the auth change
          if (event !== 'INITIAL_SESSION') {
            setLoading(false);
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Sign up function
  const signUp = async (email: string, password: string, userData?: any): Promise<AuthResult> => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.fullName || '',
            company_name: userData?.companyName || '',
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // If email confirmation is disabled, the user will be automatically signed in
      if (data.user && data.session) {
        // Profile will be created automatically by the database trigger
        // and fetched by the auth state change listener
        return { success: true, data: data.user };
      }

      // If email confirmation is enabled
      return { 
        success: true, 
        data: data.user,
        error: 'Please check your email for a confirmation link.'
      };

    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data.user };

    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async (): Promise<AuthResult> => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signOut();

      if (error) {
        return { success: false, error: error.message };
      }

      // Clear local state
      setUser(null);
      setProfile(null);
      setSession(null);

      return { success: true };

    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (email: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { 
        success: true, 
        data: 'Password reset email sent. Please check your inbox.' 
      };

    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Update profile function
  const updateProfile = async (updates: Partial<UserProfile>): Promise<AuthResult> => {
    try {
      if (!user) {
        return { success: false, error: 'No user logged in' };
      }

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      // Update local profile state
      setProfile(data);

      return { success: true, data };

    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Refresh profile function
  const refreshProfile = async (): Promise<void> => {
    if (user) {
      const userProfile = await fetchProfile(user.id);
      setProfile(userProfile);
    }
  };

  // Check if user has specific role
  const hasRole = (role: string): boolean => {
    return profile?.role === role;
  };

  // Check if user is admin
  const isAdmin = (): boolean => {
    return hasRole('admin');
  };

  // Check if user is developer
  const isDeveloper = (): boolean => {
    return hasRole('developer') || hasRole('admin');
  };

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    refreshProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for role checking
export const useRole = () => {
  const { profile } = useAuth();
  
  return {
    role: profile?.role || 'visitor',
    isAdmin: profile?.role === 'admin',
    isDeveloper: profile?.role === 'developer' || profile?.role === 'admin',
    isVisitor: profile?.role === 'visitor' || !profile
  };
};

// Higher-order component for role-based rendering
export const withRole = (allowedRoles: string[]) => {
  return (WrappedComponent: React.ComponentType<any>) => {
    return (props: any) => {
      const { profile, loading } = useAuth();

      if (loading) {
        return (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        );
      }

      if (!profile || !allowedRoles.includes(profile.role)) {
        return (
          <div className="text-center py-8">
            <p className="text-gray-600">You don't have permission to access this section.</p>
          </div>
        );
      }

      return <WrappedComponent {...props} />;
    };
  };
};

export default AuthProvider;