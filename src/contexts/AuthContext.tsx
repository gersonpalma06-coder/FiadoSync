import React, { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { translations } from '../utils/translations';

type Language = 'es' | 'en';

type User = {
  email: string;
  authToken?: string;
  sessionToken?: string;
  role?: string;
} | null;

type AuthContextType = {
  user: User;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  language: Language;
  toggleLanguage: () => void;
  t: typeof translations['es'];
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [language, setLanguage] = useState<Language>('es');

  const register = async (email: string, password: string): Promise<void> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: password,
    });

    if (error) throw error;
  };

  const login = async (email: string, password: string): Promise<void> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    
    if (error) throw error;

    if (data.session) {
      setUser({
        email: data.user?.email || email,
        sessionToken: data.session.access_token,
      });
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    setUser(null);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  const t = translations[language];

  return (
    <AuthContext.Provider 
      value={{ user, register, login, logout, language, toggleLanguage, t }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};