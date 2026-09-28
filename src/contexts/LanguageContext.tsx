import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { I18n } from 'i18n-js';
import { translations } from '../utils/translations';

export const i18n = new I18n(translations);
i18n.defaultLocale = 'es';
i18n.enableFallback = true;

type Language = 'es' | 'en';

type LanguageContextType = {
  language: Language;
  changeLanguage: (lng: Language) => void;
  clearLanguage: () => void;
  t: (key: string, opts?: any) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  const changeLanguage = (lng: Language) => {
    setLanguage(lng);
  };

  const clearLanguage = () => {
    setLanguage('es');
  };

  const t = (key: string, opts?: any) => i18n.t(key, opts);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, clearLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage debe usarse dentro de un LanguageProvider');
  return context;
};
