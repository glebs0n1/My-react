import { chromium } from 'playwright';
import fs from 'fs';

const inputPath = '/Users/glebson/Desktop/My-react/src/data/penktakoja/penktakoja.json';
const outputPath = '/Users/glebson/Desktop/My-react/src/data/penktakoja/penktakoja.full.json';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const fileContent = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const results = [];

  // Fiksuota prieglaudos info
  const fixedShelterInfo = {
    contactPetShelter: {
      phone: '+370 683 39826',
      email: 'info@sos-gyvunai.lt',
      address: 'Konstitucijos pr. 20A, 03502 Vilnius, Lietuva',
      workingHours: 'I-VII 10-18 val.'
    },
    donationInfo: [
      {
        name: 'Pagrindinė sąskaita (Swedbank)',
        recipient: 'VšĮ „PENKTA KOJA“',
        iban: 'LT497300010106206608',
        bank: 'AB Swedbank',
        swift: 'HABALT22'
      },
      {
        name: 'Pagrindinė sąskaita (SEB)',
        recipient: 'VšĮ „PENKTA KOJA“',
        iban: 'LT10 7044 0600 0766 9611 ',
        bank: 'SEB',
        swift: 'HABALT22'
      },
      {
        name: 'Papildoma sąskaita (Paysera)',
        recipient: 'PENKTA KOJA“',
        iban: 'LT853500010002326794',
        bank: 'Paysera LT',
        swift: 'EVIULT2VXXX'
      }
    ]
  };

  for (let i = 0; i < fileContent.length; i++) {
    const animal = fileContent[i];
    if (!animal.link) continue;

    console.log(`🔍 Skrapinimas (${i + 1}/${fileContent.length}): ${animal.link}`);
    try {
      await page.goto(animal.link, { waitUntil: 'networkidle' });

      const detail = await page.evaluate(() => {
        const data = {}; // <-- čia būtina
      
        // Gyvūno vardas
        const nameEl = document.querySelector('h1.entry-title') || document.querySelector('h1.w-post-elm.post_title');
        if (nameEl) data.name = nameEl.textContent?.trim();
      
        // Trumpas aprašymas
          const shortDescEl = document.querySelector('.woocommerce-product-details__short-description');
          if (shortDescEl) {
            data.shortDescription = shortDescEl.textContent?.trim();
          }

          // Aprašymas / gyvūno savybės
          const descEl = document.querySelector('.w-tabs-section-content .w-post-elm.post_content');
          if (descEl) {
            const lines = Array.from(descEl.querySelectorAll('p'))
              .map(el => el.textContent?.trim())
              .filter(Boolean);

            data.aboutAnimal = {};
            lines.forEach(line => {
              if (/amžius/i.test(line)) data.aboutAnimal.age = line;
              if (/sterilizuota|kastruotas/i.test(line)) data.aboutAnimal.castrated = line;
              if (/skiepytas/i.test(line)) data.aboutAnimal.vaccinated = line;
              if (/ženkliukas|čipuotas/i.test(line)) data.aboutAnimal.chipped = line;
              if (/rajonas|Šalčininkų/i.test(line)) data.aboutAnimal.location = line;
            });
          }
      
        // Nuotraukos
        const galleryImgs = Array.from(document.querySelectorAll('.woocommerce .product-thumbnail img'))
          .map(img => img.src)
          .filter(Boolean);
        if (galleryImgs.length) data.imagesGallery = galleryImgs;
      
        return data;
      });

      // Pridėti fiksuotą prieglaudos info
      detail.shelter = fixedShelterInfo;

      results.push({ ...animal, ...detail });
    } catch (err) {
      console.error('❌ Klaida skrapinant:', err.message);
    }
  }

  await browser.close();

  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`🎉 Visi duomenys išsaugoti: ${outputPath}`);
})();