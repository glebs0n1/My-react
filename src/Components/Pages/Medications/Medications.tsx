import React from "react";
import { Link } from "react-router-dom";
import {
  Seo,
  breadcrumbSchema,
  itemListSchema,
  SITE_URL,
} from "../../SEO";
import medicationsBanner from "../../../assets/medications.jpg";
import allergies from "../../../assets/allergies.svg";
import anxiety from "../../../assets/anxiety.svg";
import Diabetes from "../../../assets/diabet.svg";
import Diarrhea from "../../../assets/diarrhea.svg";
import Ticks from "../../../assets/ticks.svg";
import Heartworms from "../../../assets/heartworm.svg";
import Infections from "../../../assets/infections.svg";
import Vomiting from "../../../assets/vomiting.svg";
import Pain from "../../../assets/pain.svg";
import Seizures from "../../../assets/seizures.svg";
import Stomach from "../../../assets/stomach.svg";
import Donation from "../../Donation/Donation";
import donationPetImage from "../../../assets/dog.jpeg";

interface SubCategory {
  image?: string;
  emoji?: string;
  title: string;
  slug: string;
  description: string;
}

interface HubSection {
  id: string;
  emoji: string;
  label: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  description: string;
  subcategories: SubCategory[];
}

const hubSections: HubSection[] = [
  {
    id: "sveikata",
    emoji: "🏥",
    label: "Sveikata",
    colorClass: "text-red-700",
    bgClass: "bg-red-50",
    borderClass: "border-red-200",
    description: "Simptomai, skubioji pagalba, vizitai ir ką daryti sergant",
    subcategories: [
      { emoji: "🚨", title: "Skubūs atvejai — ką daryti?", slug: "health/skubus-atvejai", description: "Kada vežti į kliniką nedelsdami ir kaip elgtis krizės metu" },
      { emoji: "🌡️", title: "Temperatūra — kada pavojinga?", slug: "health/temperatura", description: "Normali temperatūra, karščiavimas ir kaip matuoti namuose" },
      { emoji: "🚽", title: "Viduriavimas — ką daryti?", slug: "health/viduriavimas", description: "Priežastys, namų gydymas ir kada kreiptis į veterinarą" },
      { emoji: "🤢", title: "Vėmimas — priežastys ir gydymas", slug: "health/vemimas", description: "Kada pavojinga, ką duoti ir kada skubėti į kliniką" },
      { emoji: "🕷️", title: "Erkė įkando — ką daryti?", slug: "health/erke-ikando", description: "Kaip išimti erkę, babeliozės simptomai, prevencija Lietuvoje" },
      { emoji: "💔", title: "Gyvūnas skauda — kaip atpažinti?", slug: "health/skausmas", description: "Skausmo požymiai, ką galima duoti ir ko niekada negalima" },
      { emoji: "👂", title: "Ausų problemos ir lašiukai", slug: "health/ausys", description: "Uždegimo simptomai, valymas ir tinkami preparatai" },
      { emoji: "👃", title: "Nosies lašiukai ir problemos", slug: "health/nosis", description: "Kada reikia lašiukų, kokie saugūs ir kaip juos naudoti" },
      { emoji: "🎒", title: "Ką pasiimti į kliniką?", slug: "health/pasiruosimas-klinikai", description: "Dokumentai, mėginiai, vaistai ir kiti svarbūs dalykai" },
      { emoji: "🩺", title: "Kaip pasiruošti veterinarijos vizitui?", slug: "health/vizito-pasiruosimas", description: "Patarimai, kad vizitas būtų kuo mažiau stresingo" },
    ],
  },
  {
    id: "vaistai",
    emoji: "💊",
    label: "Vaistai",
    colorClass: "text-purple-700",
    bgClass: "bg-purple-50",
    borderClass: "border-purple-200",
    description: "Vaistų vadovai, dozavimas, antibiotikai ir specialūs preparatai",
    subcategories: [
      { image: allergies,   title: "Alergijos ir niežulys",       slug: "medications/allergies-itching",  description: "Apoquel, Cytopoint, antihistaminai ir natūralios priemonės" },
      { image: anxiety,     title: "Nerimas ir raminimas",         slug: "medications/anxiety-sedation",   description: "Trazodonas, Sileo, Feliway ir sprendimai fejerverkų metu" },
      { image: Diabetes,    title: "Diabetas",                     slug: "medications/diabetes",            description: "Insulino tipai, dozavimas, stebėjimas ir remisija" },
      { image: Diarrhea,    title: "Viduriavimas",                 slug: "medications/diarrhea",            description: "Metronidazolas, probiotikai ir lengva dieta" },
      { image: Ticks,       title: "Blusos ir erkės",              slug: "medications/fleas-ticks",         description: "Bravecto, NexGard, Frontline — kas tikrai veikia" },
      { image: Heartworms,  title: "Širdies kirminai",             slug: "medications/heartworms",          description: "Prevencija keliaujant į pietines šalis" },
      { image: Infections,  title: "Infekcijos ir antibiotikai",   slug: "medications/infections",          description: "Clavamox, doksiciklinas ir teisingas vartojimas" },
      { image: Vomiting,    title: "Pykinimas ir vėmimas",         slug: "medications/nausea-vomiting",     description: "Cerenia, Zofran, Pepcid — kada ir kiek duoti" },
      { image: Pain,        title: "Skausmas ir artritas",         slug: "medications/pain-arthritis",      description: "Rimadyl, Galliprant, Metacam ir sąnarių papildai" },
      { image: Seizures,    title: "Priepuoliai ir epilepsija",    slug: "medications/seizures",            description: "Fenobarbitalis, Keppra ir skubioji pagalba" },
      { image: Stomach,     title: "Skrandžio opos ir gastritas",  slug: "medications/stomach-ulcers",      description: "Omeprazolas, sukralfatas ir apsauginiai vaistai" },
      { emoji: "🪱",        title: "Kirminai — prevencija",        slug: "medications/kirminai",            description: "Milprazon, Broadline, Drontal — reguliarus gydymas" },
    ],
  },
  {
    id: "mityba",
    emoji: "🥩",
    label: "Mityba",
    colorClass: "text-green-700",
    bgClass: "bg-green-50",
    borderClass: "border-green-200",
    description: "Geriausias maistas, dietos, vitaminai ir maitinimo grafikai",
    subcategories: [
      { emoji: "🍖", title: "Koks maistas geriausias?",         slug: "nutrition/geriausias-maistas",  description: "Kaip skaityti sudėtį, ko vengti ir ką rinktis" },
      { emoji: "💧", title: "Sausas ar šlapias maistas?",       slug: "nutrition/sausas-vs-slapias",   description: "Privalumai, trūkumai ir kada rinktis ką" },
      { emoji: "🚫", title: "Ko gyvūnams NEGALIMA valgyti?",   slug: "nutrition/draudziamas-maistas",  description: "Šokoladas, svogūnai, razinos — pilnas pavojingų sąrašas" },
      { emoji: "🤷", title: "Gyvūnas nevalgo — ką daryti?",    slug: "nutrition/nevalgo",              description: "Priežastys, kaip paskatinti ir kada pas veterinarą" },
      { emoji: "🌾", title: "Maistas alergiškiems gyvūnams",   slug: "nutrition/alerginiu-maistas",    description: "Hidrolizuotas baltymas ir eliminacijos dieta" },
      { emoji: "💊", title: "Vitaminai ir papildai",            slug: "nutrition/vitaminai",             description: "Omega-3, probiotikai, gliukozaminas — kas veikia" },
      { emoji: "🏥", title: "Dietos sergantiems gyvūnams",     slug: "nutrition/serganciu-dieta",      description: "Hill's, Royal Canin, Purina medicininiai maistai" },
      { emoji: "⚖️", title: "Nutukimas — kaip numesti svorio?", slug: "nutrition/nutukimas",            description: "Sveika svorių kontrolė, kalorijos ir mitybos planas" },
    ],
  },
  {
    id: "prieglauda",
    emoji: "🏠",
    label: "Prieglauda & Įvaikinimas",
    colorClass: "text-orange-700",
    bgClass: "bg-orange-50",
    borderClass: "border-orange-200",
    description: "Adoptavimo procesas, dokumentai ir pirmosios dienos namuose",
    subcategories: [
      { emoji: "📋", title: "Kaip įvaikinti gyvūną?",           slug: "adoption/kaip-ivaikinti",     description: "Žingsnis po žingsnio adoptavimo procesas Lietuvoje" },
      { emoji: "📄", title: "Kokie dokumentai reikalingi?",     slug: "adoption/dokumentai",          description: "Veterinarinis pasas, čipas, registracija savivaldybėje" },
      { emoji: "🏡", title: "Pasiruošimas prieš parsinešant",   slug: "adoption/pasiruosimas",        description: "Ką pirkti, kaip paruošti namus ir ką žinoti" },
      { emoji: "🔄", title: "Adaptacija naujuose namuose",      slug: "adoption/adaptacija",          description: "Pirmosios dienos, streso požymiai ir kaip padėti" },
      { emoji: "👶", title: "Gyvūnas bijo vaikų — ką daryti?", slug: "adoption/bijo-vaiku",          description: "Saugus supažindinimas ir elgesio koregavimas" },
      { emoji: "😠", title: "Gyvūnas puola — kas atsitiko?",   slug: "adoption/agresija",            description: "Agresijos priežastys, prevencija ir sprendimo keliai" },
      { emoji: "💰", title: "Kiek kainuoja įvaikinti?",         slug: "adoption/kaina",               description: "Mokesčiai, pirmoji priežiūra ir planuojamos išlaidos" },
    ],
  },
  {
    id: "kirpyklos",
    emoji: "✂️",
    label: "Kirpyklos & Grooming",
    colorClass: "text-pink-700",
    bgClass: "bg-pink-50",
    borderClass: "border-pink-200",
    description: "Priežiūra, šampūnai, nagų karpymas ir geriausios kirpyklos",
    subcategories: [
      { emoji: "🛁", title: "Kaip maudyti šunį ar katę?",      slug: "grooming/maudymas",              description: "Dažnumas, technika ir jei gyvūnas nekenčia vandens" },
      { emoji: "🧴", title: "Koks šampūnas geriausias?",        slug: "grooming/sampunas",              description: "Virbac, Douxo, Malaseb — tinkamas pagal odos tipą" },
      { emoji: "✂️", title: "Kada ir kaip kirpti?",             slug: "grooming/kirpimas",              description: "Dažnumas pagal veislę ir kaip pasirinkti kirpyklą" },
      { emoji: "💅", title: "Nagų karpymas namuose",            slug: "grooming/nagai",                 description: "Instrumentai, technika ir jei gyvūnas bijo" },
      { emoji: "👂", title: "Ausų valymas — kaip ir kuo?",     slug: "grooming/ausu-valymas",          description: "Otodine, Epi-Otic — teisingas valymas be žalos" },
      { emoji: "🦷", title: "Dantų priežiūra",                  slug: "grooming/dantys",                description: "Šepetėliai, pastos ir profesionalus dantų valymas" },
      { emoji: "🏪", title: "Kaip pasirinkti kirpyklą?",        slug: "grooming/kirpyklos-pasirinkimas", description: "Į ką atkreipti dėmesį ir kada keisti kirpyklą" },
    ],
  },
  {
    id: "dresavimas",
    emoji: "🎓",
    label: "Dresavimas",
    colorClass: "text-blue-700",
    bgClass: "bg-blue-50",
    borderClass: "border-blue-200",
    description: "Elgesio koregavimas, šuniukų mokymas, socializacija ir mokyklos",
    subcategories: [
      { emoji: "🐶", title: "Kaip dresuoti šuniuką?",           slug: "training/suniuko-dresura",       description: "Pirmosios komandos, pozityvus pastiprinimas ir rutina" },
      { emoji: "📅", title: "Kada pradėti dresūrą?",            slug: "training/kada-praderti",         description: "Amžius, pasiruošimas ir pirmosios sesijos" },
      { emoji: "🤝", title: "Socializacija — kaip ir kada?",    slug: "training/socializacija",         description: "Kritinis laikotarpis ir ką daryti jei praleistas" },
      { emoji: "😡", title: "Gyvūnas puola ar grumia",          slug: "training/agresija-dresura",      description: "Agresijos tipai, priežastys ir profesionalo pagalba" },
      { emoji: "😨", title: "Gyvūnas bijo — kaip padėti?",     slug: "training/baimes",                description: "Baimių desensibilizacija ir dažniausios klaidos" },
      { emoji: "🏫", title: "Kaip pasirinkti dresūros mokyklą?", slug: "training/mokyklos-pasirinkimas", description: "Sertifikatai, metodai ir į ką atkreipti dėmesį" },
      { emoji: "🏅", title: "Dresūros kursų tipai",             slug: "training/kursu-tipai",           description: "Paklusnumas, agility, nosework, terapiniai šunys" },
    ],
  },
  {
    id: "veterinarai",
    emoji: "👨‍⚕️",
    label: "Veterinarai & Klinikos",
    colorClass: "text-teal-700",
    bgClass: "bg-teal-50",
    borderClass: "border-teal-200",
    description: "Kaip pasirinkti, kada važiuoti ir kur rasti skubios pagalbos",
    subcategories: [
      { emoji: "🔍", title: "Kaip pasirinkti veterinarą?",      slug: "vets/kaip-pasirinkti",     description: "Gero ir blogo veterinaro požymiai" },
      { emoji: "🚗", title: "Kada vežti pas veterinarą?",       slug: "vets/kada-vesti",           description: "Skubu / neskubu lentelė ir sprendimų vadovas" },
      { emoji: "🌙", title: "Naktinės ir 24/7 klinikos",        slug: "vets/24-7-klinikos",        description: "Kur kreiptis naktį ir savaitgaliais Lietuvoje" },
      { emoji: "📅", title: "Metinis patikrinimas — kodėl svarbu?", slug: "vets/metinis-patikrinimas", description: "Kas tikrinama ir kodėl profilaktika pigesnė" },
      { emoji: "💰", title: "Veterinarijos išlaidos",           slug: "vets/islaidos",             description: "Vidutinės kainos, draudimas ir kaip taupyti" },
      { emoji: "🏥", title: "Specializuotos klinikos",          slug: "vets/specializuotos",       description: "Ortopedija, onkologija, oftalmologija" },
    ],
  },
  {
    id: "auginimas",
    emoji: "🌱",
    label: "Gyvūno Auginimas",
    colorClass: "text-lime-700",
    bgClass: "bg-lime-50",
    borderClass: "border-lime-200",
    description: "Atsakingas šunų, kačių ir kitų gyvūnų auginimas nuo pradžių",
    subcategories: [
      { emoji: "📜", title: "Kokie dokumentai reikalingi?",     slug: "care/dokumentai",          description: "Čipas, veterinarinis pasas, registracija ir skiepai" },
      { emoji: "💉", title: "Skiepų kalendorius",               slug: "care/skiepai",              description: "Privalomi ir rekomenduojami skiepai šunims ir katėms" },
      { emoji: "🐕", title: "Kaip auginti šunį?",              slug: "care/sunis-auginimas",      description: "Nuo šuniuko iki seno šuns — kiekvienas etapas" },
      { emoji: "🐈", title: "Kaip auginti katę?",              slug: "care/kate-auginimas",       description: "Mityba, priežiūra, sterilizacija, aplinkos turtinimas" },
      { emoji: "✂️", title: "Kastracija ir sterilizacija",     slug: "care/kastracija",           description: "Kada, kodėl ir ką tikėtis po operacijos" },
      { emoji: "💵", title: "Kiek kainuoja auginti gyvūną?",   slug: "care/islaidos-auginimas",   description: "Mėnesinės išlaidos ir kaip planuoti biudžetą" },
      { emoji: "🧳", title: "Kelionė su gyvūnu",               slug: "care/kelione",              description: "Dokumentai, transportas ir kaip paruošti gyvūną" },
      { emoji: "🎆", title: "Fejerverkai ir triukšmas",         slug: "care/fejerverkai",          description: "Kaip apsaugoti Naujaisiais metais ir liepos 6-ąją" },
    ],
  },
];

