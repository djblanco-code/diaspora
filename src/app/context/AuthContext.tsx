import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  fetchUserProfile,
  getAuthErrorMessage,
  isDuplicateSignup,
  saveProfile,
  type SignupResult,
  type User,
} from "../../lib/profile";
import { supabase } from "../../lib/supabase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (name: string, email: string, password: string) => Promise<SignupResult>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  markAttended: (eventId: string) => void;
  addReview: (eventId: string, eventTitle: string, rating: number, text: string) => void;
  hasAttended: (eventId: string) => boolean;
  getReview: (eventId: string) => User["reviews"][number] | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore an existing session on load and keep the user in sync with auth
  // changes (sign in/out, token refresh, and OAuth redirect returns).
  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let active = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      if (data.session?.user) {
        const profile = await fetchUserProfile(data.session.user.id);
        if (active) setUser(profile);
      }
      if (active) setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!active) return;
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        if (active) setUser(profile);
      } else {
        setUser(null);
      }
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    if (!supabase) {
      throw new Error("Authentication is not configured.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const message = error.message.toLowerCase();
      if (message.includes("invalid login credentials")) {
        throw new Error("Invalid email or password.");
      }
      if (message.includes("email not confirmed")) {
        throw new Error("Please confirm your email, then sign in.");
      }
      throw new Error(getAuthErrorMessage(error));
    }

    if (data.user) {
      const profile = await fetchUserProfile(data.user.id);
      setUser(profile);
      return profile;
    }
    return null;
  };

  const signup = async (name: string, email: string, password: string): Promise<SignupResult> => {
    if (!supabase) {
      throw new Error("Authentication is not configured.");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error) {
      throw new Error(getAuthErrorMessage(error));
    }

    if (isDuplicateSignup(data.user)) {
      throw new Error("Email is already associated with an account");
    }

    if (!data.session || !data.user) {
      return "confirm_email";
    }

    const profile = await fetchUserProfile(data.user.id);
    if (!profile) {
      throw new Error("Account created but profile could not be loaded. Try signing in.");
    }

    setUser(profile);
    return "signed_in";
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    const saved = await saveProfile(user.id, {
      name: updates.name ?? user.name,
      industry: updates.industry ?? user.industry,
      linkedin_url: updates.linkedin_url ?? user.linkedin_url,
      avatar: updates.avatar ?? user.avatar,
      communities_part_of: updates.communities_part_of ?? user.communities_part_of,
      communities_ally: updates.communities_ally ?? user.communities_ally,
      onboarding_complete: updates.onboarding_complete ?? user.onboarding_complete,
    });
    if (saved) setUser(saved);
  };

  const markAttended = (eventId: string) => {
    if (!user) return;
    if (!user.events_attended.includes(eventId)) {
      setUser({
        ...user,
        events_attended: [...user.events_attended, eventId]
      });
    }
  };

  const addReview = (eventId: string, eventTitle: string, rating: number, text: string) => {
    if (!user) return;

    // Remove existing review for this event if any
    const existingReviews = user.reviews.filter(r => r.eventId !== eventId);

    setUser({
      ...user,
      reviews: [
        ...existingReviews,
        {
          eventId,
          eventTitle,
          rating,
          text,
          date: new Date().toISOString()
        }
      ]
    });
  };

  const hasAttended = (eventId: string) => {
    return user?.events_attended.includes(eventId) || false;
  };

  const getReview = (eventId: string) => {
    return user?.reviews.find(r => r.eventId === eventId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        markAttended,
        addReview,
        hasAttended,
        getReview
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
