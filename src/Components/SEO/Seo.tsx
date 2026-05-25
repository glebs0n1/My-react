import React from "react";
import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://petlietuva.lt";
export const SITE_NAME = "PetLietuva";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export interface SeoProps {
  title: string;
  description: string;
  /** Path part only, e.g. "/veterinaras". Will be combined with SITE_URL. */
  path?: string;
  /** Comma-separated keywords (Lithuanian-first for local SEO). */
  keywords?: string;
  /** Absolute or path-relative OG/Twitter image. */
  image?: string;
  ogType?: "website" | "article" | "profile";
  /** Pre-stringified JSON-LD blobs (use helpers from ./schemas). */
  jsonLd?: (string | object)[];
  /** Set to false for staging/preview to keep page out of the index. */
  noindex?: boolean;
  /** ISO 8601 publish date, only used when ogType="article". */
  publishedAt?: string;
  /** ISO 8601 last-modified date. */
  modifiedAt?: string;
  /** Locale code, defaults to Lithuanian. */
  locale?: string;
  /** hreflang alternates: array of { hrefLang, href } */
  alternates?: { hrefLang: string; href: string }[];
}

/**
 * Single source of truth for per-page metadata: title, description, canonical,
 * OG/Twitter, robots, hreflang, and JSON-LD structured data.
 *
 * Why: keeps SEO consistent across pages and avoids each page duplicating ~50
 * lines of <Helmet> boilerplate. JSON-LD is rendered as <script type="application/ld+json">.
 */
const Seo: React.FC<SeoProps> = ({
  title,
  description,
  path = "/",
  keywords,
  image = DEFAULT_OG_IMAGE,
  ogType = "website",
  jsonLd = [],
  noindex = false,
  publishedAt,
  modifiedAt,
  locale = "lt_LT",
  alternates,
}) => {
  const canonical = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const robots = noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1";

  return (
    <Helmet prioritizeSeoTags>
      {/* Primary */}
      <html lang={locale.split("_")[0]} />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="author" content={SITE_NAME} />
      <meta name="language" content="Lithuanian" />
      <meta name="geo.region" content="LT" />
      <meta name="geo.placename" content="Lithuania" />
      <link rel="canonical" href={canonical} />

      {/* hreflang alternates */}
      {alternates?.map((a) => (
        <link key={a.hrefLang} rel="alternate" hrefLang={a.hrefLang} href={a.href} />
      ))}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {modifiedAt && <meta property="article:modified_time" content={modifiedAt} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* Mobile */}
      <meta name="theme-color" content="#6d0ef1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="format-detection" content="telephone=no" />

      {/* JSON-LD structured data */}
      {jsonLd.map((blob, i) => (
        <script key={i} type="application/ld+json">
          {typeof blob === "string" ? blob : JSON.stringify(blob)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
