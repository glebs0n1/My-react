export const mapAnimalSize = (raw?: string): string => {
    if (!raw) return "Vidutinis";
  
    const text = raw.toLowerCase();
  
    if (text.includes("maž") || text.includes("iki 30"))
      return "Mažas";
  
    if (text.includes("vidut") || text.includes("30") || text.includes("60"))
      return "Vidutinis";
  
    if (text.includes("didel") || text.includes("daugiau nei 60"))
      return "Didelis";
  
    return "Vidutinis";
  };