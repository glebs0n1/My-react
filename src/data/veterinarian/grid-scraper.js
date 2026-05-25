import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

// ─── Miestų konfigūracija ───────────────────────────────────────────────────
const cities = [
  { slug: 'vilnius',      url: 'https://www.vetklinikos.lt/?city=vilnius',      label: 'Vilnius',      title: 'Veterinarijos klinikos Vilniuje',      desc: 'Raskite geriausias veterinarijos klinikas Vilniuje. Palyginimui pateikiame visas registruotas klinikas su aktualiais kontaktais ir darbo laiku.' },
  { slug: 'kaunas',       url: 'https://www.vetklinikos.lt/?city=kaunas',       label: 'Kaunas',       title: 'Veterinarijos klinikos Kaune',          desc: 'Raskite geriausias veterinarijos klinikas Kaune. Palyginimui pateikiame visas registruotas klinikas su aktualiais kontaktais ir darbo laiku.' },
  { slug: 'klaipeda',     url: 'https://www.vetklinikos.lt/?city=klaipeda',     label: 'Klaipėda',     title: 'Veterinarijos klinikos Klaipėdoje',     desc: 'Raskite geriausias veterinarijos klinikas Klaipėdoje. Palyginimui pateikiame visas registruotas klinikas su aktualiais kontaktais ir darbo laiku.' },
  { slug: 'siauliai',     url: 'https://www.vetklinikos.lt/siauliai',           label: 'Šiauliai',     title: 'Veterinarijos klinikos Šiauliuose',     desc: 'Raskite geriausias veterinarijos klinikas Šiauliuose. Palyginimui pateikiame visas registruotas klinikas su aktualiais kontaktais ir darbo laiku.' },
  { slug: 'panevezys',    url: 'https://www.vetklinikos.lt/panevezys',          label: 'Panevėžys',    title: 'Veterinarijos klinikos Panevėžyje',     desc: 'Raskite geriausias veterinarijos klinikas Panevėžyje. Palyginimui pateikiame visas registruotas klinikas su aktualiais kontaktais ir darbo laiku.' },
  { slug: 'alytus',       url: 'https://www.vetklinikos.lt/?city=alytus',       label: 'Alytus',       title: 'Veterinarijos klinikos Alytuje',        desc: 'Raskite geriausias veterinarijos klinikas Alytuje. Palyginimui pateikiame visas registruotas klinikas su aktualiais kontaktais ir darbo laiku.' },
  { slug: 'marijampole',  url: 'https://www.vetklinikos.lt/?city=marijampole',  label: 'Marijampolė',  title: 'Veterinarijos klinikos Marijampolėje',  desc: 'Raskite geriausias veterinarijos klinikas Marijampolėje. Palyginimui pateikiame visas registruotas klinikas su aktualiais kontaktais ir darbo laiku.' },
  { slug: 'mazeikiai',    url: 'https://www.vetklinikos.lt/?city=mazeikiai',    label: 'Mažeikiai',    title: 'Veterinarijos klinikos Mažeikiuose',    desc: 'Raskite geriausias veterinarijos klinikas Mažeikiuose. Palyginimui pateikiame visas registruotas klinikas su aktualiais kontaktais ir darbo laiku.' },
  { slug: 'utena',        url: 'https://www.vetklinikos.lt/?city=utena',        label: 'Utena',        title: 'Veterinarijos klinikos Utenoje',        desc: 'Raskite geriausias veterinarijos klinikas Utenoje. Palyginimui pateikiame visas registruotas klinikas su aktualiais kontaktais ir darbo laiku.' },
  { slug: 'visaginas',    url: 'https://www.vetklinikos.lt/?city=visaginas',    label: 'Visaginas',    title: 'Veterinarijos klinikos Visagine',       desc: 'Raskite geriausias veterinarijos klinikas Visagine. Palyginimui pateikiame visas registruotas klinikas su aktualiais kontaktais ir darbo laiku.' },
  { slug: 'telsiai',      url: 'https://www.vetklinikos.lt/?city=telsiai',      label: 'Telšiai',      title: 'Veterinarijos klinikos Telšiuose',      desc: 'Raskite geriausias veterinarijos klinikas Telšiuose. Palyginimui pateikiame visas registruotas klinikas su aktualiais kontaktais ir darbo laiku.' },
  { slug: 'plunge',       url: 'https://www.vetklinikos.lt/?city=plunge',       label: 'Plungė',       title: 'Veterinarijos klinikos Plungėje',       desc: 'Raskite geriausias veterinarijos klinikas Plungėje. Palyginimui pateikiame visas registruotas klinikas su aktualiais kontaktais ir darbo laiku.' },
  { slug: 'kretinga',     url: 'https://www.vetklinikos.lt/?city=kretinga',     label: 'Kretinga',     title: 'Veterinarijos klinikos Kretingoje',     desc: 'Raskite geriausias veterinarijos klinikas Kretingoje. Palyginimui pateikiame visas registruotas klinikas su aktualiais kontaktais ir darbo laiku.' },
  { slug: 'jonava',       url: 'https://www.vetklinikos.lt/?city=jonava',       label: 'Jonava',       title: 'Veterinarijos klinikos Jonavoje',       desc: 'Raskite geriausias veterinarijos klinikas Jonavoje. Palyginimui pateikiame visas registruotas klinikas su aktualiais kontaktais ir darbo laiku.' },
];

