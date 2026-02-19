import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const URLS = [
  'https://gabusdresurai.lt/kainos-siauliai',
  'https://gabusdresurai.lt/kainos-marijampole',
  'https://gabusdresurai.lt/kainos-vilnius'
];

// Visa papildoma informacija, kurią nori į JSON
const additionalInfo = `
Kainos Šiauliuose
Paslaugų kainos gali keistis. Naujausią informaciją apie kainas gausite registruodamiesi pamokai ar kursui.

Individuali pamoka: 25€
Pamoka internetu: 25€
Bendro paklusnumo kursas 130€
Miesto grupės pamoka 10€

... (įklijuok čia visą tavo pateiktą tekstą) ...

Kontaktai bendrai: Kiekvienas šuo yra gabus
gabusdresurai@gmail.com

Marijampolė / Gižai: +370 676 30780
Vilnius: +370 687 98800
Šiauliai: +370 657 81634
`;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const data = [];

  for (const URL of URLS) {
    console.log(`🔍 Scraping ${URL} ...`);
    await page.goto(URL, { waitUntil: 'networkidle' });

    const cityData = await page.evaluate(() => {
      const clean = (text) =>
        text?.replace(/\s+/g, ' ').trim() || null;

      const bodyText = document.body.innerText;

      const cityMatch = bodyText.match(/Kainos (\w+)/i);
      const city = cityMatch ? cityMatch[1] : 'Unknown';

      const prices = {};
      const indivMatch = bodyText.match(/Individuali pamoka: ([0-9–€\s]+)/i);
      const onlineMatch = bodyText.match(/Pamoka internetu: ([0-9–€\s]+)/i);
      const courseMatch = bodyText.match(/Bendro paklusnumo kursas: ([0-9–€]+)/i);
      const groupMatch = bodyText.match(/Miesto grupės pamoka: ([0-9–€]+)/i);
      const tricksMatch = bodyText.match(/Triukų kursas: ([0-9–€]+)/i);

      if (indivMatch) prices.individual = clean(indivMatch[1]);
      if (onlineMatch) prices.online = clean(onlineMatch[1]);
      if (courseMatch) prices.basicCourse = clean(courseMatch[1]);
      if (groupMatch) prices.cityGroup = clean(groupMatch[1]);
      if (tricksMatch) prices.tricksCourse = clean(tricksMatch[1]);

      const contact = {
        email: 'gabusdresurai@gmail.com',
        facebook: 'https://www.facebook.com/gabusdresurai',
        website: 'https://www.gabusdresurai.lt'
      };

      let phone = '';
      if (city.toLowerCase() === 'vilnius') phone = '+370 687 98800';
      else if (city.toLowerCase() === 'marijampolė' || city.toLowerCase() === 'gižai')
        phone = '+370 676 30780';
      else if (city.toLowerCase() === 'šiauliai') phone = '+370 657 81634';

      return {
        city,
        contact: { ...contact, phone },
        prices
      };
    });

    data.push(cityData);
  }

  await browser.close();

  const finalData = {
    school: 'Gabus Dresurai',
    website: 'https://gabusdresurai.lt',
    cities: data,
    info: additionalInfo.trim()
  };

  const savePath =
    '/Users/glebson/Desktop/My-react/src/data/training/gabusdresurai/gabusdresurai.json';

  fs.mkdirSync(path.dirname(savePath), { recursive: true });
  fs.writeFileSync(savePath, JSON.stringify(finalData, null, 2), 'utf-8');

  console.log(`🎉 Duomenys išsaugoti: ${savePath}`);
})();