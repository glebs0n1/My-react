export const normalizeText = (value: string = ""): string =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export const extractSlug = (link?: string): string =>
  link
    ?.split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/\.html$/, "") || "";

export const safeArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter(Boolean) : [];

export const cleanImageUrl = (url?: string): string =>
  url?.replace(/^url\((['"]?)(.*?)\1\)$/, "$2").trim() ||
  "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993";