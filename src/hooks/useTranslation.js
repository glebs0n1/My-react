import { useState, useEffect } from 'react';
import { useLanguage } from '../context/languageContext';
import { translateText } from '../services/translationService';

export const useTranslation = (textToTranslate) => {
  const { currentLang } = useLanguage();
  const [translatedText, setTranslatedText] = useState(textToTranslate);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const translate = async () => {
      if (currentLang === 'lt') {
        setTranslatedText(textToTranslate);
        return;
      }

      setLoading(true);
      const result = await translateText(textToTranslate, currentLang);
      setTranslatedText(result);
      setLoading(false);
    };

    translate();
  }, [textToTranslate, currentLang]);

  return { text: translatedText, loading };
};