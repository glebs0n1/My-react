import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Clock, BookOpen, Share2, ArrowUp } from "lucide-react";

import { getArticle, articleRegistry } from "../../../data/articles";

const SITE_URL = "https://petlietuva.lt";

const CategoryPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const slugPath = location.pathname.replace(/^\/+|\/+$/g, "");
  const page = getArticle(slugPath);
  const canonicalUrl = `${SITE_URL}/${slugPath}`;

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slugPath]);

  if (!page) {
    return (
      <>
        <Helmet>
          <title>Turinys ruošiamas | PetLietuva</title>
          <meta name="robots" content="noindex,follow" />
        </Helmet>
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32">
          <div className="text-7xl mb-4 animate-bounce">🐾</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Turinys dar kuriamas
          </h1>
          <p className="text-gray-500 mb-6 max-w-md">
            Šis straipsnis ({slugPath}) šiuo metu ruošiamas. Grįžkite greitai!
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
            >
              ← Grįžti atgal
            </button>
            <Link
              to="/medications"
              className="px-5 py-2.5 border-2 border-purple-600 text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition"
            >
              Visos kategorijos
            </Link>
          </div>
        </div>
      </>
    );
  }

  const faqSchema = page.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.metaDescription,
    keywords: page.keywords.join(", "),
    dateModified: page.lastUpdated,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    inLanguage: "lt-LT",
  };

  const ogImage = page.ogImage ?? `${SITE_URL}/og-default.jpg`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <html lang="lt" />
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta name="keywords" content={page.keywords.join(", ")} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index,follow" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content="lt_LT" />
        <meta property="og:site_name" content="PetLietuva" />
        <meta property="article:modified_time" content={page.lastUpdated} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.metaTitle} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
        style={{ paddingTop: "5rem" }}
      >
        <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-fuchsia-700 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative max-w-4xl mx-auto px-6 py-16">
            <nav className="flex items-center gap-2 text-sm text-white/80 mb-8">
              <Link to="/" className="hover:text-white transition">
                Pagrindinis
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/medications" className="hover:text-white transition">
                Vadovai
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{page.title}</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight animate-fade-in">
              {page.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90 mb-6">
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {page.readTime} skaitymas
              </span>
              <span className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Atnaujinta: {page.lastUpdated}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {page.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-medium"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="relative bg-gradient-to-br from-purple-50 to-fuchsia-50 border-2 border-purple-200 rounded-2xl p-8 mb-12 shadow-sm animate-fade-in">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-600 to-fuchsia-600 rounded-l-2xl" />
            <p className="text-gray-800 text-lg leading-relaxed pl-4">
              {page.intro}
            </p>
          </div>

          {page.sections.length > 3 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-12 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                📋 Turinys
              </h2>
              <nav className="space-y-2">
                {page.sections.map((section, idx) => (
                  <a
                    key={idx}
                    href={`#section-${idx}`}
                    className="block text-gray-700 hover:text-purple-600 hover:translate-x-1 transition-all duration-200 text-sm"
                  >
                    {idx + 1}. {section.heading}
                  </a>
                ))}
              </nav>
            </div>
          )}

          <article className="space-y-12">
            {page.sections.map((section, idx) => (
              <section
                key={idx}
                id={`section-${idx}`}
                className="scroll-mt-24 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative mb-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white rounded-xl flex items-center justify-center font-bold shadow-lg">
                      {idx + 1}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                      {section.heading}
                    </h2>
                  </div>
                  <div className="mt-4 h-1 w-16 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full" />
                </div>

                <div
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: section.body
                      .replace(
                        /\*\*(.*?)\*\*/g,
                        "<strong class='font-bold text-gray-900'>$1</strong>"
                      )
                      .replace(/^- (.+)$/gm, "<li class='ml-4'>$1</li>")
                      .replace(/^\d+\. (.+)$/gm, "<li class='ml-4'>$1</li>")
                      .replace(
                        /(<li>.*<\/li>\n?)+/g,
                        (m) =>
                          `<ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">${m}</ul>`
                      )
                      .split(/\n\n+/)
                      .map((p) =>
                        p.startsWith("<ul") || p.startsWith("<strong")
                          ? p
                          : `<p class="mb-4 text-lg leading-relaxed">${p.replace(
                              /\n/g,
                              "<br/>"
                            )}</p>`
                      )
                      .join(""),
                  }}
                />

                {idx < page.sections.length - 1 && (
                  <div className="mt-12 border-t border-gray-200" />
                )}
              </section>
            ))}
          </article>

          {page.faq.length > 0 && (
            <section className="mt-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  ❓ Dažnai Užduodami Klausimai
                </h2>
                <p className="text-gray-600">
                  Raskite atsakymus į populiariausius klausimus
                </p>
              </div>

              <div className="space-y-4">
                {page.faq.map((item, idx) => (
                  <details
                    key={idx}
                    className="group bg-white border-2 border-gray-200 rounded-2xl shadow-sm hover:border-purple-300 hover:shadow-md transition-all duration-300"
                  >
                    <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-semibold text-gray-900 hover:text-purple-700 transition-colors list-none">
                      <span className="pr-4">{item.question}</span>
                      <span className="text-purple-600 group-open:rotate-180 transition-transform duration-300 text-2xl flex-shrink-0">
                        ⌄
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-700 leading-relaxed border-t border-gray-100 pt-5">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {page.relatedSlugs.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                📚 Susijusios Temos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {page.relatedSlugs.map((relSlug) => {
                  const related = articleRegistry[relSlug];
                  return (
                    <Link
                      key={relSlug}
                      to={`/${relSlug}`}
                      className="group p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                          📖
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                            {related?.title ?? relSlug}
                          </h3>
                          <span className="text-sm text-gray-500 group-hover:text-purple-600 transition-colors">
                            Skaityti straipsnį →
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          <div className="mt-16 relative bg-gradient-to-br from-purple-600 via-purple-700 to-fuchsia-700 rounded-3xl p-8 md:p-12 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative text-center">
              <h3 className="text-3xl font-bold mb-3">
                Reikia Veterinarinės Konsultacijos?
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Visada pasitarkite su licencijuotu veterinaru prieš pradedant
                bet kokį gydymą. Mūsų portale rasite patikimus specialistus
                visoje Lietuvoje.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/veterinarian"
                  className="px-8 py-4 bg-white text-purple-700 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  🔍 Rasti Veterinarą
                </Link>
                <Link
                  to="/medications"
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all"
                >
                  ← Visos Kategorijos
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-sm">
                Ar šis straipsnis buvo naudingas? Pasidalinkite su draugais! 🐾
              </p>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:border-purple-400 hover:text-purple-700 transition-all">
                <Share2 className="w-4 h-4" />
                Dalintis
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .prose strong { font-weight: 700; color: #111827; }
        .prose ul li { margin: 0.5rem 0; }
        details[open] summary {
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 1.25rem;
          margin-bottom: 0;
        }
      `}</style>
    </>
  );
};

export default CategoryPage;
