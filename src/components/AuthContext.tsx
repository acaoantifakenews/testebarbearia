import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  session: Session | null;
};

const AuthContext = createContext<AuthContextType>({ session: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Fetch the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes in authentication state
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);