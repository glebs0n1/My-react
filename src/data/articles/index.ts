import { Article } from "./types";
import skubusAtvejai from "./skubus-atvejai";
import allergiesItching from "./allergies-itching";
import anxietySedation from "./anxiety-sedation";

const articles: Article[] = [skubusAtvejai, allergiesItching, anxietySedation];

export const articleRegistry: Record<string, Article> = articles.reduce(
  (acc, article) => {
    acc[article.slug] = article;
    return acc;
  },
  {} as Record<string, Article>
);

export const allArticleSlugs: string[] = articles.map((a) => a.slug);

export const getArticle = (slug: string): Article | undefined =>
  articleRegistry[slug];

export type { Article } from "./types";
