import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Seo,
  breadcrumbSchema,
  volunteerJobSchema,
} from "../../SEO";

interface VolunteerOpportunity {
  id: number;
  icon: string;
  title: string;
  description: string;
  time: string;
  remote: boolean;
  skills: string[];
  fullDescription?: string;
  responsibilities?: string[];
  requirements?: string[];
  whatYouGain?: string[];
}

const Careers: React.FC = () => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<VolunteerOpportunity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openModal = (opportunity: VolunteerOpportunity) => {
    setSelectedOpportunity(opportunity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedOpportunity(null), 300);
  };

  const volunteerOpportunities: VolunteerOpportunity[] = [
    {
      id: 1,
      icon: "📝",
      title: "Prieglaudos informacijos pildymas",
      description: "Padėk prieglaudoms sukurti ir atnaujinti jų profilius platformoje. Pridėk kontaktinius duomenis, darbo laiką, paslaugų aprašymus.",
      time: "2-3 val/savaitę",
      remote: true,
      skills: ["Dėmesys detalėms", "Lietuvių kalba", "Kompiuterinis raštingumas"],
      fullDescription: "Prieglaudos informacijos pildymas yra viena svarbiausių savanoriškos veiklos sričių. Tu padėsi gyvūnų prieglaudoms sukurti profesionalius, informatyvius ir patrauklius profilius mūsų platformoje. Tai leidžia prieglaudoms pasiekti daugiau žmonių ir padeda augintiniams greičiau rasti namus.",
      responsibilities: [
        "Surinkti prieglaudų kontaktinę informaciją (telefonas, el. paštas, adresas)",
        "Užpildyti darbo laiką ir prieinamumo informaciją",
        "Parašyti trumpus, bet informatyvius prieglaudų aprašymus",
        "Pridėti nuotraukas (jei prieglaudos turi)",
        "Reguliariai atnaujinti informaciją pagal prieglaudų nurodymus",
      ],
      requirements: [
        "Geras lietuvių kalbos mokėjimas",
        "Dėmesys detalėms ir tikslumas",
        "Bazinis kompiuterinio raštingumo lygis",
        "Galimybė skirti 2-3 valandas per savaitę",
        "Patikimumas ir atsakingumas",
      ],
      whatYouGain: [
        "Patirtis dirbant su duomenų valdymo sistemomis",
        "Komunikacijos įgūdžių tobulinimas",
        "Galimybė dirbti nuotoliniu būdu",
        "Lankstus darbo grafikas",
        "Tiesioginis įnašas gelbstint gyvūnų gyvybes",
        "Rekomendacijos jūsų CV",
      ],
    },
    {
      id: 2,
      icon: "📸",
      title: "Nuotraukų tvarkymas",
      description: "Fotografuok augintinių nuotraukas prieglaudose arba redaguok ir tvarkyk esamas. Padėk kiekvienam augintiniui atsidurti geriausią šviesą.",
      time: "Lankstus",
      remote: false,
      skills: ["Fotografavimas", "Foto redagavimas", "Kūrybiškumas"],
      fullDescription: "Geros nuotraukos gali pakeisti visko! Statistika rodo, kad augintiniai su profesionaliomis nuotraukomis randami 3x greičiau. Tu padėsi augintiniams atsidurti geriausią šviesą ir padidinti jų šansus rasti mylintį namą.",
      responsibilities: [
        "Fotografuoti augintinių nuotraukas prieglaudose",
        "Redaguoti ir optimizuoti nuotraukas (apšvietimas, kontrastas, spalvos)",
        "Sukurti patrauklias nuotraukų kompozicijas",
        "Tvarkyti ir organizuoti nuotraukų archyvą",
        "Mokyti prieglaudų darbuotojus fotografavimo pagrindų",
      ],
      requirements: [
        "Fotoaparatas arba geros kokybės smartphone",
        "Baziniai fotografavimo įgūdžiai",
        "Foto redagavimo programų mokėjimas (Lightroom, Photoshop, arba Canva)",
        "Kantrybė ir meilė gyvūnams",
        "Galimybė atvykti į prieglaudas",
      ],
      whatYouGain: [
        "Fotografavimo patirties tobulinimas",
        "Portfolio papildymas",
        "Laikas su gyvūnais",
        "Pamatysi tiesioginį savo darbo rezultatą",
        "Galimybė dirbti savo grafiku",
        "Networking su kitais fotografais",
      ],
    },
    {
      id: 3,
      icon: "💬",
      title: "Socialinių tinklų valdymas",
      description: "Valdyk prieglaudų Facebook, Instagram paskyras. Skelbk naujausius augintinių skelbimus, dalinkis istorijomis, bendrauk su bendruomene.",
      time: "5-7 val/savaitę",
      remote: true,
      skills: ["Social media", "Komunikacija", "Content kūrimas"],
      fullDescription: "Social media yra pagrindinis kanalas pritraukti įvaikinantieji ir surinkti aukas. Tu būsi prieglaudos balsas socialiniuose tinkluose, dalinantis augintinių istorijomis ir kuriančiu aktyvią bendruomenę.",
      responsibilities: [
        "Planuoti ir skelbti turinį Facebook ir Instagram",
        "Kurti įtraukiančius caption'us ir hashtag'us",
        "Atsakyti į komentarus ir žinutes",
        "Sekti engagement metrikas ir optimizuoti strategiją",
        "Kurti stories ir reels",
        "Organizuoti social media kampanijas",
      ],
      requirements: [
        "Aktyvus Facebook ir Instagram naudojimas",
        "Geras lietuvių kalbos mokėjimas",
        "Komunikacijos įgūdžiai",
        "Kūrybiškumas ir originalumas",
        "Reguliarumas ir patikimumas (postai 3-5x/savaitę)",
      ],
      whatYouGain: [
        "Social media marketing patirtis",
        "Community management įgūdžiai",
        "Portfolio case study",
        "Statistikos analizės patirtis",
        "Networking su kitais social media specialistais",
        "Galimybė matyti tiesioginį poveikį",
      ],
    },
    {
      id: 4,
      icon: "✍️",
      title: "Turinio kūrimas",
      description: "Rašyk įkvepiančias augintinių istorijas, sukurk įtraukiantį turinį, padėk paruošti aprašymus ir straipsnius.",
      time: "3-5 val/savaitę",
      remote: true,
      skills: ["Rašymas", "Lietuvių kalba", "Storytelling"],
      fullDescription: "Žodžiai turi galią. Tu padėsi papasakoti kiekvieno augintinio unikalią istoriją taip, kad žmonės panorės juos įsivaikinti. Rašysi įkvepiančius aprašymus, success stories ir informatyvius straipsnius.",
      responsibilities: [
        "Rašyti augintinių aprašymus ir pristatymus",
        "Kurti emocines ir įkvepiančias istorijas",
        "Paruošti blog straipsnius apie gyvūnų priežiūrą",
        "Rašyti email kampanijų tekstus",
        "Redaguoti ir koreguoti turinį",
        "Adaptuoti turinį skirtingoms platformoms",
      ],
      requirements: [
        "Puikus lietuvių kalbos mokėjimas",
        "Rašymo patirtis (blog, copywriting, arba kūrybinis rašymas)",
        "Gebėjimas papasakoti istoriją",
        "Empatija ir emocinis intelektas",
        "Galimybė skirti 3-5 valandas per savaitę",
      ],
      whatYouGain: [
        "Copywriting ir content writing patirtis",
        "Portfolio papildymas su realiais projektais",
        "Storytelling įgūdžių tobulinimas",
        "Patirtis dirbant su NGO",
        "Galimybė publikuoti tekstus po savo vardu",
        "Rekomendacijos",
      ],
    },
    {
      id: 5,
      icon: "🎨",
      title: "Dizaino darbai",
      description: "Sukurk plakatus, banner'ius, social media grafiką prieglaudų ir augintinių kampanijoms. Padėk sustiprinti vizualinę komunikaciją.",
      time: "Lankstus",
      remote: true,
      skills: ["Graphic design", "Canva/Photoshop", "Kūrybiškumas"],
      fullDescription: "Vizualinis turinys pritraukia 80% daugiau dėmesio nei tekstas. Tu padėsi prieglaudoms kurti profesionalią, patrauklią ir efektyvią vizualinę komunikaciją, kuri padės augintiniams greičiau rasti namus.",
      responsibilities: [
        "Kurti social media postų grafiką",
        "Dizainuoti plakatus ir banner'ius renginiams",
        "Sukurti augintinių profilių templates",
        "Paruošti email newsletter dizainus",
        "Kurti infografikus ir vizualizacijas",
        "Palaikyti vizualinio identiteto nuoseklumą",
      ],
      requirements: [
        "Canva, Photoshop, Illustrator arba panašių įrankių mokėjimas",
        "Graphic design pagrindai",
        "Spalvų teorijos ir kompozicijos supratimas",
        "Kūrybiškumas ir dėmesys detalėms",
        "Galimybė pristatyti portfolio ar pavyzdžius",
      ],
      whatYouGain: [
        "Realių projektų portfolio",
        "Patirtis dirbant su klientais (prieglaudomis)",
        "Įvairių dizaino stilių praktika",
        "Social impact design patirtis",
        "Networking su kitais dizaineriais",
        "Rekomendacijos",
      ],
    },
    {
      id: 6,
      icon: "🔍",
      title: "Pamestų augintinių koordinavimas",
      description: "Sekite pamestų ir rastų augintinių skelbimus, padėk sujungti savininkus su radėjais, koordinuok paieškų kampanijas.",
      time: "4-6 val/savaitę",
      remote: true,
      skills: ["Organizavimas", "Komunikacija", "Empatija"],
      fullDescription: "Kiekvienais metais tūkstančiai augintinių prapuola Lietuvoje. Tu būsi tas žmogus, kuris padės jiems grįžti namo. Koordinuosi paieškos pastangas, sujungsi žmones ir gelbėsi gyvūnų gyvybes.",
      responsibilities: [
        "Stebėti naujus pamestų/rastų augintinių skelbimus",
        "Susieti panašius skelbimus ir informuoti šalis",
        "Koordinuoti paieškų kampanijas social media",
        "Bendrauti su radėjais, savininkais ir prieglaudomis",
        "Organizuoti dokumentų ir nuotraukų patvirtinimą",
        "Sekti atitikmenis ir padėti juos patvirtinti",
      ],
      requirements: [
        "Puikūs organizaciniai įgūdžiai",
        "Empatija ir jautrumas",
        "Greitas reakcijos laikas",
        "Multitasking gebėjimas",
        "Atsidavimas ir patikimumas",
        "Galimybė būti pasiekiamam telefonu/email",
      ],
      whatYouGain: [
        "Koordinavimo ir project management patirtis",
        "Crisis management įgūdžiai",
        "Tiesioginį, matyti poveikį (sugrįžę augintiniai)",
        "Networking su prieglaudomis ir aktyvistais",
        "Empatiškų komunikacijos įgūdžių tobulinimas",
        "Gilią pasitenkinimo jausmo patirtį",
      ],
    },
  ];

  const benefits = [
    {
      icon: "❤️",
      title: "Darbuokis iš namų",
      description: "Dauguma pozicijų yra nuotolinės – galite padėti bet kur esate",
    },
    {
      icon: "⏰",
      title: "Lankstus grafikas",
      description: "Patys pasirinkite, kada ir kiek laiko galite skirti",
    },
    {
      icon: "🎓",
      title: "Mokymasis",
      description: "Įgykite naujos patirties ir įgūdžių dirbdami su realiais projektais",
    },
    {
      icon: "🤝",
      title: "Bendruomenė",
      description: "Susipažinkite su panašių interesų žmonėmis ir gyvūnų mylėtojais",
    },
    {
      icon: "🏆",
      title: "Poveikis",
      description: "Matykite tiesioginį savo darbo rezultatą – išgelbėti gyvūnų gyvenimai",
    },
    {
      icon: "📄",
      title: "Rekomendacijos",
      description: "Gaukite rekomendacijas ir patirtį savo CV/portfeliui",
    },
  ];

  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="bg-white">
      <Seo
        title="Savanorystė | Padėk gyvūnų prieglaudoms Lietuvoje | PetLietuva"
        description="Tapk PetLietuva savanoriu ir padėk gyvūnų prieglaudoms Lietuvoje. Pildyk informaciją, fotografuok augintinius, padėk socialiniuose tinkluose – pasirink poziciją pagal savo įgūdžius."
        path="/darbas"
        keywords="savanorystė Lietuvoje, savanoris gyvūnams, padėti prieglaudai, savanoris su gyvūnais, gyvūnų globos savanorystė, padėti gyvūnams, savanoriai Vilniuje, savanoriai Kaune"
        jsonLd={[
          breadcrumbSchema([
            { name: "Pradžia", path: "/" },
            { name: "Savanorystė", path: "/darbas" },
          ]),
          ...volunteerOpportunities.map((o) =>
            volunteerJobSchema({
              title: o.title,
              description: o.fullDescription || o.description,
              datePosted: today,
              employmentType: "VOLUNTEER",
              remote: o.remote,
            })
          ),
        ]}
      />

      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-[#6d0ef1] via-[#5a0bc9] to-[#4a0999] text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-6 py-2.5 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="text-sm font-bold tracking-wide">🐾 Savanorystė PetLietuva</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Padėk gyvūnams rasti{" "}
              <span className="text-[#f99e1f]">namus</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 font-light leading-relaxed">
              Prisijunk prie mūsų savanorių komandos ir padėk gyvūnų prieglaudoms 
              pasiekti daugiau žmonių. Visos pozicijos yra <strong className="font-bold">neapmokamos</strong> – 
              tai savanoriškas darbas iš meilės gyvūnams.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#opportunities"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#6d0ef1] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
              >
                Peržiūrėti pozicijas
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                Susisiekti
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY VOLUNTEER ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-[#f2eef6] rounded-full">
              <span className="text-sm font-bold text-[#6d0ef1]">Kodėl tapti savanoriu?</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tavo pagalba keičia{" "}
              <span className="text-[#6d0ef1]">gyvūnų gyvenimus</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kiekvienas savanoris padeda gyvūnų prieglaudoms geriau pristatyti savo augintinių, 
              pasiekti daugiau potencialių įvaikinančiųjų ir išgelbėti gyvūnų gyvybes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OPPORTUNITIES ================= */}
      <section id="opportunities" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-white rounded-full shadow-sm">
              <span className="text-sm font-bold text-[#6d0ef1]">Savanoriškos pozicijos</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kaip galite padėti?
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pasirinkite poziciją, kuri atitinka jūsų įgūdžius ir pomėgius. 
              Visos pozicijos yra <strong className="text-[#6d0ef1]">savanoriškos</strong> ir <strong className="text-[#6d0ef1]">neapmokamos</strong>.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {volunteerOpportunities.map((opportunity) => (
              <div 
                key={opportunity.id}
                onClick={() => openModal(opportunity)}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-[#6d0ef1] cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-5xl">{opportunity.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {opportunity.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#f2eef6] text-[#6d0ef1] text-xs font-semibold rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {opportunity.time}
                      </span>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        opportunity.remote 
                          ? 'bg-green-50 text-green-700' 
                          : 'bg-blue-50 text-blue-700'
                      }`}>
                        {opportunity.remote ? '🏠 Nuotolinis' : '📍 Vietoje'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {opportunity.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-bold text-gray-900 mb-2">Reikalingi įgūdžiai:</h4>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(opportunity);
                  }}
                  className="inline-flex items-center gap-2 text-[#6d0ef1] font-semibold hover:text-[#5a0bc9] transition"
                >
                  Skaityti daugiau
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMPACT STATS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kartu padedame <span className="text-[#6d0ef1]">tūkstančiams</span> gyvūnų
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-[#f2eef6] to-white rounded-2xl">
              <div className="text-4xl md:text-5xl font-extrabold text-[#6d0ef1] mb-2">
                50+
              </div>
              <div className="text-gray-700 font-semibold">
                Aktyvių savanorių
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-[#fff5eb] to-white rounded-2xl">
              <div className="text-4xl md:text-5xl font-extrabold text-[#f99e1f] mb-2">
                120+
              </div>
              <div className="text-gray-700 font-semibold">
                Prieglaudų aptarnauta
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl">
              <div className="text-4xl md:text-5xl font-extrabold text-green-600 mb-2">
                2,000+
              </div>
              <div className="text-gray-700 font-semibold">
                Augintinių padėta rasti namus
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl">
              <div className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2">
                15k+
              </div>
              <div className="text-gray-700 font-semibold">
                Darbo valandų įdėta
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ką sako mūsų savanoriai?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6d0ef1] to-[#5a0bc9] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  L
                </div>
                <div>
                  <div className="font-bold text-gray-900">Laura</div>
                  <div className="text-sm text-gray-600">Social media savanorė</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                "Labai smagu matyti, kaip mano kuriamas turinys padeda augintiniams 
                rasti namus greičiau. Tai neįkainojama patirtis!"
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#f99e1f] to-[#e88d0e] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div>
                  <div className="font-bold text-gray-900">Matas</div>
                  <div className="text-sm text-gray-600">Fotografijos savanoris</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                "Fotografuoti šunis ir kates – mano aistra. O kai matau, kad mano 
                nuotraukos padeda jiems rasti šeimas, tai neapsakomas jausmas."
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  G
                </div>
                <div>
                  <div className="font-bold text-gray-900">Greta</div>
                  <div className="text-sm text-gray-600">Turinio kūrėja</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                "Rašydama augintinių istorijas, jaučiu, kad darau tikrą skirtumą. 
                Kiekviena istorija yra unikali ir verta papasakoti."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT / APPLICATION ================= */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-[#f2eef6] rounded-full">
              <span className="text-sm font-bold text-[#6d0ef1]">Norite prisidėti?</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Tapkite dalimi komandos
            </h2>
            
            <p className="text-xl text-gray-600 mb-10">
              Parašykite mums ir papasakokite apie save! Kokią poziciją domina? 
              Kokius įgūdžius turite? Kiek laiko galėtumėte skirti?
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#f2eef6] to-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#6d0ef1] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">El. paštas</h3>
                  <a 
                    href="mailto:savanoriai@petlietuva.lt"
                    className="text-[#6d0ef1] hover:underline"
                  >
                    savanoriai@petlietuva.lt
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#f99e1f] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Parašykite mums</h3>
                  <Link 
                    to="/contact"
                    className="text-[#6d0ef1] hover:underline"
                  >
                    Kontaktų forma
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a
                href="mailto:savanoriai@petlietuva.lt?subject=Noriu tapti savanoriu"
                className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-[#6d0ef1] to-[#5a0bc9] text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-xl"
              >
                Parašyti laišką
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dažniausiai užduodami klausimai
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Ar tikrai viskas yra nemokamai?
              </h3>
              <p className="text-gray-700">
                Taip! Visos pozicijos yra savanoriškos ir neapmokamos. Tai laisvanoriškas 
                darbas iš meilės gyvūnams ir noro padėti.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Ar reikia turėti patirties?
              </h3>
              <p className="text-gray-700">
                Ne! Mes mokiname visus reikalingus įgūdžius. Svarbiausias reikalavimas – 
                noras padėti ir patikimas įsipareigojimas.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Kiek laiko reikės skirti?
              </h3>
              <p className="text-gray-700">
                Priklauso nuo pozicijos – nuo 2-3 valandų iki 7 valandų per savaitę. 
                Grafikas yra lankstus ir pritaikomas jūsų galimybėms.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Ar galima dirbti nuotoliniu būdu?
              </h3>
              <p className="text-gray-700">
                Dauguma pozicijų yra nuotolinės! Tik fotografavimas reikalauja fizinio 
                buvimo prieglaudose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 bg-gradient-to-br from-[#6d0ef1] to-[#5a0bc9] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Kiekvienas gali padaryti skirtumą
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
            Prisijunkite prie savanorių komandos ir padėkite gyvūnams rasti mylintį namą
          </p>

          <a
            href="#opportunities"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-[#6d0ef1] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
          >
            Pradėti šiandien
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </section>

      {/* ================= DETAIL MODAL ================= */}
      {isModalOpen && selectedOpportunity && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#6d0ef1] to-[#5a0bc9] text-white p-8 rounded-t-3xl">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="flex items-start gap-6">
                <div className="text-6xl">{selectedOpportunity.icon}</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-3">
                    {selectedOpportunity.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                      ⏰ {selectedOpportunity.time}
                    </span>
                    <span className={`px-4 py-1.5 backdrop-blur-sm rounded-full text-sm font-semibold ${
                      selectedOpportunity.remote 
                        ? 'bg-green-400/30' 
                        : 'bg-blue-400/30'
                    }`}>
                      {selectedOpportunity.remote ? '🏠 Nuotolinis' : '📍 Vietoje'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              
              {/* Full Description */}
              <div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {selectedOpportunity.fullDescription}
                </p>
              </div>

              {/* Responsibilities */}
              {selectedOpportunity.responsibilities && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📋</span>
                    Pagrindinės užduotys
                  </h3>
                  <ul className="space-y-3">
                    {selectedOpportunity.responsibilities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <span className="text-[#6d0ef1] text-xl flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {selectedOpportunity.requirements && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    Reikalavimai
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedOpportunity.requirements.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                      >
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Pagrindiniai įgūdžiai
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedOpportunity.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-4 py-2 bg-[#f2eef6] text-[#6d0ef1] font-semibold rounded-xl text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* What You Gain */}
              {selectedOpportunity.whatYouGain && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎁</span>
                    Ką įgausite?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedOpportunity.whatYouGain.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-3 p-4 bg-gradient-to-br from-[#f2eef6] to-white rounded-xl border border-[#6d0ef1]/20"
                      >
                        <span className="text-[#f99e1f] text-xl flex-shrink-0">★</span>
                        <span className="text-gray-700 text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:savanoriai@petlietuva.lt?subject=Dėl pozicijos: ${selectedOpportunity.title}"
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-[#6d0ef1] to-[#5a0bc9] text-white text-center rounded-xl font-bold hover:opacity-90 transition shadow-lg"
                  >
                    Kreiptis dabar
                  </a>
                  
                  <a
                    href="#contact"
                    onClick={closeModal}
                    className="flex-1 py-4 px-6 border-2 border-[#6d0ef1] text-[#6d0ef1] text-center rounded-xl font-bold hover:bg-[#6d0ef1] hover:text-white transition"
                  >
                    Susisiekti
                  </a>
                </div>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  * Visos pozicijos yra savanoriškos ir neapmokamos
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
};

export default Careers;