import { Article } from "./types";

const article: Article = {
  slug: "medications/allergies-itching",
  title: "Alergijos ir Niežulys Gyvūnams",
  metaTitle: "Gyvūnų Alergijų Gydymas | Apoquel, Cytopoint, Antihistaminai",
  metaDescription:
    "Išsamus vadovas apie šunų ir kačių alergijas: Apoquel, Cytopoint, antihistaminai, odos gydymas ir prevencija. Lietuvos veterinarų rekomendacijos.",
  keywords: [
    "Apoquel šunims",
    "Cytopoint",
    "šunų niežulys",
    "kačių alergija",
    "atopinis dermatitas",
    "odos alergija",
  ],
  lastUpdated: "2025-04-10",
  readTime: "8 min",
  intro:
    "Gyvūnų alergijos paveikia milijonus šunų ir kačių visame pasaulyje. Jos gali būti sezoninės (žiedadulkės) arba nuolatinės (maistas, erkučiai). Tinkamas gydymas ir prevencija yra esminiai kiekvienam atsakingam šeimininkui.",
  sections: [
    {
      heading: "Kaip atpažinti alergiją?",
      body: `Pagrindiniai alergijų simptomai:

**Šunims:** intensyvus niežulys, dažnas lojimas ar kramtymas letenėlių, raudona ar šlapia oda, ausų uždegimai, karštosios dėmės, plikinimas ant pilvo ar kirkšnių.

**Katėms:** pernelyg dažna priežiūra ir plaukų praradimas, plutelės ant kaklo ir nugaros, raudonos odos dėmės, lėtiniai ausų uždegimai.

Skiriamos 3 pagrindinės rūšys: aplinkos alergija (atopija), maisto alergija, blusų alerginė dermatita.`,
    },
    {
      heading: "Apoquel (Oclacitinib) — greičiausias reljefas",
      body: `Apoquel yra vienas efektyviausių šiuolaikinių alergijų vaistų šunims. Palengvėjimas juntamas per 4 valandas.

**Kaip veikia:** blokuoja specifinius JAK fermentus, atsakingus už niežulį ir uždegimą.

**Dozavimas:** 0,4–0,6 mg/kg du kartus per dieną pirmas 14 dienų, po to kartą per dieną palaikymui.

**Tinka:** šunims vyresniems nei 12 mėnesių, sveriems daugiau nei 3 kg.

**Svarbu:** nenaudojamas kartu su imunosupresantais ar gyvomis vakcinomis. Prieš skiriant — veterinaro konsultacija.`,
    },
  ],
  faq: [
    {
      question: "Ar galiu duoti žmogaus Zyrtec šuniui?",
      answer:
        "Taip, cetirizinas (Zyrtec) yra saugus šunims. Dozė: 1 mg/kg kartą per dieną. Patikrinkite, kad sudėtyje nebūtų pseudoefedrino ar ksilometazolino — jie mirtinai pavojingi.",
    },
  ],
  relatedSlugs: ["medications/anxiety-sedation"],
};

export default article;