const stats = [
  { number: "50+", label: "Temų kategorijų" },
  { number: "500+", label: "Straipsnių ir vadovų" },
  { number: "150+", label: "Prieglaudų Lietuvoje" },
  { number: "300+", label: "Veterinarijų ir kirpyklų" },
];

const Medications: React.FC = () => {
  /* ─── Flatten hub into a single ItemList so Google + LLMs see every article. ── */
  const allArticles = hubSections.flatMap((section) =>
    section.subcategories.map((sub) => ({
      name: sub.title,
      path: `/${sub.slug}`,
      section: section.label,
      description: sub.description,
    }))
  );

  /* ─── CollectionPage schema: tells Google this is a curated topic hub. ─── */
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/vaistai#collection`,
    name: "Vaistai augintiniams ir gyvūnų sveikatos vadovai | PetLietuva",
    description:
      "Išsamus gyvūnų vaistų, sveikatos, mitybos, dresūros ir veterinarijos vadovų katalogas Lietuvoje – 50+ kategorijų, 500+ straipsnių.",
    inLanguage: "lt-LT",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: hubSections.map((s) => ({ "@type": "Thing", name: s.label, description: s.description })),
    hasPart: hubSections.map((section) => ({
      "@type": "CollectionPage",
      name: section.label,
      description: section.description,
      url: `${SITE_URL}/vaistai#${section.id}`,
    })),
  };

  return (
    <main className="pt-0 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Seo
        title="Vaistai augintiniams | Gyvūnų sveikatos, mitybos ir priežiūros vadovai | PetLietuva"
        description="Vaistai šunims ir katėms, sveikatos vadovai, mitybos rekomendacijos, dresūra ir veterinarija Lietuvoje. 500+ straipsnių apie augintinių priežiūrą – nuo blusų, erkių ir alergijų iki įvaikinimo ir skubios pagalbos."
        path="/vaistai"
        keywords="vaistai augintiniams, vaistai šunims, vaistai katėms, šunų sveikata, kačių sveikata, blusos ir erkės, alergijos gyvūnams, antibiotikai šunims, gyvūnų mityba, šunų dresūra, kastracija, sterilizacija, gyvūnų skiepai, augintinių priežiūra Lietuvoje, gyvūnų vadovai"
        jsonLd={[
          collectionPageSchema,
          breadcrumbSchema([
            { name: "Pradžia", path: "/" },
            { name: "Vaistai ir vadovai", path: "/vaistai" },
          ]),
          itemListSchema(
            "Gyvūnų sveikatos, vaistų ir priežiūros vadovai",
            allArticles.map(({ name, path }) => ({ name, path }))
          ),
        ]}
      />

      {/* ═════════ HERO ═════════ */}
      <section className="relative h-[620px] flex items-center justify-center text-center overflow-hidden">
        <img
          src={medicationsBanner}
          alt="Vaistai augintiniams ir gyvūnų sveikatos vadovai Lietuvoje – PetLietuva"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-purple-900/70" />

        <div className="relative z-10 max-w-5xl px-6 text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 text-sm font-semibold mb-8 shadow-lg">
            🐾 Nacionalinis Gyvūnų Žinių Centras
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Vaistai augintiniams ir gyvūnų sveikatos vadovai{" "}
            <span className="text-purple-300">Lietuvoje</span>
          </h1>

          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Patikimi, profesionalūs vadovai apie <strong>vaistus šunims ir katėms</strong>,{" "}
            <strong>mitybą</strong>, <strong>dresūrą</strong>, <strong>įvaikinimą</strong> ir{" "}
            <strong>veterinariją</strong>. 50+ temų kategorijų, 500+ straipsnių lietuvių kalba.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl py-4 px-3"
              >
                <div className="text-3xl font-bold text-purple-300">
                  {s.number}
                </div>
                <div className="text-xs opacity-80 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ PAIEŠKA ═════════ */}
      <section className="relative -mt-12 z-20" aria-label="Paieška vadovuose">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex items-center gap-4">
            <label htmlFor="med-search" className="sr-only">Ieškoti vaistų ir gyvūnų sveikatos vadovų</label>
            <input
              id="med-search"
              type="search"
              placeholder='Ieškokite: "erkė", "šuns dieta", "dresūra"...'
              className="w-full bg-transparent text-sm md:text-base focus:outline-none placeholder-gray-400"
            />
            <button className="ml-2 px-7 py-3 rounded-full bg-[#6d0ef1] text-white font-semibold text-sm hover:bg-[#5b0bd0] transition-colors flex-shrink-0">
              Ieškoti
            </button>
          </div>
        </div>
      </section>

      {/* ═════════ INTRO (LLM + Featured Snippet friendly) ═════════
          Short, factual summary at the top of the page so Google AI Overviews,
          ChatGPT, Perplexity etc. can quote a clean answer without scraping the
          whole hub. */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Kas yra PetLietuva vaistų ir sveikatos vadovai?
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          <strong>PetLietuva vaistų ir sveikatos vadovai</strong> – tai didžiausias lietuviškas
          gyvūnų priežiūros žinių centras. Čia rasite išsamius vadovus apie{" "}
          <Link to="/medications/fleas-ticks" className="text-purple-700 underline hover:text-purple-900">blusas ir erkes</Link>,{" "}
          <Link to="/medications/allergies-itching" className="text-purple-700 underline hover:text-purple-900">alergijas ir niežulį</Link>,{" "}
          <Link to="/medications/pain-arthritis" className="text-purple-700 underline hover:text-purple-900">skausmą ir artritą</Link>,{" "}
          <Link to="/health/skubus-atvejai" className="text-purple-700 underline hover:text-purple-900">skubią pagalbą</Link>,{" "}
          <Link to="/care/skiepai" className="text-purple-700 underline hover:text-purple-900">skiepus</Link> ir kasdienę
          augintinio priežiūrą Lietuvoje.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Vadovai parengti remiantis veterinarine literatūra ir pritaikyti Lietuvos
          rinkai – kainos eurais, vaistų pavadinimai vartojami Lietuvoje (Apoquel,
          Bravecto, NexGard, Cerenia, Rimadyl), bei{" "}
          <Link to="/veterinaras" className="text-purple-700 underline hover:text-purple-900">veterinarijos klinikų</Link>{" "}
          ir <Link to="/prieglaudos" className="text-purple-700 underline hover:text-purple-900">prieglaudų</Link>{" "}
          nuorodos visiems didžiausiems miestams – Vilniui, Kaunui, Klaipėdai, Šiauliams ir Panevėžiui.
        </p>
      </section>

      {/* ═════════ HUB ═════════ */}
      <div className="max-w-7xl mx-auto px-6 py-20">

        {hubSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mb-24 scroll-mt-24"
            aria-labelledby={`section-${section.id}`}
          >

            {/* SECTION HEADER */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-14 h-14 rounded-2xl ${section.bgClass} flex items-center justify-center text-2xl shadow-sm`}>
                  {section.emoji}
                </div>

                <div>
                  <h2
                    id={`section-${section.id}`}
                    className={`text-3xl font-bold ${section.colorClass}`}
                  >
                    {section.label}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1 max-w-xl">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="h-[2px] w-16 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>

            {/* CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {section.subcategories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/${cat.slug}`}
                  className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                  <div className="relative z-10">

                    {/* Icon */}
                    <div className="flex items-center gap-4 mb-4">
                      {cat.image ? (
                        <div className={`w-14 h-14 rounded-xl ${section.bgClass} flex items-center justify-center shadow-sm`}>
                          <img
                            src={cat.image}
                            alt={cat.title}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                      ) : (
                        <div className={`w-14 h-14 rounded-xl ${section.bgClass} flex items-center justify-center text-2xl shadow-sm`}>
                          {cat.emoji}
                        </div>
                      )}

                      <h3 className="text-base font-semibold text-gray-900 leading-snug group-hover:text-purple-700 transition">
                        {cat.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-500 leading-relaxed flex-1">
                      {cat.description}
                    </p>

                    <div className="mt-6 text-sm font-semibold text-purple-600 opacity-0 group-hover:opacity-100 transition">
                      Skaityti daugiau →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>


      {/* ═══ DONACIJA ═══ */}
      <Donation
        image={donationPetImage}
        title="Padėkite Keisti Gyvūnų Gyvenimą"
        text="Jūsų auka padeda prieglaudų gyvūnams gauti veterinarinę pagalbą, maistą ir šiltą vietą laukiant šeimos."
        cta="Paaukoti Dabar"
      />
    </main>
  );
};

export default Medications;