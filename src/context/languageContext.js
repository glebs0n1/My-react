import { createContext, useContext, useState, useEffect } from 'react';
import { translateText, clearTranslationCache } from '../services/translationService';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('lt');
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'lt';
    setCurrentLang(savedLang);
    document.documentElement.lang = savedLang;
  }, []);

  const changeLanguage = async (langCode) => {
    setIsTranslating(true);
    setCurrentLang(langCode);
    localStorage.setItem('language', langCode);
    document.documentElement.lang = langCode;
    
    // Clear cache when changing language
    clearTranslationCache();
    
    // Force re-render of all components
    setTimeout(() => setIsTranslating(false), 500);
  };

  const t = async (text) => {
    if (currentLang === 'lt') return text; // Default language
    return await translateText(text, currentLang, 'lt');
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLang, 
      changeLanguage, 
      t,
      isTranslating 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};