export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContentSection {
  heading: string;
  body: string;
}

export interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
  lastUpdated: string;
  readTime: string;
  intro: string;
  sections: ContentSection[];
  faq: FAQItem[];
  relatedSlugs: string[];
}
