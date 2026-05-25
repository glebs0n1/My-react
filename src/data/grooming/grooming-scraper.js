import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

// ─── Paslaugų tipai (grooming) ───────────────────────────────────────────────
// Pagrindiniai: kirpykla. Galima pridėti ir kitus.
const SERVICE_TYPES = ['kirpykla'];  // galima: 'sunu-viesbutis', 'kaciu-viesbutis'

const BASE_URL = 'https://pupsy.lt/paslaugu-teikejai/';

const outputDir = '/Users/glebson/Desktop/My-react/src/data/grooming/grooming-miestai';
fs.mkdirSync(outputDir, { recursive: true });

// ─── Scrape detail page ──────────────────────────────────────────────────────
async function scrapeDetail(page, url) {
  const detail = {
    description: null,
    galleryImages: [],
    rating: null,
    reviewCount: 0,
    reviews: [],
    price: null,
    serviceTypes: [],
    phone: null,
    contactUrl: null,
  };

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(600);

    // ── Description ──────────────────────────────────────────────────────
    detail.description = await page.$eval(
      '.elementor-widget-text-editor p',
      el => el?.innerText?.trim() || null
    ).catch(() => null);

    // ── Gallery images ───────────────────────────────────────────────────
    detail.galleryImages = await page.$$eval(
      '#galerija img, [id="galerija"] img, .elementor-gallery img',
      imgs => imgs.map(img => img.src || img.getAttribute('data-src')).filter(Boolean)
    ).catch(() => []);

    // ── Rating ───────────────────────────────────────────────────────────
    detail.rating = await page.$eval(
      '.pupsy-rating-number, .glsr-tag-value',
      el => {
        const txt = el?.innerText?.trim();
        const num = parseFloat(txt?.replace(',', '.'));
        return isNaN(num) ? null : num;
      }
    ).catch(() => null);

    // ── Review count ─────────────────────────────────────────────────────
    const summaryText = await page.$eval(
      '.glsr-summary-text .glsr-tag-value',
      el => el?.innerText?.trim() || ''
    ).catch(() => '');
    const countMatch = summaryText.match(/(\d+)\s+atsiliepim/i);
    detail.reviewCount = countMatch ? parseInt(countMatch[1]) : 0;

    // ── Reviews ──────────────────────────────────────────────────────────
    detail.reviews = await page.$$eval(
      '.glsr-review',
      reviews => reviews.map(r => ({
        author: r.querySelector('.glsr-review-author .glsr-tag-value')?.innerText?.trim() || null,
        rating: r.querySelector('.glsr-star-rating')?.getAttribute('data-rating') || null,
        date: r.querySelector('.glsr-review-date .glsr-tag-value')?.innerText?.trim() || null,
        content: r.querySelector('.glsr-review-content .glsr-tag-value')?.innerText?.trim() || null,
      })).filter(r => r.author || r.content)
    ).catch(() => []);

    // ── Price ─────────────────────────────────────────────────────────────
    detail.price = await page.$eval(
      '.elementor-element-d02bc7a, .elementor-element-73e90cd',
      el => el?.innerText?.trim() || null
    ).catch(() => null);

    // ── Contact / phone (may be behind login) ─────────────────────────────
    detail.phone = await page.$eval(
      'a[href^="tel:"]',
      el => el?.getAttribute('href')?.replace('tel:', '') || null
    ).catch(() => null);

    detail.contactUrl = await page.$eval(
      '.pupsy-btn--primary',
      el => el?.getAttribute('href') || null
    ).catch(() => null);

  } catch (err) {
    console.log(`     ⚠️  Detail klaida: ${err.message}`);
  }

  return detail;
}

// ─── Parse service types from CSS classes ───────────────────────────────────
function parseServiceTypes(cssClass) {
  const types = [];
  const matches = cssClass.matchAll(/service_type-([\w-]+)/g);
  for (const m of matches) {
    const t = m[1].replace(/-/g, ' ')
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    types.push(t);
  }
  return types;
}

// ─── Parse city from CSS class ───────────────────────────────────────────────
function parseCitySlug(cssClass) {
  const m = cssClass.match(/city-([\w-]+)/);
  return m ? m[1] : null;
}

