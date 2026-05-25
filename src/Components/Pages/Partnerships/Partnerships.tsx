import React, { useState } from "react";
import { CSSProperties } from "react";

const partnerTypes = [
  {
    id: "banner",
    icon: "📢",
    title: "Reklamos Plotas",
    subtitle: "Banner & Display Reklama",
    color: "#E8A87C",
    description:
      "Pasiekite tūkstančius gyvūnų mylėtojų kasdien. Jūsų reklama rodoma tikslinei auditorijai — žmonėms, kurie aktyviai ieško gyvūnų paslaugų.",
    benefits: [
      "Virš 10 000 unikalių lankytojų per mėnesį",
      "Reklama rodoma pagal kategoriją (prieglaudos, veterinarija, kirpyklos)",
      "Mobile-friendly formatai",
      "Detalios statistikos ataskaitos",
    ],
    cta: "Gauti kainų pasiūlymą",
    badge: "Populiaru",
  },
  {
    id: "article",
    icon: "✍️",
    title: "Straipsniai & PR",
    subtitle: "Turinys & Istorijos",
    color: "#7BAE7F",
    description:
      "Papasakokite savo istoriją mūsų bendruomenei. Rašykite apie savo paslaugas, dalininkitės patarimais ar pristatykite sėkmės istorijas iš prieglaudų.",
    benefits: [
      "Redakcinis turinys su jūsų logotipu",
      "Straipsnis rodomas paieškoje ir kategorijose",
      "Socialinių tinklų platinimas",
      "Ilgalaikis SEO poveikis",
    ],
    cta: "Siųsti straipsnio idėją",
    badge: "SEO Boost",
  },
  {
    id: "seo",
    icon: "🔗",
    title: "SEO Nuorodos",
    subtitle: "Guest Post & Backlinks",
    color: "#6B9FD4",
    description:
      "Stiprinkite savo svetainės pozicijas Google paieškoje. Kokybiška nuoroda iš mūsų portalo padės jūsų domenui augti organiška paieška.",
    benefits: [
      "DoFollow nuorodos iš DA40+ domeno",
      "Tematinis kontekstas — gyvūnų industrija",
      "Ilgalaikis straipsnis be galiojimo datos",
      "Galimybė atnaujinti turinį",
    ],
    cta: "Aptarti bendradarbiavimą",
    badge: "Link Building",
  },
  {
    id: "deals",
    icon: "🎁",
    title: "Pasiūlymai & Nuolaidos",
    subtitle: "Specialios Akcijos Lankytojams",
    color: "#C97BB2",
    description:
      "Pritraukite naujų klientų siūlydami išskirtines nuolaidas mūsų bendruomenei. Gyvūnų savininkai visada ieško gerų pasiūlymų patikimiems tiekėjams.",
    benefits: [
      "Jūsų pasiūlymas specialiame 'Nuolaidų' skyriuje",
      "Kuponų sistema su sekimu",
      "Sezono akcijų galimybė",
      "Tiesioginė nuoroda į jūsų svetainę",
    ],
    cta: "Sukurti pasiūlymą",
    badge: "Konversijos",
  },
];

const stats = [
  { number: "10K+", label: "Mėnesinių lankytojų" },
  { number: "150+", label: "Gyvūnų prieglaudų" },
  { number: "300+", label: "Veterinarijų & Kirpyklų" },
  { number: "98%", label: "Partnerių pasitenkinimas" },
];

const faqs = [
  {
    q: "Kiek kainuoja bendradarbiavimas?",
    a: "Kaina priklauso nuo pasirinkto partnerystės tipo ir trukmės. Susisiekite su mumis ir paruošime individualų pasiūlymą.",
  },
  {
    q: "Kaip greitai bus matoma mano reklama?",
    a: "Po sutarties pasirašymo ir medžiagos gavimo — per 24-48 valandas.",
  },
  {
    q: "Ar galima derinti kelis partnerystės tipus?",
    a: "Taip! Dažnai siūlome paketus, kurie apima kelis tipus su papildoma nuolaida.",
  },
  {
    q: "Ar galima stebėti reklamos rezultatus?",
    a: "Taip, visi partneriai gauna prieigą prie statistikos skydelio su paspaudimais, peržiūromis ir konversijomis.",
  },
];

