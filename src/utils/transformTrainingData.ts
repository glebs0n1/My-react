// src/utils/transformTrainingData.ts

interface JSONSchool {
  school?: string;
  website?: string;
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    address2?: string;
    instagram?: string;
  };
  about?: {
    since?: number;
    description?: string;
  } | string | null;
  whyUs?: string;
  history?: string;
  team?: Array<{
    name: string;
    role: string;
    specialties: string[];
  }>;
  services?: string[];
  webinars?: string[];
  prices?: any;
  pricesRaw?: any;
  generalServices?: any;
  location?: {
    city?: string;
    district?: string;
    indoorSpace?: string;
    parking?: boolean;
  };
  locations?: Array<{
    city?: string;
    district?: string;
    contact?: {
      phone?: string;
      trainerName?: string;
      address?: string;
    };
    prices?: any;
  }>;
  registrationLink?: string;
  headerImage?: string;
  logo?: string;
}

export interface Price {
  service?: string;
  program?: string;
  serive_for?: string;
  price: string;
  duration: string;
}

export interface TrainingSchool {
  id: number;
  name: string;
  image: string;
  city: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  description: string;
  tags: string[];
  prices: Price[];
  whyUs?: string;
  history?: string;
  registrationLink?: string;
}

// Helper function to unwrap nested JSON if needed
function unwrapJSON(json: any): JSONSchool | null {
  if (!json) return null;
  
  // Check if this is a wrapped JSON (has a single key at root level that contains the actual data)
  const keys = Object.keys(json);
  
  // If root has 'school' property, it's already correct
  if (json.school) {
    return json as JSONSchool;
  }
  
  // SIMPLE STRUCTURE: If root has 'name' property (like sunu-darzelis-povilas)
  if (json.name) {
    console.log(`Processing simple JSON structure with 'name' field: ${json.name}`);
    // Convert simple structure to JSONSchool format
    const converted: JSONSchool = {
      school: json.name + (json.owner ? ` (${json.owner})` : ''),
      contact: {
        phone: json.phone || json.contact?.phone || '',
        email: json.email || json.contact?.email,
        address: json.address || json.city || ''
      },
      location: {
        city: json.city
      },
      website: json.links?.website || json.website,
      services: json.services ? json.services.map((s: any) => s.name || s) : [],
      prices: json.services // Will be processed by extractPrices
    };
    return converted;
  }
  
  // If root has exactly one key and that key contains an object, it might be wrapped
  if (keys.length === 1 && typeof json[keys[0]] === 'object') {
    const innerData = json[keys[0]];
    
    // Check if inner data has contact or school properties
    if (innerData.contact || innerData.school) {
      console.log(`Unwrapping nested JSON structure (key: ${keys[0]})`);
      
      // If it doesn't have 'school' property, add it from the key
      if (!innerData.school) {
        innerData.school = keys[0].charAt(0).toUpperCase() + keys[0].slice(1);
      }
      
      return innerData as JSONSchool;
    }
  }
  
  return json as JSONSchool;
}

