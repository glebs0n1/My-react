import React, { useEffect, useState } from "react";
import { Seo, faqPageSchema, breadcrumbSchema } from "../../SEO";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  icon: string;
  title: string;
  description: string;
  questions: FAQItem[];
}

const FAQ: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>("shelters");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleQuestion = (categoryId: string, questionIndex: number) => {
    const key = `${categoryId}-${questionIndex}`;
    setOpenQuestion(openQuestion === key ? null : key);
  };

  const categories: FAQCategory[] = [
    {
      id: "shelters",
      icon: "🏠",
      title: "Prieglaudos",
      description: "Klausimai apie gyvūnų prieglaudas ir įvaikinimą",
      questions: [
        {
          question: "Kaip rasti gyvūnų prieglaudą savo mieste?",
          answer: "PetLietuva platformoje galite lengvai rasti prieglaudas visoje Lietuvoje. Tiesiog eikite į 'Prieglaudos' skiltį, pasirinkite savo miestą arba regioną, ir pamatysite visas prieinamas prieglaudas su jų kontaktine informacija, darbo laiku ir nuotraukomis. Taip pat galite filtruoti pagal gyvūnų rūšis (šunys, katės, kiti)."
        },
        {
          question: "Kokius dokumentus reikia įvaikinti gyvūną iš prieglaudos?",
          answer: "Paprastai reikia asmens dokumento (paso arba ID kortelės), gyvenamosios vietos adreso patvirtinimo ir kartais pajamų pažymėjimo. Daugelis prieglaudų taip pat reikalauja pasirašyti įvaikinimo sutartį. Kai kurios prieglaudos gali paprašyti nuotraukų iš jūsų namų arba atlikti vizitą, kad įsitikintų, jog gyvenamoji vieta tinkama gyvūnui. Tikslūs reikalavimai priklauso nuo konkrečios prieglaudos."
        },
        {
          question: "Ar įvaikinti gyvūnai būna paskiepyti ir čipuoti?",
          answer: "Taip! Dauguma rimtų prieglaudų prieš įvaikinimą užtikrina, kad gyvūnai būtų pilnai paskiepyti pagal amžių, čipuoti, išvalyti nuo parazitų ir, jei tinkama, sterilizuoti/kastruoti. Visos šios procedūros paprastai yra įskaičiuotos į įvaikinimo mokestį. Visada gaukite veterinarinį pasą su visais įrašais apie atliktus skiepus ir procedūras."
        },
        {
          question: "Kiek kainuoja gyvūno įvaikinimas iš prieglaudos?",
          answer: "Įvaikinimo mokestis Lietuvoje svyruoja nuo 50 € iki 200 €, priklausomai nuo prieglaudos ir gyvūno amžiaus. Šis mokestis paprastai padengia veterinarines procedūras: skiepus, čipavimą, sterilizaciją/kastraciją ir sveikatos patikrinimą. Kai kurios prieglaudos turi lanksčias kainas arba siūlo nuolaidas pensinio amžiaus žmonėms ar šeimoms."
        },
        {
          question: "Ar galiu grąžinti gyvūną, jei neprisitaikau?",
          answer: "Dauguma prieglaudų turi prisitaikymo laikotarpį (paprastai 2-4 savaites), per kurį galite grąžinti gyvūną, jei matote, kad neprisitaikote. Visgi, prieglaudos labai prašo atsakingai priimti sprendimą prieš įvaikinant. Jei kyla sunkumų, pirmiausia kreipkitės į prieglaudą – jos gali pasiūlyti patarimus, dresūros pagalbą ar kitas paslaugas, kad padėtų jums prisitaikyti."
        },
        {
          question: "Ar prieglaudos priima gyvūnus, kuriuos radau gatvėje?",
          answer: "Taip, dauguma prieglaudų priima rastos gyvūnus, tačiau vietos gali būti ribotos. Jei radote gyvūną, pirmiausia patikrinkite, ar jis čipuotas (veterinaras ar prieglauda gali tai padaryti nemokamai), paskelbkite apie rastą gyvūną PetLietuva platformoje ir vietinėse Facebook grupėse. Jei per kelias dienas savininkas neatsiranda, susisiekite su artimiausią prieglaudą. Kai kurios prieglaudos turi laukimo sąrašus."
        },
      ]
    },
    {
      id: "care",
      icon: "❤️",
      title: "Gyvūnų priežiūra",
      description: "Patarimai apie kasdienę gyvūnų priežiūrą",
      questions: [
        {
          question: "Kiek kartų per dieną reikia maitinti suaugusį šunį?",
          answer: "Suaugusį šunį rekomenduojama maitinti 2 kartus per dieną – ryte ir vakare. Tai padeda išlaikyti stabilų energijos lygį ir užkerta kelią persivalgymu. Šuniukams (iki 6 mėnesių) reikia dažnesnio maitinimo – 3-4 kartus per dieną. Porcijos dydis priklauso nuo šuns veislės, dydžio, amžiaus ir aktyvumo lygio. Visada konsultuokitės su veterinaru dėl individualaus maitinimo plano."
        },
        {
          question: "Kaip dažnai reikia kirpti šunį ar katę?",
          answer: "Priklauso nuo veislės ir kailio tipo. Ilgaplaukiai šunys ir katės paprastai reikalauja profesionalaus kirpimo kas 6-8 savaites. Trumpaplaukiai gali apsieiti be profesionalaus kirpimo, bet reguliari kailio priežiūra (šukavimas) yra būtina visiems. Nagų karpymas reikalingas kas 3-4 savaites, jei jie natūraliai nenusivelka pasivaikščiojimų metu. PetLietuva platformoje rasite profesionalius kirpėjus jūsų mieste!"
        },
        {
          question: "Ar galiu šunį maudyti žmogaus šampūnu?",
          answer: "NE! Žmogaus šampūnai turi kitokį pH lygį nei gyvūnų oda, todėl gali sukelti odos dirginimą, sausumą ir alergines reakcijas. Naudokite tik specialius šunims ar katėms skirtus šampūnus. Šunis paprastai reikia maudyti kas 4-8 savaites (priklausomai nuo veislės ir gyvenimo būdo), o kates – tik esant būtinybei, nes jos pačios puikiai pasirūpina savo švara."
        },
        {
          question: "Kokius maisto produktus niekada negaliu duoti šuniui ar katei?",
          answer: "NIEKADA neduokite: šokolado, svogūnų, česnakų, vynuogių, razinų, avokadų, ksilitolo (saldikliu), alkoholio, kofeino, žalių bulvių, pomidorų stiebų/lapų, obuolių sėklų. Šie produktai yra toksiški gyvūnams ir gali sukelti sunkų apsinuodijimą ar net mirtį. Jei jūsų gyvūnas suvalgė ką nors iš šių produktų, NEDELSIANT skambinkite veterinarui arba 24/7 veterinarijos skubios pagalbos linijai."
        },
        {
          question: "Kaip suprasti, kad gyvūnas serga?",
          answer: "Pagrindiniai ligos ženklai: apetito praradimas (atsisako valgyti >24 val), letargija (miega daugiau nei įprastai), vėmimas ar viduriavimas, sunkus kvėpavimas, kosulis, uodegą tarp kojų, vengia kontakto, akių ar nosies išskyros, šlapinimosi problemos, staigus elgesio pasikeitimas. Jei pastebite bet kurį iš šių simptomų ilgiau nei 24 valandas arba jie atrodo sunkūs – NEDELSIANT kreipkitės į veterinarą!"
        },
        {
          question: "Kaip išmokyti katiną naudotis priemaisčiu?",
          answer: "Katinai instinktyviai kasa, todėl paprastai greitai išmoksta. Patarimai: 1) Patalpinkite priemaisčius ramią, privatų vietą (ne prie maisto/vandens); 2) Rodykite katiną į priemaisčius po valgio; 3) Pagirkite ir palepinkite, kai naudojasi teisingai; 4) Valykite priemaisčius kasdien – katės mėgsta švarą; 5) Naudokite tinkamą kraiką (bekvapio, smulkaus); 6) Jei katė pakliūna ne ten, švelniai paimkite ir padėkite į priemaisčius. NIEKADA nebausite – tai tik sukels stresą."
        },
      ]
    },
    {
      id: "training",
      icon: "🎓",
      title: "Dresūra",
      description: "Trumpi patarimai apie šunų dresūrą",
      questions: [
        {
          question: "Nuo kokio amžiaus galima pradėti dresūroti šunį?",
          answer: "Šuniuką galima ir reikia pradėti socializuoti ir mokyti bazinių komandų nuo 8 savaičių amžiaus! Ankstyvasis mokymas yra kritiškai svarbus. Šuniukai nuo 8 iki 16 savaičių yra 'socializacijos lango' periodo – per šį laiką jie lengviausiai išmoksta ir pripranta prie naujų dalykų. Profesionalią dresūrą su treneru galima pradėti nuo 3-4 mėnesių. PetLietuva platformoje rasite patyrusius dresūros trenerius visoje Lietuvoje!"
        },
        {
          question: "Kokios yra svarbiausios bazinės komandos?",
          answer: "5 pagrindinės komandos, kurias turėtų mokėti kiekvienas šuo: 1) 'Sėdėk' – bazinė komanda visoms kitoms; 2) 'Gulėk' – ramybės komanda; 3) 'Stovėk' (arba 'Palauk') – savikontrolė; 4) 'Pas mane' – gyvybiškai svarbi saugumo komanda; 5) 'Ne' arba 'Fu' – draudimo komanda. Šios komandos padeda valdyti šunį bet kurioje situacijoje ir užtikrina jo saugumą."
        },
        {
          question: "Kaip ilgai turėtų trukti dresūros sesija?",
          answer: "Šuniukams: 5-10 minučių, 2-3 kartus per dieną. Suaugusiems šunims: 10-15 minučių, 1-2 kartus per dieną. SVARBIAUSIA – baikite sesiją PRIEŠ šuo nusibosta. Geriau trumpesnės, bet dažnesnės sesijos nei viena ilga ir nuobodi. Visada baikite pozityvia nota – komanda, kurią šuo gerai moka, ir apdovanojimas. Dresūra turi būti maloni patirtis abiem!"
        },
        {
          question: "Ar galiu dresūroti šunį pats, ar būtinas treneris?",
          answer: "Bazinius dalykus galite mokyti patys, naudodami YouTube video pamokėles ir knygeles. TAČIAU profesionalus treneris rekomenduojamas, ypač jei: 1) Tai pirmas jūsų šuo; 2) Šuo rodo agresijos ar baimės požymių; 3) Norite mokytis specializuotų dalykų (IPO, agility, tracking); 4) Turite specifinių elgesio problemų. Treneris ne tik išmokys šunį, bet ir JUMS parodys, kaip teisingai bendrauti su šunimi. Investicija į gerą dresūrą atsipirks šimteriopai!"
        },
        {
          question: "Ar bausmės metodas veikia dresūroje?",
          answer: "NE! Šiuolaikinė dresūra grįsta POZITYVIA STIPRINIMU, ne bausme. Moksliškai įrodyta, kad bausmės metodai: 1) Sukelia stresą ir baimę; 2) Gadina ryšį tarp šuns ir šeimininko; 3) Gali sukelti agresiją; 4) Veikia lėčiau nei pozityvi dresūra. Teisingas būdas: apdovanokite teisingą elgesį (skanėstais, žaidimu, pagyrimu) ir ignoruokite neteisingą. Jei šuo daro kažką blogai – nukreipkite jo dėmesį į teisingą veiksmą ir apdovanokite už tai."
        },
        {
          question: "Kiek laiko užtrunka išdresūroti šunį?",
          answer: "Priklauso nuo komandos sudėtingumo ir šuns. Bazinės komandos ('Sėdėk', 'Gulėk'): 1-2 savaitės kasdienio treniravimo. Pažangesnės komandos: 4-8 savaitės. Pilnas paklusnumo kursas: 3-6 mėnesiai. BET – dresūra niekada nesibaigia! Net išdresūruotam šuniui reikia nuolatinio praktikavimo. Kaip sakoma: 'Jei nemoki šuns, šuo neišmoks savęs.' Nuoseklumas ir reguliarumas yra raktas į sėkmę."
        },
      ]
    },
    {
      id: "veterinary",
      icon: "🏥",
      title: "Veterinarija",
      description: "Klausimai apie veterinarijos paslaugas",
      questions: [
        {
          question: "Kokius gyvūnus priima veterinarai Lietuvoje?",
          answer: "Dauguma veterinarijos klinikų Lietuvoje priima: šunis, kates, šeškelius (triušius, jūrų kiaulytes, žiurkėnus, žiurkes), graužikus (hamsterius, žvirblainius), šinšilas, ežius. Specializuotos egzotinių gyvūnų klinikos gali priimti: paukščius (papūgas, kanarėles, vištų), roplių (driežus, gyvates, vėžlius), varliagyvių (varles, salamandras). PetLietuva platformoje galite filtruoti veterinarijos klinikas pagal tai, kokius gyvūnus jos priima!"
        },
        {
          question: "Kaip dažnai reikia vesti gyvūną pas veterinarą?",
          answer: "Sveikų, suaugusių gyvūnų (1-7 metų) profilaktinis patikrinimas: 1 kartą per metus. Vyresnių gyvūnų (>7 metų): 2 kartus per metus. Šuniukų/kačiukų: kas 3-4 savaites skiepams iki 16 savaičių amžiaus. Metinė apžiūra turėtų apimti: bendrą sveikatos patikrinimą, dantų būklės įvertinimą, svorio kontrolę, parazitų prevenciją, vakcinacijas (pagal poreikį). Vyresnių gyvūnų apžiūra gali apimti kraujo tyrimus ir kitą diagnostiką."
        },
        {
          question: "Kiek kainuoja veterinarinės paslaugos Lietuvoje?",
          answer: "Orientacinės kainos 2024-2026 m.: Konsultacija: 15-30 €; Skiepai: 20-40 € (priklausomai nuo skiepų kombinacijos); Sterilizacija/kastracija: 40-150 € (priklausomai nuo gyvūno dydžio); Čipavimas: 15-25 €; Dantų valymas: 50-150 €; Kraujo tyrimai: 30-80 €; Rentgenas: 25-60 €; Chirurginės operacijos: nuo 100 € iki kelių šimtų. Tikslias kainas visada pasitikslinkite konkrečioje klinikoje – jos gali skirtis priklausomai nuo regiono ir klinikos įrangos."
        },
        {
          question: "Kada kreiptis į veterinarinę skubią pagalbą?",
          answer: "NEDELSIANT skambinkite veterinarui 24/7 jei: 1) Sunkus kvėpavimas, uždusimas; 2) Nekontroliuojamas kraujavimas; 3) Negalima stovėti, paralyžius; 4) Krampai, traukuliai; 5) Nuodijimosi požymiai (vėmimas, drebulys, silpnumas); 6) Trauma (partrenkė automobilis, kritimas); 7) Ūmus pilvo išpūtimas (ypač didelių veislių šunims); 8) Negalėjimas šlapintis; 9) Sąmonės netekimas. Geriau perreaguoti nei vėluoti – veterinarinėje skuboje kiekviena minutė svarbi!"
        },
        {
          question: "Ar reikia užsiregistruoti vizitui pas veterinarą iš anksto?",
          answer: "Profilaktiniams vizitams (metinė apžiūra, skiepai, konsultacijos) – TAIP, registruokitės iš anksto. Dauguma klinikų leidžia registruotis telefonu, per el. paštą ar per jų svetainę. Skubiais atvejais – skambinkite iš karto, daugelis klinikų priima be registracijos. Kai kurios klinikos turi 'walk-in' valandas tam tikriems atvejams. PetLietuva platformoje rasite visų klinikų kontaktus ir galimybę pasirinkti tinkamiausią laiką."
        },
        {
          question: "Ar veterinarai dirba savaitgaliais ir vakarais?",
          answer: "Priklauso nuo klinikos. Didesnės klinikos didžiuosiuose miestuose (Vilnius, Kaunas, Klaipėda) dažnai turi išplėstą darbo laiką, įskaitant savaitgalius. 24/7 skubios pagalbos centrai dirba visą parą. Mažesnės klinikos paprastai dirba darbo dienomis 9-18 val. VISADA patikrinkite klinikos darbo laiką PRIEŠ vykdami. PetLietuva platformoje galite rasti klinikas pagal darbo laiką ir filtruoti tas, kurios dirba jums patogiu metu!"
        },
      ]
    },
  ];

  const allFaqs = categories.flatMap((c) => c.questions);

  return (
    <main className="bg-white min-h-screen">
      <Seo
        title="DUK | Dažniausi klausimai apie veterinarus, prieglaudas, dresūrą ir kirpyklas | PetLietuva"
        description="Atsakymai į populiariausius klausimus apie gyvūnų prieglaudas, įvaikinimą, kasdienę priežiūrą, šunų dresūrą ir veterinarijos paslaugas Lietuvoje – Vilniuje, Kaune, Klaipėdoje."
        path="/dazniausiai-uzduodami-klausimai"
        keywords="DUK gyvūnai, gyvūnų klausimai, kaip įvaikinti šunį, kiek kainuoja veterinaras, šunų dresūra patarimai, gyvūnų prieglauda Lietuvoje, augintinių priežiūra"
        jsonLd={[
          faqPageSchema(allFaqs),
          breadcrumbSchema([
            { name: "Pradžia", path: "/" },
            { name: "DUK", path: "/dazniausiai-uzduodami-klausimai" },
          ]),
        ]}
      />

      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-[#6d0ef1] to-[#5a0bc9] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-block mb-6 px-6 py-2.5 bg-white/20 backdrop-blur-sm rounded-full">
            <span className="text-sm font-bold tracking-wide">❓ Dažniausiai Užduodami Klausimai</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Čia rasite{" "}
            <span className="text-[#f99e1f]">atsakymus</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
            Surinkome atsakymus į populiariausius klausimus apie prieglaudas, 
            gyvūnų priežiūrą, dresūrą ir veterinarijos paslaugas
          </p>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setOpenCategory(category.id)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 ${
                  openCategory === category.id
                    ? 'bg-gradient-to-br from-[#6d0ef1] to-[#5a0bc9] text-white shadow-xl scale-105'
                    : 'bg-white text-gray-900 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-bold mb-2">{category.title}</h3>
                <p className={`text-sm ${
                  openCategory === category.id ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {category.description}
                </p>
                <div className="mt-3 text-sm font-semibold flex items-center gap-2">
                  {category.questions.length} klausimai
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* ================= QUESTIONS ================= */}
          {categories.map((category) => (
            openCategory === category.id && (
              <div key={category.id} className="space-y-4">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <span className="text-4xl">{category.icon}</span>
                    {category.title}
                  </h2>
                  <p className="text-gray-600 text-lg">{category.description}</p>
                </div>

                {category.questions.map((item, index) => {
                  const isOpen = openQuestion === `${category.id}-${index}`;
                  
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                    >
                      <button
                        onClick={() => toggleQuestion(category.id, index)}
                        className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {item.question}
                          </h3>
                        </div>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#f2eef6] flex items-center justify-center transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}>
                          <svg className="w-5 h-5 text-[#6d0ef1]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6 pt-2">
                          <div className="pl-4 border-l-4 border-[#6d0ef1]">
                            <p className="text-gray-700 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )
          ))}
        </div>
      </section>

      {/* ================= HELP SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Neradote atsakymo?
          </h2>
          
          <p className="text-xl text-gray-600 mb-10">
            Susisiekite su mumis ir mielai padėsime atsakyti į jūsų klausimus!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6d0ef1] to-[#5a0bc9] text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Susisiekti
            </a>
            
            <a
              href="mailto:info@petlietuva.lt"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#6d0ef1] text-[#6d0ef1] rounded-xl font-bold text-lg hover:bg-[#6d0ef1] hover:text-white transition-all"
            >
              info@petlietuva.lt
            </a>
          </div>
        </div>
      </section>

      {/* ================= QUICK LINKS ================= */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Naudingos nuorodos
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="/shelter"
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all text-center"
            >
              <div className="text-4xl mb-3">🏠</div>
              <h3 className="font-bold text-gray-900 mb-2">Prieglaudos</h3>
              <p className="text-sm text-gray-600">Raskite prieglaudą savo mieste</p>
            </a>

            <a
              href="/veterinarian"
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all text-center"
            >
              <div className="text-4xl mb-3">🏥</div>
              <h3 className="font-bold text-gray-900 mb-2">Veterinarai</h3>
              <p className="text-sm text-gray-600">Patikimi veterinarai Lietuvoje</p>
            </a>

            <a
              href="/training"
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all text-center"
            >
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="font-bold text-gray-900 mb-2">Dresūra</h3>
              <p className="text-sm text-gray-600">Profesionalūs treneriai</p>
            </a>

            <a
              href="/grooming"
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all text-center"
            >
              <div className="text-4xl mb-3">✂️</div>
              <h3 className="font-bold text-gray-900 mb-2">Kirpimas</h3>
              <p className="text-sm text-gray-600">Gyvūnų kirpėjai</p>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
};

export default FAQ;