export default function PartnershipsPage() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    type: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={styles.page}>
      {/* Background texture */}
      <div style={styles.bgTexture} />

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <span>🐾</span> Tapkite Partneriu
          </div>
          <h1 style={styles.heroTitle}>
            Auginkite savo verslą
            <span style={styles.heroAccent}> kartu su gyvūnais</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Mūsų portalas jungia prieglaudas, veterinarijas, kirpyklas ir
            gyvūnų savininkus vienoje vietoje. Prisijunkite ir pasiekite
            tūkstančius tikslinių klientų kiekvieną dieną.
          </p>
          <div style={styles.heroStats}>
            {stats.map((s, i) => (
              <div key={i} style={styles.statItem}>
                <span style={styles.statNumber}>{s.number}</span>
                <span style={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        
      </section>

      {/* Partner Types */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Partnerystės Galimybės</h2>
          <p style={styles.sectionSubtitle}>
            Pasirinkite tai, kas labiausiai tinka jūsų verslui
          </p>

          <div style={styles.cardsGrid}>
            {partnerTypes.map((p) => (
              <div
                key={p.id}
                style={{
                  ...styles.card,
                  ...(activeCard === p.id ? styles.cardActive : {}),
                  borderColor:
                    activeCard === p.id ? p.color : "rgba(0,0,0,0.06)",
                }}
                onMouseEnter={() => setActiveCard(p.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div
                  style={{
                    ...styles.cardAccentBar,
                    backgroundColor: p.color,
                  }}
                />
                <div style={styles.cardHeader}>
                  <span style={styles.cardIcon}>{p.icon}</span>
                  <span
                    style={{
                      ...styles.cardBadge,
                      backgroundColor: p.color + "22",
                      color: p.color,
                    }}
                  >
                    {p.badge}
                  </span>
                </div>
                <h3 style={styles.cardTitle}>{p.title}</h3>
                <p style={styles.cardSubtitle}>{p.subtitle}</p>
                <p style={styles.cardDesc}>{p.description}</p>
                <ul style={styles.benefitsList}>
                  {p.benefits.map((b, i) => (
                    <li key={i} style={styles.benefitItem}>
                      <span style={{ color: p.color, marginRight: 8 }}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <button
                  style={{
                    ...styles.cardBtn,
                    backgroundColor: p.color,
                  }}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, type: p.title }));
                    document
                      .getElementById("contact-form")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {p.cta} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section style={styles.whySection}>
        <div style={styles.container}>
          <div style={styles.whyGrid}>
            <div style={styles.whyLeft}>
              <h2 style={styles.whyTitle}>
                Kodėl verta{" "}
                <span style={{ color: "#E8A87C" }}>bendradarbiauti</span>{" "}
                su mumis?
              </h2>
              <p style={styles.whyText}>
                Mūsų portalas — tai vienintelė platforma Lietuvoje, kuri
                sujungia visą gyvūnų ekosistemą vienoje vietoje. Lankytojai
                pas mus ateina jau su aiškiu tikslu — jie ieško paslaugų,
                patikimos informacijos ir gerų pasiūlymų.
              </p>
              <p style={styles.whyText}>
                Tai reiškia, kad jūsų reklama pasiekia žmones tada, kai jie
                priima sprendimą — o tai duoda kelis kartus geresnius
                rezultatus nei bendra reklama.
              </p>
              <div style={styles.whyFeatures}>
                {[
                  { icon: "🎯", text: "Tikslinė auditorija" },
                  { icon: "📊", text: "Skaidri statistika" },
                  { icon: "🤝", text: "Personalus aptarnavimas" },
                  { icon: "💡", text: "Kūrybinės idėjos" },
                ].map((f, i) => (
                  <div key={i} style={styles.whyFeature}>
                    <span style={styles.whyFeatureIcon}>{f.icon}</span>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.whyRight}>
              <div style={styles.whyCard}>
                <div style={styles.quoteIcon}>"</div>
                <p style={styles.quoteText}>
                  Mūsų veterinarijos klinika per pirmą mėnesį gavo 40 naujų
                  klientų tiesiai iš portalo. Investicija atsipirko per dvi
                  savaites.
                </p>
                <div style={styles.quoteAuthor}>
                  <div style={styles.quoteAvatar}>🐕‍🦺</div>
                  <div>
                    <strong>Dr. Jonas Petraitis</strong>
                    <br />
                    <span style={{ color: "#999", fontSize: 13 }}>
                      Vilniaus Veterinarijos Klinika
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" style={styles.formSection}>
        <div style={{ ...styles.container, maxWidth: 680 }}>
          <h2 style={styles.sectionTitle}>Pradėkime Bendradarbiavimą</h2>
          <p style={styles.sectionSubtitle}>
            Užpildykite formą ir susisieksime per 24 valandas su individualiu
            pasiūlymu
          </p>

          {submitted ? (
            <div style={styles.successBox}>
              <div style={styles.successIcon}>🎉</div>
              <h3 style={{ margin: "0 0 8px", color: "#2d4a2d" }}>
                Puiku! Gavome jūsų užklausą.
              </h3>
              <p style={{ margin: 0, color: "#5a7a5a" }}>
                Susisieksime per 24 valandas. Ačiū už susidomėjimą!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Vardas *</label>
                  <input
                    required
                    style={styles.input}
                    placeholder="Jūsų vardas"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>El. paštas *</label>
                  <input
                    required
                    type="email"
                    style={styles.input}
                    placeholder="jusu@emailas.lt"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Įmonė / Verslas</label>
                  <input
                    style={styles.input}
                    placeholder="Jūsų įmonės pavadinimas"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, company: e.target.value }))
                    }
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Partnerystės tipas *</label>
                  <select
                    required
                    style={styles.select}
                    value={formData.type}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, type: e.target.value }))
                    }
                  >
                    <option value="">Pasirinkite...</option>
                    {partnerTypes.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.icon} {p.title}
                      </option>
                    ))}
                    <option value="Derinys">🔀 Kelių tipų derinys</option>
                  </select>
                </div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Žinutė / Papildoma informacija</label>
                <textarea
                  style={styles.textarea}
                  rows={4}
                  placeholder="Papasakokite apie savo verslą, tikslus ar klausimus..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                />
              </div>
              <button type="submit" style={styles.submitBtn}>
                Siųsti Užklausą 🐾
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section style={styles.section}>
        <div style={{ ...styles.container, maxWidth: 720 }}>
          <h2 style={styles.sectionTitle}>Dažni Klausimai</h2>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                ...styles.faqItem,
                ...(openFaq === i ? styles.faqItemOpen : {}),
              }}
            >
              <button
                style={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{faq.q}</span>
                <span style={styles.faqChevron}>
                  {openFaq === i ? "▲" : "▼"}
                </span>
              </button>
              {openFaq === i && <p style={styles.faqAnswer}>{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        @keyframes floatPaw {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}

// Typed style object to satisfy TypeScript's CSSProperties
const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#faf8f5",
    fontFamily: "'DM Sans', sans-serif",
    color: "#2c2c2c",
    position: "relative",
    overflow: "hidden",
  },
  bgTexture: {
    position: "fixed",
    inset: 0,
    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(232,168,124,0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(123,174,127,0.08) 0%, transparent 50%),
      radial-gradient(circle at 50% 80%, rgba(107,159,212,0.06) 0%, transparent 50%)`,
    pointerEvents: "none",
    zIndex: 0,
  },
  hero: {
    position: "relative",
    padding: "100px 24px 80px",
    textAlign: "center",
    zIndex: 1,
    overflow: "hidden",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 800,
    margin: "0 auto",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    border: "1.5px solid rgba(232,168,124,0.4)",
    borderRadius: 100,
    padding: "8px 20px",
    fontSize: 14,
    fontWeight: 600,
    color: "#c47a3a",
    marginBottom: 28,
    boxShadow: "0 2px 12px rgba(232,168,124,0.15)",
  },
  heroTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
    fontWeight: 700,
    lineHeight: 1.15,
    margin: "0 0 20px",
    color: "#1a1a1a",
  },
  heroAccent: { color: "#E8A87C" },
  heroSubtitle: {
    fontSize: "clamp(1rem, 2vw, 1.2rem)",
    color: "#666",
    lineHeight: 1.7,
    maxWidth: 600,
    margin: "0 auto 48px",
  },
  heroStats: {
    display: "flex",
    justifyContent: "center",
    gap: "clamp(24px, 4vw, 60px)",
    flexWrap: "wrap",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  statNumber: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
    fontWeight: 700,
    color: "#2c2c2c",
  },
  statLabel: { fontSize: 13, color: "#888", fontWeight: 500 },
  heroPaws: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 1,
  },
  floatingPaw: {
    position: "absolute",
    animation: "floatPaw 4s ease-in-out infinite",
    userSelect: "none",
  },
  section: {
    position: "relative",
    zIndex: 1,
    padding: "80px 24px",
  },
  container: { maxWidth: 1140, margin: "0 auto" },
  sectionTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
    fontWeight: 700,
    textAlign: "center",
    margin: "0 0 12px",
    color: "#1a1a1a",
  },
  sectionSubtitle: {
    textAlign: "center",
    color: "#777",
    fontSize: 17,
    marginBottom: 52,
    lineHeight: 1.6,
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 28,
    border: "1.5px solid rgba(0,0,0,0.06)",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
    cursor: "default",
    boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
  },
  cardActive: {
    transform: "translateY(-4px)",
    boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
  },
  cardAccentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    borderRadius: "20px 20px 0 0",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 4,
  },
  cardIcon: { fontSize: 32 },
  cardBadge: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    padding: "4px 10px",
    borderRadius: 100,
  },
  cardTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: 22,
    fontWeight: 700,
    margin: "0 0 4px",
    color: "#1a1a1a",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#aaa",
    margin: "0 0 16px",
    fontWeight: 500,
  },
  cardDesc: {
    fontSize: 14.5,
    color: "#666",
    lineHeight: 1.65,
    margin: "0 0 20px",
  },
  benefitsList: { listStyle: "none", padding: 0, margin: "0 0 24px" },
  benefitItem: {
    fontSize: 13.5,
    color: "#555",
    padding: "5px 0",
    display: "flex",
    alignItems: "flex-start",
    lineHeight: 1.5,
  },
  cardBtn: {
    display: "inline-block",
    padding: "12px 22px",
    borderRadius: 12,
    border: "none",
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    width: "100%",
    transition: "opacity 0.2s, transform 0.2s",
    fontFamily: "'DM Sans', sans-serif",
  },
  whySection: {
    backgroundColor: "#fff",
    padding: "80px 24px",
    position: "relative",
    zIndex: 1,
  },
  whyGrid: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 64,
    alignItems: "center",
  },
  whyLeft: {},
  whyTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
    fontWeight: 700,
    lineHeight: 1.2,
    margin: "0 0 20px",
    color: "#1a1a1a",
  },
  whyText: {
    color: "#666",
    lineHeight: 1.75,
    fontSize: 16,
    margin: "0 0 16px",
  },
  whyFeatures: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 28,
  },
  whyFeature: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#faf8f5",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: 100,
    padding: "10px 18px",
    fontSize: 14,
    fontWeight: 500,
    color: "#444",
  },
  whyFeatureIcon: { fontSize: 18 },
  whyRight: {},
  whyCard: {
    backgroundColor: "#faf8f5",
    borderRadius: 20,
    padding: 36,
    border: "1.5px solid rgba(0,0,0,0.06)",
  },
  quoteIcon: {
    fontFamily: "'Fraunces', serif",
    fontSize: 72,
    color: "#E8A87C",
    lineHeight: 0.8,
    marginBottom: 12,
    display: "block",
    opacity: 0.6,
  },
  quoteText: {
    fontSize: 16,
    color: "#444",
    lineHeight: 1.75,
    margin: "0 0 24px",
    fontStyle: "italic",
  },
  quoteAuthor: { display: "flex", alignItems: "center", gap: 14 },
  quoteAvatar: { fontSize: 36 },
  formSection: {
    position: "relative",
    zIndex: 1,
    padding: "80px 24px",
    backgroundColor: "#fdf9f6",
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: "40px",
    border: "1.5px solid rgba(0,0,0,0.06)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.05)",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
    marginBottom: 20,
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 0,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#555",
    marginBottom: 8,
    letterSpacing: "0.3px",
  },
  input: {
    padding: "13px 16px",
    borderRadius: 12,
    border: "1.5px solid rgba(0,0,0,0.1)",
    fontSize: 15,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
    backgroundColor: "#faf8f5",
    color: "#2c2c2c",
  },
  select: {
    padding: "13px 16px",
    borderRadius: 12,
    border: "1.5px solid rgba(0,0,0,0.1)",
    fontSize: 15,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    backgroundColor: "#faf8f5",
    color: "#2c2c2c",
    cursor: "pointer",
  },
  textarea: {
    padding: "13px 16px",
    borderRadius: 12,
    border: "1.5px solid rgba(0,0,0,0.1)",
    fontSize: 15,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    width: "100%",
    resize: "vertical",
    backgroundColor: "#faf8f5",
    color: "#2c2c2c",
    marginTop: 0,
    marginBottom: 24,
  },
  submitBtn: {
    width: "100%",
    padding: "16px 24px",
    backgroundColor: "#E8A87C",
    color: "#fff",
    border: "none",
    borderRadius: 14,
    fontSize: 17,
    fontWeight: 700,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    letterSpacing: "0.3px",
    transition: "opacity 0.2s, transform 0.2s",
  },
  successBox: {
    backgroundColor: "#f0faf0",
    border: "1.5px solid rgba(123,174,127,0.3)",
    borderRadius: 20,
    padding: "48px 36px",
    textAlign: "center",
  },
  successIcon: { fontSize: 52, marginBottom: 16 },
  faqItem: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 12,
    border: "1.5px solid rgba(0,0,0,0.06)",
    overflow: "hidden",
    transition: "all 0.2s",
  },
  faqItemOpen: {
    border: "1.5px solid rgba(232,168,124,0.3)",
  },
  faqQuestion: {
    width: "100%",
    padding: "20px 24px",
    backgroundColor: "transparent",
    border: "none",
    textAlign: "left",
    fontSize: 16,
    fontWeight: 600,
    color: "#2c2c2c",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "'DM Sans', sans-serif",
    gap: 12,
  },
  faqChevron: { color: "#E8A87C", fontSize: 12, flexShrink: 0 },
  faqAnswer: {
    padding: "0 24px 20px",
    color: "#666",
    lineHeight: 1.7,
    fontSize: 15,
    margin: 0,
  },
};