export function transformJSONToTrainingSchool(
  json: any,
  id: number,
  imagePath: string
): TrainingSchool {
  // Unwrap nested JSON if needed
  const unwrapped = unwrapJSON(json);
  
  // Null safety check
  if (!unwrapped) {
    console.error('Invalid JSON data for training school:', json);
    throw new Error('Invalid training school data');
  }

  console.log(`Transforming school: ${unwrapped.school}`);

  // Handle multi-location structure (Gabus Dresurai style)
  let contact = unwrapped.contact;
  let city = unwrapped.location?.city;
  let address = unwrapped.contact?.address;
  let pricesData = unwrapped.prices;

  // If locations array exists (multi-city school)
  if (unwrapped.locations && Array.isArray(unwrapped.locations)) {
    console.log(`  Multi-location school with ${unwrapped.locations.length} locations`);
    // Get the first location as primary
    const primaryLocation = unwrapped.locations[0];
    
    if (primaryLocation) {
      city = primaryLocation.city || city;
      address = primaryLocation.contact?.address || address;
      
      // Combine all locations' prices + generalServices
      const allPrices: any[] = [];
      unwrapped.locations.forEach((loc: any) => {
        if (loc.prices) {
          allPrices.push(loc.prices);
        }
      });
      
      // Add generalServices if exists
      if (unwrapped.generalServices) {
        allPrices.push(unwrapped.generalServices);
      }
      
      pricesData = allPrices;
      console.log(`  Combined prices from ${allPrices.length} sources`);
      
      // Merge contact info
      contact = {
        ...unwrapped.contact,
        ...primaryLocation.contact
      };
    }
  } else if (!contact && unwrapped.contact) {
    contact = unwrapped.contact;
  }

  // Final null check for contact
  if (!contact) {
    console.error('Invalid JSON data - missing contact information:', json);
    throw new Error('Invalid training school data - missing contact information');
  }

  // Ištraukiame kainų informaciją
  console.log(`  Extracting prices from:`, pricesData);
  const prices = extractPrices(pricesData);
  console.log(`  Extracted ${prices.length} prices`);
  
  // Sukuriame tags iš services (paimame pirmus 6)
  const tags = unwrapped.services?.slice(0, 6) || [];
  
  return {
    id,
    name: unwrapped.school || 'Unknown School',
    image: imagePath,
    city: city || extractCityFromAddress(contact?.address || ''),
    address: address || contact?.address || '',
    phone: contact?.phone || '',
    email: contact?.email,
    website: unwrapped.website,
    description: generateDescription(unwrapped),
    tags,
    prices,
    whyUs: extractWhyUs(unwrapped),
    history: extractHistory(unwrapped),
    registrationLink: unwrapped.registrationLink,
  };
}

