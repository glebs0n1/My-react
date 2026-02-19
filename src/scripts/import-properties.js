/**
 * import-properties.js
 * --------------------
 * Importuoja scraped JSON į PostgreSQL "properties" lentelę
 */

import fs from "fs";
import path from "path";
import pkg from "pg";
const { Pool } = pkg;

// ==========================
// 🔧 DB CONFIG
// ==========================
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "Glebka123!",
  database: "pet_backend",
});

// ==========================
// 📂 JSON FAILO KELIAS
// ==========================
const JSON_PATH = path.resolve(
  "src/data/kaimo-turizmas/kaimo-turizmas.json"
);

// ==========================
// 🧠 HELPERS
// ==========================

// "300-900 €" → 300
// "150 €" → 150
function parsePricePerNight(priceRaw) {
  if (!priceRaw || typeof priceRaw !== "string") return 0;

  const numbers = priceRaw.match(/\d+/g);
  if (!numbers) return 0;

  return Number(numbers[0]);
}

// "Vilnius, kažkas..." → "Vilnius"
function extractCity(description = "") {
  if (!description || typeof description !== "string") return null;
  return description.split(",")[0].trim();
}

// "iki 30 žmonių" → 30
function extractMaxPeople(text = "") {
  if (!text || typeof text !== "string") return 20;

  const match = text.match(/iki\s*(\d+)\s*(žmonių|svečių)/i);
  if (match) return Number(match[1]);

  return 20; // fallback
}

// ==========================
// 🚀 IMPORT LOGIC
// ==========================
async function importProperties() {
  const client = await pool.connect();

  try {
    const raw = fs.readFileSync(JSON_PATH, "utf-8");
    const properties = JSON.parse(raw);

    console.log(`📦 Rasta ${properties.length} objektų JSON faile`);

    let imported = 0;
    let skipped = 0;

    for (const item of properties) {
      if (!item.id || !item.title) {
        console.warn("⚠️ Praleidžiam įrašą be id arba title:", item);
        skipped++;
        continue;
      }

      const pricePerNight = parsePricePerNight(item.price);
      const city = extractCity(item.description);
      const maxPeople = extractMaxPeople(item.description);

      const query = `
        INSERT INTO properties (
          id,
          title,
          description,
          price_per_night,
          price_raw,
          city,
          category,
          image,
          link,
          rating,
          max_people,
          owner_id
        )
        VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
        )
        ON CONFLICT (id) DO NOTHING
      `;

      const values = [
        item.id,
        item.title,
        item.description || null,
        pricePerNight,
        item.price || null,
        city,
        item.address || null, // category
        item.image || null,
        item.link || null,
        item.rating || null,
        maxPeople, // ✅ NIEKADA ne NULL
        null, // owner_id – scraped objektai neturi savininko
      ];

      await client.query(query, values);
      imported++;

      console.log(`✅ Importuota: [${item.id}] ${item.title}`);
    }

    console.log("=================================");
    console.log("🎉 IMPORTAS BAIGTAS");
    console.log(`✅ Importuota: ${imported}`);
    console.log(`⚠️ Praleista: ${skipped}`);
    console.log("=================================");
  } catch (err) {
    console.error("❌ Importo klaida:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

// ▶️ RUN
importProperties();