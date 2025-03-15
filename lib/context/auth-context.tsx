import { useContext, createContext, type PropsWithChildren } from 'react';
import { router } from 'expo-router';
import { useStorageState } from '../use-storage-state';
import { supabase } from '../supabase';
// import { showToast } from '../notifications';
import { Alert } from 'react-native';
import { AuthTokenResponsePassword } from '@supabase/supabase-js';

export const AuthContext = createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          // showToast('signing in')
          const response: AuthTokenResponsePassword = await supabase.auth.signInWithPassword({
            email,
            password,
          })

          if (response.error) {
            Alert.alert(response.error.message)
            console.warn(response.error)
          } else if (response.data.hasOwnProperty('access_token')) {
            console.log('sign in data', response.data);
            setSession(JSON.stringify(response.data));
            router.push('/groups');
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
