import { createContext, useContext, useState, ReactNode } from "react";

interface Review {
  eventId: string;
  eventTitle: string;
  rating: number;
  text: string;
  date: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  industry?: string;
  linkedin_url?: string;
  communities_part_of: string[];
  communities_ally: string[];
  events_attended: string[];
  reviews: Review[];
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  markAttended: (eventId: string) => void;
  addReview: (eventId: string, eventTitle: string, rating: number, text: string) => void;
  hasAttended: (eventId: string) => boolean;
  getReview: (eventId: string) => Review | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock user data
    setUser({
      id: "1",
      name: "Alex Johnson",
      email: email,
      industry: "Product Manager · Fintech",
      linkedin_url: "https://linkedin.com/in/alexjohnson",
      communities_part_of: ["Black"],
      communities_ally: ["Latino", "Asian"],
      events_attended: [],
      reviews: []
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));

    setUser({
      id: Date.now().toString(),
      name,
      email,
      communities_part_of: [],
      communities_ally: [],
      events_attended: [],
      reviews: []
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...updates });
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
