import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserType {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
}

type AuthContextType = {
  user: UserType | null;
  loading: boolean;
  login: (user: UserType) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsed = JSON.parse(userData);
          if (parsed && parsed._id && parsed.email) {
            setUser(parsed);
          } else if (parsed?.user) {
            setUser(parsed.user);
          }
        }
      } catch (err) {
        console.error("Error loading user from AsyncStorage:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (userData: UserType | { user: UserType }) => {
    const userToStore = "user" in userData ? userData.user : userData;

    await AsyncStorage.setItem("user", JSON.stringify(userToStore));
    setUser(userToStore);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
