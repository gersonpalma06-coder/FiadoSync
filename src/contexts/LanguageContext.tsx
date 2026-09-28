import React, { createContext, useContext, useState, ReactNode } from 'react';
import { I18n } from 'i18n-js';
import { translations } from '../utils/translations';

type Language = 'es' | 'en';

type LanguageContextType = {
  language: Language;
  changeLanguage: (lng: Language) => void;
  clearLanguage: () => void;
};

export const i18n = new I18n(translations);

i18n.defaultLocale = 'es'; 
i18n.locale = 'es';
i18n.enableFallback = true;

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const changeLanguage = (lng: Language) => {
    setLanguage(lng);
    i18n.locale = lng;
  };

  const clearLanguage = () => {
    setLanguage('es');
    i18n.locale = 'es';
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, clearLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de un LanguageProvider');
  }
  return context;
};