// ─── Unsplash fallback pool ─────────────────────────────────────────────────
const FALLBACK_PHOTOS = [
  'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&q=80',
  'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80',
  'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80',
  'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&q=80',
  'https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=800&q=80',
  'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800&q=80',
];
let fallbackIndex = 0;
const getNextFallback = () => FALLBACK_PHOTOS[fallbackIndex++ % FALLBACK_PHOTOS.length];

// ─── Parse price ────────────────────────────────────────────────────────────
function parsePrice(priceText) {
  if (!priceText) return { symbols: '€€', label: 'Vidutiniškai', raw: null };
  const match = priceText.match(/(€+)\s*\((.+?)\)/);
  if (match) return { symbols: match[1], label: match[2], raw: priceText.trim() };
  return { symbols: priceText.trim(), label: '', raw: priceText.trim() };
}

// ─── Scrape detail page ─────────────────────────────────────────────────────
async function scrapeClinicDetail(page, clinicUrl) {
  const detail = {
    image: null,
    fullName: null,
    address: null,
    addressCity: null,
    phone: null,
    email: null,
    website: null,
    workingHoursLabel: null,   // pvz. "24/7" arba "Atidaryta iki 18:00"
    workingHours: [],          // [{ day: 'Pirmadienis', hours: '09:00 - 18:00' }, ...]
    services: [],              // ['chirurgija', 'vakcinacija', ...]
    whyUs: [],                 // [{ title: '...', description: '...' }]
    animals: [],               // ['Šunys', 'Katės']
    languages: [],             // ['Lietuvių', 'Anglų']
    payment: [],               // ['Grynais', 'Kortele']
    amenities: [],             // ['Privati aikštelė', 'Pritaikyta neįgaliesiems']
    mapSrc: null,
  };

  try {
    await page.goto(clinicUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(800);

    // ── Nuotrauka ──────────────────────────────────────────────────────────
    const img = await page.$eval(
      'article img, .clinic-image img, main img[src]:not([src*="placeholder"]):not([src*="data:"])',
      el => el?.src || null
    ).catch(() => null);
    if (img && img.startsWith('http')) detail.image = img;

    // ── Hero: pilnas pavadinimas, adresas, telefonas ───────────────────────
    detail.fullName = await page.$eval(
      'section h1', el => el?.innerText?.trim() || null
    ).catch(() => null);

    detail.address = await page.$eval(
      '.lucide-map-pin + div .font-medium, .lucide-map-pin ~ div span.font-medium',
      el => el?.innerText?.trim() || null
    ).catch(() => null);

    detail.addressCity = await page.$eval(
      '.lucide-map-pin + div span:not(.font-medium), .lucide-map-pin ~ div span:last-child',
      el => el?.innerText?.trim() || null
    ).catch(() => null);

    detail.phone = await page.$eval(
      'a[href^="tel:"]', el => el?.innerText?.trim() || null
    ).catch(() => null);

    detail.email = await page.$eval(
      'a[href^="mailto:"]', el => el?.getAttribute('href')?.replace('mailto:', '') || null
    ).catch(() => null);

    detail.website = await page.$eval(
      'a[href*="ref=vetklinikos"]', el => el?.getAttribute('href') || null
    ).catch(() => null);

    // ── Working hours label (badge viršuje) ───────────────────────────────
    detail.workingHoursLabel = await page.$eval(
      '[class*="animate-pulse"] + span, .bg-\\[\\#f3f3f6\\] .font-semibold',
      el => el?.innerText?.trim() || null
    ).catch(() => null);

    // ── Darbo laikas (lentelė) ─────────────────────────────────────────────
    detail.workingHours = await page.$$eval(
      'section .space-y-2 > div, section [class*="rounded-lg"]:has(.font-medium)',
      rows => rows.map(row => {
        const spans = row.querySelectorAll('span');
        if (spans.length >= 2) {
          return {
            day: spans[0]?.innerText?.trim(),
            hours: spans[1]?.innerText?.trim(),
          };
        }
        return null;
      }).filter(Boolean)
    ).catch(() => []);

    // ── Paslaugos (services grid) ──────────────────────────────────────────
    detail.services = await page.$$eval(
      'section .grid span.font-semibold',
      els => els.map(el => el?.innerText?.trim()).filter(Boolean)
    ).catch(() => []);

    // Backup: span su bg-[#f3f3f6] prie paslaugų
    if (!detail.services.length) {
      detail.services = await page.$$eval(
        '.grid .flex.items-center.gap-3 span.font-semibold',
        els => els.map(el => el?.innerText?.trim()).filter(Boolean)
      ).catch(() => []);
    }

    // ── "Kodėl pasirinkti" blokas ──────────────────────────────────────────
    detail.whyUs = await page.$$eval(
      'section .grid .rounded-xl.bg-white',
      cards => cards.map(card => ({
        title: card.querySelector('h3')?.innerText?.trim() || null,
        description: card.querySelector('p')?.innerText?.trim() || null,
      })).filter(c => c.title)
    ).catch(() => []);

    // ── Papildoma informacija ──────────────────────────────────────────────
    const infoSections = await page.$$eval(
      'section .grid > div:has(h3)',
      sections => sections.map(sec => {
        const title = sec.querySelector('h3')?.innerText?.trim();
        const tags = Array.from(sec.querySelectorAll('span.font-medium')).map(s => s?.innerText?.trim());
        const checkItems = Array.from(sec.querySelectorAll('.flex.items-center.gap-2 span')).map(s => s?.innerText?.trim());
        return { title, values: tags.length ? tags : checkItems };
      }).filter(s => s.title && s.values.length)
    ).catch(() => []);

    for (const sec of infoSections) {
      const t = sec.title?.toLowerCase() || '';
      if (t.includes('gyvūn'))   detail.animals   = sec.values;
      if (t.includes('kalb'))    detail.languages = sec.values;
      if (t.includes('atsiskai')) detail.payment  = sec.values;
      if (t.includes('patogum')) detail.amenities = sec.values;
    }

    // ── Google Maps iframe src ─────────────────────────────────────────────
    detail.mapSrc = await page.$eval(
      'iframe[src*="maps.google"]', el => el?.getAttribute('src') || null
    ).catch(() => null);

  } catch (err) {
    console.log(`     ⚠️  Detail scrape klaida: ${err.message}`);
  }

  return detail;
}

// ─── Main ────────────────────────────────────────────────────────────────────
(async () => {
  const browser = await chromium.launch({ headless: true });
  const listPage   = await browser.newPage();
  const detailPage = await browser.newPage();

  const outputDir = '/Users/glebson/Desktop/My-react/src/data/veterinarian/vetklinikos-miestai';
  fs.mkdirSync(outputDir, { recursive: true });

  const summary = [];

  for (const city of cities) {
    console.log(`\n🏙️  ${city.label} — ${city.url}`);

    let clinics = [];

    try {
      await listPage.goto(city.url, { waitUntil: 'networkidle', timeout: 30000 });

      // ── Scrape grid cards ────────────────────────────────────────────────
      const rawCards = await listPage.$$eval('article', cards =>
        cards.map(card => {
          const anchor    = card.closest('a');
          const href      = anchor?.href || null;
          const name      = card.querySelector('h3')?.innerText?.trim() || null;
          const cityText  = card.querySelector('.lucide-map-pin + span')?.innerText?.trim() || null;

          const statusEl  = card.querySelector('[class*="bg-success"]');
          const status    = statusEl?.innerText?.trim() || 'Nežinoma';
          const isOpen    = status.toLowerCase().includes('atidaryta');

          const tagEls    = card.querySelectorAll('.flex.flex-wrap span');
          const tags      = Array.from(tagEls).map(t => t.innerText.trim()).filter(Boolean);

          const priceEl   = card.querySelector('.lucide-euro + span');
          const priceRaw  = priceEl?.innerText?.trim() || null;

          const phoneEl   = card.querySelector('.lucide-phone ~ span');
          const phone     = phoneEl?.innerText?.trim() || null;

          return { name, href, cityText, status, isOpen, tags, priceRaw, phone };
        })
      );

      console.log(`   📋 Kortelių: ${rawCards.length}`);

      // ── Visit each clinic detail page ────────────────────────────────────
      for (let i = 0; i < rawCards.length; i++) {
        const raw = rawCards[i];
        if (!raw.name) continue;

        console.log(`   🔗 [${i + 1}/${rawCards.length}] ${raw.name}`);

        let detail = {
          image: null, fullName: null, address: null, addressCity: null,
          phone: null, email: null, website: null, workingHoursLabel: null,
          workingHours: [], services: [], whyUs: [], animals: [],
          languages: [], payment: [], amenities: [], mapSrc: null,
        };

        if (raw.href) {
          detail = await scrapeClinicDetail(detailPage, raw.href);
        }

        // Fallback nuotrauka
        if (!detail.image) {
          detail.image = getNextFallback();
        }

        const price = parsePrice(raw.priceRaw);

        clinics.push({
          // ── Grid data ──────────────────────────────────────────
          name:      raw.name,
          city:      raw.cityText || city.label,
          citySlug:  city.slug,
          status:    raw.status,
          isOpen:    raw.isOpen,
          tags:      raw.tags,
          price,
          phone:     raw.phone || detail.phone,
          url:       raw.href,

          // ── Detail page data ────────────────────────────────────
          image:             detail.image,
          fullName:          detail.fullName || raw.name,
          address:           detail.address,
          addressCity:       detail.addressCity,
          email:             detail.email,
          website:           detail.website,
          workingHoursLabel: detail.workingHoursLabel,
          workingHours:      detail.workingHours,
          services:          detail.services.length ? detail.services : raw.tags,
          whyUs:             detail.whyUs,
          animals:           detail.animals,
          languages:         detail.languages,
          payment:           detail.payment,
          amenities:         detail.amenities,
          mapSrc:            detail.mapSrc,
        });

        // Mažas delay kad neperkrautume serverio
        await detailPage.waitForTimeout(300);
      }

    } catch (err) {
      console.error(`   ❌ ${err.message}`);
    }

    // ── Išsaugome miesto failą ───────────────────────────────────────────
    const cityData = {
      city:          city.label,
      citySlug:      city.slug,
      pageTitle:     city.title,
      pageDesc:      city.desc,
      totalClinics:  clinics.length,
      scrapedAt:     new Date().toISOString(),
      clinics,
    };

    const filePath = path.join(outputDir, `${city.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(cityData, null, 2), 'utf-8');
    console.log(`   ✅ Išsaugota: ${city.slug}.json (${clinics.length} klinikos)`);

    summary.push({ city: city.label, citySlug: city.slug, totalClinics: clinics.length });
  }

  await browser.close();

  // ── Index failas ─────────────────────────────────────────────────────────
  const indexPath = path.join(outputDir, '_index.json');
  fs.writeFileSync(indexPath, JSON.stringify({
    totalCities:  cities.length,
    scrapedAt:    new Date().toISOString(),
    cities:       summary,
  }, null, 2), 'utf-8');

  console.log('\n🎉 Viskas baigta!');
  console.log('📁', outputDir);
  summary.forEach(s => console.log(`   ${s.city}: ${s.totalClinics} klinikos`));
})();