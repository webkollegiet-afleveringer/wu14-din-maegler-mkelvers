import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import type { User } from "#/lib/types";

const API_URL = "https://dinmaegler.onrender.com";

function getStoredAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem("token");
}

interface AuthResponse {
  jwt: string;
  user: User;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isUpdatingFavorites: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  updateFavorites: (homes: string[]) => Promise<void>;
  logout: () => void;
}

export type AuthState = Pick<
  AuthContextValue,
  "user" | "isAuthenticated" | "isLoading"
>;

const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingFavorites, setIsUpdatingFavorites] = useState(false);

  useEffect(() => {
    const token = getStoredAuthToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    fetch(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setUser)
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (identifier: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    const data: AuthResponse = await res.json();
    localStorage.setItem("token", data.jwt);
    setUser(data.user);
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    const res = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    if (!res.ok) throw new Error("Register failed");
    const data: AuthResponse = await res.json();
    localStorage.setItem("token", data.jwt);
    setUser(data.user);
  };

  const updateFavorites = async (homes: string[]) => {
    const token = getStoredAuthToken();
    if (!token || !user) {
      throw new Error("Not authenticated");
    }

    const previousHomes = user.homes;

    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      return {
        ...currentUser,
        homes,
      };
    });

    setIsUpdatingFavorites(true);

    try {
      const res = await fetch(`${API_URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ homes }),
      });

      if (!res.ok) {
        throw new Error("Failed to update favorites");
      }
    } catch (error) {
      setUser((currentUser) => {
        if (!currentUser) {
          return currentUser;
        }

        return {
          ...currentUser,
          homes: previousHomes,
        };
      });

      throw error;
    } finally {
      setIsUpdatingFavorites(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      isUpdatingFavorites,
      login,
      register,
      updateFavorites,
      logout,
    }),
    [user, isLoading, isUpdatingFavorites],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

export { AuthProvider, useAuth, getStoredAuthToken };