// ─── Main ────────────────────────────────────────────────────────────────────
(async () => {
  const browser = await chromium.launch({ headless: true });
  const listPage   = await browser.newPage();
  const detailPage = await browser.newPage();

  // ── Collect all cards across service type filters ─────────────────────
  const allCards = [];
  const seenUrls = new Set();

  for (const serviceType of SERVICE_TYPES) {
    console.log(`\n🔍 Filtras: ${serviceType}`);
    const url = `${BASE_URL}?service_type=${serviceType}`;
    await listPage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    // Click "Load more" until all cards are loaded
    let loadMoreClicks = 0;
    while (true) {
      const loadMoreBtn = await listPage.$('.elementor-button.e-load-more-button, [data-text="Load More"]');
      if (!loadMoreBtn) break;
      try {
        await loadMoreBtn.click();
        await listPage.waitForTimeout(1500);
        loadMoreClicks++;
        if (loadMoreClicks > 20) break; // safety
      } catch { break; }
    }
    console.log(`   📥 Load More: ${loadMoreClicks}x`);

    // ── Scrape all loop items ────────────────────────────────────────────
    const cards = await listPage.$$eval('.e-loop-item', items =>
      items.map(el => {
        const cssClass = el.className || '';
        const anchor = el.querySelector('a[href*="paslaugos"]');
        const href = anchor?.href || null;

        const imgEl = el.querySelector('.elementor-element-9fc0545 img');
        const image = imgEl?.src || imgEl?.getAttribute('data-src') || null;

        const rating = el.querySelector('.pupsy-rating-number')?.innerText?.trim() || null;
        const priceEl = el.querySelector('.elementor-element-73e90cd h2');
        const price = priceEl?.innerText?.trim() || null;

        const titleEl = el.querySelector('.elementor-element-a1c263b h1 a, .elementor-element-a1c263b a');
        const title = titleEl?.innerText?.trim() || null;

        const businessEl = el.querySelector('.elementor-element-054ed52 h2');
        const businessName = businessEl?.innerText?.trim() || null;

        const cityEl = el.querySelector('.elementor-element-f643bc5 a, .elementor-element-f643bc5 h2');
        const city = cityEl?.innerText?.trim() || null;

        return { cssClass, href, image, rating, price, title, businessName, city };
      })
    );

    for (const card of cards) {
      if (!card.href || seenUrls.has(card.href)) continue;
      seenUrls.add(card.href);
      allCards.push({ ...card, serviceType });
    }
    console.log(`   📋 Kortelės: ${cards.length} (iš viso unikalių: ${allCards.length})`);
  }

  console.log(`\n📦 Iš viso unikalių kortelių: ${allCards.length}`);

  // ── Visit each detail page and group by city ─────────────────────────
  const byCitySlug = {};

  for (let i = 0; i < allCards.length; i++) {
    const card = allCards[i];
    console.log(`\n🔗 [${i + 1}/${allCards.length}] ${card.businessName || card.title || '?'} — ${card.city}`);

    const citySlug = parseCitySlug(card.cssClass) || 'kita';
    const serviceTypes = parseServiceTypes(card.cssClass);
    const rating = card.rating ? parseFloat(card.rating.replace(',', '.')) : null;

    // Scrape detail
    let detail = {
      description: null, galleryImages: [], rating, reviewCount: 0,
      reviews: [], price: card.price, phone: null, contactUrl: null,
    };
    if (card.href) {
      detail = await scrapeDetail(detailPage, card.href);
      if (!detail.price && card.price) detail.price = card.price;
      if (!detail.rating && rating) detail.rating = rating;
    }

    const salon = {
      title: card.title,
      businessName: card.businessName,
      city: card.city,
      citySlug,
      serviceTypes,
      url: card.href,
      image: card.image,
      rating: detail.rating || rating,
      reviewCount: detail.reviewCount,
      price: detail.price || card.price,
      description: detail.description,
      galleryImages: detail.galleryImages,
      reviews: detail.reviews,
      phone: detail.phone,
      contactUrl: detail.contactUrl,
    };

    if (!byCitySlug[citySlug]) {
      byCitySlug[citySlug] = {
        citySlug,
        city: card.city || citySlug,
        salons: [],
      };
    }
    byCitySlug[citySlug].salons.push(salon);

    await detailPage.waitForTimeout(300);
  }

  // ── Save one JSON per city ────────────────────────────────────────────
  const summary = [];
  for (const [slug, data] of Object.entries(byCitySlug)) {
    const out = {
      citySlug: slug,
      city: data.city,
      totalSalons: data.salons.length,
      scrapedAt: new Date().toISOString(),
      salons: data.salons,
    };

    const filePath = path.join(outputDir, `${slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(out, null, 2), 'utf-8');
    console.log(`✅ ${slug}.json — ${data.salons.length} kirpyklos`);
    summary.push({ citySlug: slug, city: data.city, count: data.salons.length });
  }

  // ── Index file ─────────────────────────────────────────────────────────
  fs.writeFileSync(
    path.join(outputDir, '_index.json'),
    JSON.stringify({ totalCities: summary.length, scrapedAt: new Date().toISOString(), cities: summary }, null, 2),
    'utf-8'
  );

  await browser.close();

  console.log('\n🎉 Baigta!');
  summary.forEach(s => console.log(`   ${s.city} (${s.citySlug}): ${s.count}`));
})();