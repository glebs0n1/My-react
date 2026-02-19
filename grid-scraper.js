import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const baseUrls = [
  'https://vggn.grinda.lt/gyvunai/sunys/',
  'https://vggn.grinda.lt/gyvunai/kates/',
  'https://vggn.grinda.lt/gyvunu-likimai/padovanoti/',
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const allAnimals = [];

  for (const url of baseUrls) {
    console.log(`🔍 Scraping: ${url}`);

    try {
      await page.goto(url, { waitUntil: 'networkidle' });

      // Traukiame visus gyvūnus pagal .animal li elementus
      const animals = await page.$$eval('ul.animals-list li.animal', items =>
        items.map(item => {
          const linkEl = item.querySelector('a.woocommerce-LoopProduct-link');
          const nameEl = item.querySelector('.animal-description');
          const nameFromHeader = item.querySelector('h3 a');

          const name = nameEl?.childNodes[0]?.textContent.trim() || nameFromHeader?.innerText.trim() || null;
          const link = linkEl?.href || null;
          const image = item.querySelector('img')?.src || null;

          // Traukiame amžių ir lytį
          let age = null;
          let gender = null;
          if (nameEl) {
            const ageMatch = nameEl.innerText.match(/Amžius:\s*~?([\d\w\s\.]+)/);
            const genderMatch = nameEl.innerText.match(/Lytis:\s*(\w+)/);
            if (ageMatch) age = ageMatch[1].trim();
            if (genderMatch) gender = genderMatch[1].trim();
          }

          return { name, link, image, age, gender };
        })
      );

      if (!animals.length) {
        console.log('📭 Daugiau gyvūnų nėra šiame puslapyje.');
      } else {
        allAnimals.push(...animals);
        console.log(`📄 Rasta gyvūnų: ${animals.length}`);
      }

    } catch (err) {
      console.error(`❌ Klaida scrapiant puslapį ${url}:`, err.message);
    }
  }

  await browser.close();

  const savePath = '/Users/glebson/Desktop/My-react/src/data/vggn.grinda/vggn.grinda.json';
  fs.mkdirSync(path.dirname(savePath), { recursive: true });
  fs.writeFileSync(savePath, JSON.stringify(allAnimals, null, 2), 'utf-8');

  console.log(`🎉 Iš viso rasta gyvūnų: ${allAnimals.length}`);
})();