/**
 * Schema.org JSON-LD builders for PetLietuva.
 *
 * Each helper returns a plain object — pass them in the `jsonLd` prop of <Seo />
 * and the component will JSON.stringify them.
 *
 * Why these specific types:
 *  - Organization / WebSite — global site identity, eligible for sitelinks search box.
 *  - LocalBusiness / VeterinaryCare / AnimalShelter — improves local-pack ranking for
 *    Lithuanian city searches (e.g. "veterinaras Vilniuje").
 *  - FAQPage — enables rich FAQ snippets in Google search.
 *  - BreadcrumbList — shows breadcrumb trail under search result.
 *  - Service / ItemList — surfaces aggregator pages (grooming, training).
 */

export const SITE_URL = "https://petlietuva.lt";
export const SITE_NAME = "PetLietuva";
const LOGO = `${SITE_URL}/logo512.png`;

const SOCIAL = [
  "https://www.facebook.com/petlietuva",
  "https://www.instagram.com/petlietuva",
];

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Pet Lietuva",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: LOGO,
    width: 512,
    height: 512,
  },
  description:
    "PetLietuva – didžiausia Lietuvos gyvūnų bendruomenės platforma: prieglaudos, veterinarai, dresūra, kirpyklos, pamestų augintinių paieška ir įvaikinimas.",
  areaServed: {
    "@type": "Country",
    name: "Lithuania",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "LT",
    addressLocality: "Vilnius",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@petlietuva.lt",
    contactType: "customer service",
    availableLanguage: ["Lithuanian", "English", "Russian"],
    areaServed: "LT",
  },
  sameAs: SOCIAL,
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description:
    "Lietuvos gyvūnų platforma: rask veterinarą, prieglaudą, dresuotoją ar kirpyklą savo mieste.",
  inLanguage: "lt-LT",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/shelter?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export const breadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: item.name,
    item: `${SITE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
  })),
});

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqPageSchema = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: q.answer,
    },
  })),
});

export const animalShelterSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AnimalShelter",
  "@id": `${SITE_URL}/prieglaudos#animal-shelter`,
  name: `${SITE_NAME} – Gyvūnų prieglaudų katalogas`,
  url: `${SITE_URL}/prieglaudos`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "Gyvūnų prieglaudų ir įvaikinimo katalogas visoje Lietuvoje: šunys, katės ir kiti gyvūnai laukia naujų namų.",
  areaServed: {
    "@type": "Country",
    name: "Lithuania",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "LT",
  },
  sameAs: SOCIAL,
});

export interface VetServiceSpec {
  name: string;
  url?: string;
  description?: string;
}

export const veterinaryCareSchema = (services?: VetServiceSpec[]) => ({
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  additionalType: "https://schema.org/VeterinaryCare",
  "@id": `${SITE_URL}/veterinaras#veterinary-care`,
  name: `${SITE_NAME} – Veterinarijos klinikų katalogas`,
  url: `${SITE_URL}/veterinaras`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "Patikrintos veterinarijos klinikos Lietuvoje: konsultacijos, skiepai, chirurgija, skubi pagalba ir profilaktinė priežiūra.",
  areaServed: { "@type": "Country", name: "Lithuania" },
  medicalSpecialty: "Veterinary",
  hasOfferCatalog: services && services.length > 0 ? {
    "@type": "OfferCatalog",
    name: "Veterinarijos paslaugos",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "MedicalProcedure",
        name: s.name,
        url: s.url,
        description: s.description,
      },
    })),
  } : undefined,
});

export interface ServiceSpec {
  name: string;
  description: string;
  path: string;
  area?: string;
}

export const serviceSchema = (s: ServiceSpec) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.name,
  description: s.description,
  url: `${SITE_URL}${s.path}`,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: {
    "@type": "Country",
    name: s.area || "Lithuania",
  },
});

export interface ListItemSpec {
  name: string;
  path: string;
}

export const itemListSchema = (name: string, items: ListItemSpec[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  numberOfItems: items.length,
  itemListElement: items.map((item, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: item.name,
    url: `${SITE_URL}${item.path}`,
  })),
});

export interface JobPostingSpec {
  title: string;
  description: string;
  datePosted: string;
  validThrough?: string;
  /** "VOLUNTEER" maps to schema.org volunteer roles via employmentType. */
  employmentType?: "VOLUNTEER" | "PART_TIME" | "FULL_TIME";
  location?: string;
  remote?: boolean;
}

export const volunteerJobSchema = (job: JobPostingSpec) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: job.title,
  description: job.description,
  datePosted: job.datePosted,
  validThrough: job.validThrough,
  employmentType: job.employmentType || "VOLUNTEER",
  hiringOrganization: { "@id": `${SITE_URL}/#organization` },
  jobLocationType: job.remote ? "TELECOMMUTE" : undefined,
  applicantLocationRequirements: {
    "@type": "Country",
    name: "Lithuania",
  },
  jobLocation: job.remote
    ? undefined
    : {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressCountry: "LT",
          addressLocality: job.location || "Vilnius",
        },
      },
  baseSalary: {
    "@type": "MonetaryAmount",
    currency: "EUR",
    value: { "@type": "QuantitativeValue", value: 0, unitText: "VOLUNTEER" },
  },
});