function extractPrices(pricesData: any): Price[] {
  const result: Price[] = [];

  if (!pricesData) return result;

  // Helper to add price with proper formatting
  const addPrice = (service: string, price: number | string, duration?: string) => {
    result.push({
      service,
      price: typeof price === 'number' ? `€${price}` : price,
      duration: duration || "",
    });
  };

  // SIMPLE SERVICES ARRAY (sunu-darzelis-povilas style)
  if (Array.isArray(pricesData)) {
    console.log('  Processing simple services array:', pricesData.length, 'items');
    pricesData.forEach((item: any) => {
      const serviceName = item.name || item.description || 'Paslauga';
      const price = item.pricePerDay || item.price || item.priceMin;
      
      if (price) {
        if (item.pricePerDay) {
          addPrice(serviceName, `€${item.pricePerDay}/dienai`);
        } else if (item.priceMin && item.priceMax) {
          addPrice(serviceName, `€${item.priceMin}-€${item.priceMax}`);
        } else {
          addPrice(serviceName, price);
        }
      }
    });
    
    if (result.length > 0) {
      console.log(`  Extracted ${result.length} prices from simple array`);
      return result;
    }
  }

  // Helper to process nested price objects recursively
  const processNestedPrices = (obj: any, prefix: string = '') => {
    Object.entries(obj).forEach(([key, value]: [string, any]) => {
      if (value && typeof value === 'object') {
        // Check if this is a price object (has price/description)
        if (value.price !== undefined || value.priceMin !== undefined || value.description) {
          const serviceName = prefix + (value.description || key);
          
          if (value.priceMin && value.priceMax) {
            addPrice(serviceName, `€${value.priceMin}-€${value.priceMax}`, value.duration);
          } else if (value.priceEarly && value.priceRegular) {
            addPrice(serviceName, `€${value.priceEarly}-€${value.priceRegular}`, value.duration);
          } else if (value.priceRegular && value.priceDiscount) {
            addPrice(serviceName, `€${value.priceDiscount}-€${value.priceRegular}`, value.duration);
          } else if (value.price !== undefined) {
            // Handle price === 0 case (like Memelhund Agility)
            if (value.price === 0) {
              addPrice(serviceName, value.note || "Susisiekite", value.duration);
            } else {
              addPrice(serviceName, value.price, value.duration);
            }
          } else if (value.pricePerDay) {
            addPrice(serviceName, `€${value.pricePerDay}/para`, value.duration);
          }
        } else {
          // Recurse into nested objects
          processNestedPrices(value, prefix);
        }
      }
    });
  };

  // Handle multi-location structure (Gabus Dresurai style - array of objects)
  // BUT NOT simple services array (already processed above)
  if (Array.isArray(pricesData) && result.length === 0) {
    console.log('  Processing array of prices/locations:', pricesData.length, 'items');
    
    pricesData.forEach((item: any, idx: any) => {
      console.log(`  Item ${idx}:`, Object.keys(item));
      
      // Check if this is a location object with prices
      if (item.prices && typeof item.prices === 'object') {
        const cityPrefix = item.city ? `${item.city}: ` : '';
        console.log(`  Found location prices for ${item.city || 'unknown'}`);
        processNestedPrices(item.prices, cityPrefix);
      } 
      // Check if this is generalServices object
      else if (item.consultation || item.individualHome || item.showCourse || item.puppyCourse) {
        console.log('  Found generalServices');
        processNestedPrices(item, '');
      }
      // Check if this item IS a price object directly
      else if (item.description || item.price !== undefined || item.priceMin !== undefined) {
        console.log('  Found direct price object');
        processNestedPrices({ temp: item }, '');
      }
    });
    
    console.log(`  Extracted ${result.length} prices from array`);
    return result.slice(0, 10);
  }

  // Handle simple price objects (Memelhund style)
  if (pricesData.obedience || pricesData.protection || pricesData.agility) {
    console.log('  Processing Memelhund-style prices');
    Object.entries(pricesData).forEach(([key, value]: [string, any]) => {
      if (value && typeof value === 'object') {
        const serviceName = value.description || key;
        if (value.price !== undefined) {
          if (value.price === 0) {
            addPrice(serviceName, value.note || "Susisiekite", value.duration);
          } else {
            addPrice(serviceName, value.price, value.duration);
          }
        } else if (value.priceMin && value.priceMax) {
          addPrice(serviceName, `€${value.priceMin}-€${value.priceMax}`, value.duration);
        }
      }
    });
  }

  // Handle Mokyksuni-style structure (vilnius/panevezys nested)
  if (pricesData.vilnius || pricesData.panevezys) {
    console.log('  Processing Mokyksuni-style prices');
    if (pricesData.vilnius) {
      processNestedPrices(pricesData.vilnius, '');
    }
    if (pricesData.panevezys) {
      processNestedPrices(pricesData.panevezys, '(Panevėžys) ');
    }
  }

  // Canis-style structure
  if (pricesData.groupTraining) {
    console.log('  Processing Canis-style groupTraining');
    Object.entries(pricesData.groupTraining).forEach(([key, value]: [string, any]) => {
      if (value && typeof value === 'object') {
        addPrice(
          value.description || "Grupinė treniruotė",
          value.price,
          value.duration
        );
      }
    });
  }

  if (pricesData.individualTraining) {
    console.log('  Processing Canis-style individualTraining');
    Object.entries(pricesData.individualTraining).forEach(([key, value]: [string, any]) => {
      if (value && typeof value === 'object') {
        if (value.park || value.custom) {
          const priceStr = value.park 
            ? `€${value.park}${value.custom ? ` / €${value.custom}` : ''}`
            : `€${value.custom}`;
          
          addPrice(
            value.description || "Individuali treniruotė",
            priceStr,
            value.duration
          );
        } else if (value.single !== undefined) {
          addPrice(
            value.description || "Individuali treniruotė",
            value.single,
            value.duration
          );
        }
      }
    });
  }

  if (pricesData.behaviorCorrection) {
    Object.entries(pricesData.behaviorCorrection).forEach(([key, value]: [string, any]) => {
      if (value && typeof value === 'object' && value.price) {
        addPrice(
          value.description || "Elgesio korekcija",
          value.price,
          value.duration
        );
      }
    });
  }

  if (pricesData.boardAndTrain) {
    Object.entries(pricesData.boardAndTrain).forEach(([key, value]: [string, any]) => {
      if (value && typeof value === 'object' && value.price) {
        addPrice(
          value.description || "Dresūra su apgyvendinimu",
          value.price,
          value.duration
        );
      }
    });
  }

  if (pricesData.homeTraining) {
    Object.entries(pricesData.homeTraining).forEach(([key, value]: [string, any]) => {
      if (value && typeof value === 'object' && value.price) {
        addPrice(
          value.description || "Mokykla namie",
          value.price,
          value.duration
        );
      }
    });
  }

  // Legacy format support (Greatpet-style)
  if (result.length === 0 && pricesData.groupTraining && pricesData.groupTraining.single) {
    console.log('  Processing legacy Greatpet format');
    if (pricesData.groupTraining.single) {
      addPrice("Grupinė treniruotė", pricesData.groupTraining.single.price, pricesData.groupTraining.single.duration || "60 min");
    }
    if (pricesData.groupTraining.course8) {
      addPrice("Kursas (8 pamokos)", pricesData.groupTraining.course8.discountPrice || pricesData.groupTraining.course8.price, "8 pamokos");
    }
  }

  // Legacy individual training format (Greatpet-style)
  if (result.length === 0 && pricesData.individualTraining && pricesData.individualTraining.school) {
    console.log('  Processing legacy Greatpet individual format');
    if (pricesData.individualTraining.school?.single) {
      addPrice("Individuali treniruotė (mokykloje)", pricesData.individualTraining.school.single, "60 min");
    }
    if (pricesData.individualTraining.home?.single) {
      addPrice("Individuali treniruotė (namuose)", pricesData.individualTraining.home.single, "60 min");
    }
    if (pricesData.individualTraining.withAna?.single) {
      addPrice("Treniruotė su Ana", pricesData.individualTraining.withAna.single, "60 min");
    }
  }

  // Debug logging
  console.log('  extractPrices final result:', result);

  // Limit to top 10 most relevant prices for UI
  if (result.length > 10) {
    return result.slice(0, 10);
  }

  return result;
}

