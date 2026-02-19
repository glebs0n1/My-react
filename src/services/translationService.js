import axios from 'axios';

const GOOGLE_TRANSLATE_API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;
const API_URL = 'https://translation.googleapis.com/language/translate/v2';

// Cache to avoid re-translating same content
const translationCache = new Map();

export const translateText = async (text, targetLang, sourceLang = 'lt') => {
  // Don't translate if same language
  if (targetLang === sourceLang) return text;
  
  // Check cache
  const cacheKey = `${text}_${sourceLang}_${targetLang}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const response = await axios.post(
      `${API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`,
      {
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      }
    );

    const translated = response.data.data.translations[0].translatedText;
    
    // Cache the result
    translationCache.set(cacheKey, translated);
    
    return translated;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text on error
  }
};

// Batch translation for multiple texts (more efficient)
export const translateMultiple = async (texts, targetLang, sourceLang = 'lt') => {
  if (targetLang === sourceLang) return texts;

  try {
    const response = await axios.post(
      `${API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`,
      {
        q: texts,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      }
    );

    return response.data.data.translations.map(t => t.translatedText);
  } catch (error) {
    console.error('Batch translation error:', error);
    return texts;
  }
};

// Clear cache (useful when switching languages)
export const clearTranslationCache = () => {
  translationCache.clear();
};