function extractCityFromAddress(address: string): string {
  // Ištraukiame miestą iš adreso
  const parts = address.split(',');
  const lastPart = parts[parts.length - 1]?.trim() || '';
  
  // Jei paskutinė dalis atrodo kaip miestas (pvz., "Vilnius")
  if (lastPart && !lastPart.includes('g.') && !lastPart.includes('str.')) {
    return lastPart;
  }
  
  // Kitu atveju bandome rasti miestą iš bet kurios dalies
  for (const part of parts.reverse()) {
    const cleaned = part.trim();
    if (cleaned && !cleaned.includes('g.') && !cleaned.includes('str.')) {
      return cleaned;
    }
  }
  
  return 'Vilnius'; // Default
}

function generateDescription(json: JSONSchool): string {
  // Handle about as object
  if (json.about && typeof json.about === 'object' && json.about.description) {
    return json.about.description.trim();
  }
  
  // Handle about as string (legacy format)
  if (typeof json.about === 'string') {
    const aboutText = json.about.trim();
    // Take first 200 characters for description
    return aboutText.length > 200 ? aboutText.substring(0, 200) + '...' : aboutText;
  }
  
  // Generuojame aprašymą iš turimų duomenų
  let desc = `Profesionali šunų dresūra ${json.school || ''}.`;
  
  if (json.team && json.team.length > 0) {
    desc += ` Komanda iš ${json.team.length} ${json.team.length === 1 ? 'specialisto' : 'specialistų'}.`;
  }
  
  if (json.services && json.services.length > 0) {
    desc += ` Siūlome ${json.services.length} skirtingas paslaugas.`;
  }
  
  return desc;
}

function extractWhyUs(json: JSONSchool): string | undefined {
  // Check if there's a dedicated whyUs field
  if (json.whyUs) {
    return json.whyUs;
  }
  
  // Handle about as object
  if (json.about && typeof json.about === 'object' && json.about.description) {
    return json.about.description.trim();
  }
  
  // Handle about as string (legacy format)
  if (typeof json.about === 'string') {
    return json.about.trim();
  }
  
  // Jei yra komanda, galime sukurti "kodėl mes" pranešimą
  if (json.team && json.team.length > 0) {
    const specialists = json.team.map(t => t.role).join(', ');
    return `Mūsų komanda: ${specialists}. Profesionalūs ir patyrę specialistai padės jums ir jūsų augintiniui.`;
  }
  
  return undefined;
}

function extractHistory(json: JSONSchool): string | undefined {
  // Check if there's a dedicated history field
  if (json.history) {
    return json.history;
  }
  
  if (json.about && typeof json.about === 'object' && json.about.since) {
    return `Veikia nuo ${json.about.since} metų`;
  }
  
  return undefined;
}