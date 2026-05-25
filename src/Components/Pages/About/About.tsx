import React, { useEffect } from "react";
import {
  Seo,
  organizationSchema,
  websiteSchema,
  breadcrumbSchema,
} from "../../SEO";

const About: React.FC = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Seo
        title="Apie mus | PetLietuva – Lietuvos gyvūnų bendruomenės platforma"
        description="PetLietuva jungia gyvūnų savininkus su patikimais veterinarais, dresuotojais, kirpyklomis ir prieglaudomis visoje Lietuvoje. Sužinokite apie mūsų misiją padėti kiekvienam augintiniui rasti šiltus namus."
        path="/apie-mus"
        keywords="apie petlietuva, gyvūnų bendruomenė Lietuvoje, gyvūnų platforma, pamesti augintiniai, gyvūnų globa Lietuva, kinologas Lietuvoje"
        jsonLd={[
          organizationSchema(),
          websiteSchema(),
          breadcrumbSchema([
            { name: "Pradžia", path: "/" },
            { name: "Apie mus", path: "/apie-mus" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: "https://petlietuva.lt/apie-mus",
            name: "Apie PetLietuva",
            inLanguage: "lt-LT",
            isPartOf: { "@id": "https://petlietuva.lt/#website" },
          },
        ]}
      />

      {/* ================= PAGE CONTENT ================= */}
      <main className="bg-white">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative bg-gradient-to-br from-[#6d0ef1] to-[#5a0bc9] text-white py-24 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block mb-6 px-6 py-2.5 bg-white/20 backdrop-blur-sm rounded-full">
                <span className="text-sm font-bold tracking-wide">🐾 Apie PetLietuva</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Jungiame Lietuvos gyvūnų bendruomenę{" "}
                <span className="text-[#f99e1f]">viename namuose</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 font-light leading-relaxed">
                Pirmoji platforma Lietuvoje, kur susitinka gyvūnų mylėtojai, 
                specialistai ir paslaugų teikėjai – visi kartu kurdami geresnį 
                rytojų mūsų keturkojams draugams.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/20">
                  <div className="text-3xl font-bold">15,000+</div>
                  <div className="text-sm text-white/80">Augintinių kasmet prapuola</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/20">
                  <div className="text-3xl font-bold">30%</div>
                  <div className="text-sm text-white/80">Sugrįžta namo</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/20">
                  <div className="text-3xl font-bold">1,000+</div>
                  <div className="text-sm text-white/80">Bendruomenės narių</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= KAS YRA PETLIETUVA ================= */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left - Content */}
              <div>
                <div className="inline-block mb-4 px-4 py-2 bg-[#f2eef6] rounded-full">
                  <span className="text-sm font-bold text-[#6d0ef1]">Kas yra PetLietuva?</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Daugiau nei paslaugų katalogas – esame šilta{" "}
                  <span className="text-[#6d0ef1]">bendruomenė</span>
                </h2>
                
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    <strong className="text-gray-900">PetLietuva</strong> – tai pirmoji Lietuvos gyvūnų 
                    bendruomenės platforma, jungianti savininkus su patikimais specialistais vienoje vietoje.
                  </p>
                  
                  <p>
                    Čia susitinka <strong className="text-[#6d0ef1]">dresuotojai</strong>,{" "}
                    <strong className="text-[#6d0ef1]">veterinarai</strong>,{" "}
                    <strong className="text-[#6d0ef1]">kirpėjai</strong>,{" "}
                    <strong className="text-[#6d0ef1]">viešbučiai</strong> ir{" "}
                    <strong className="text-[#6d0ef1]">gyvūnų mylėtojai</strong> – 
                    visi kartu kurdami geresnę aplinką mūsų keturkojams draugams.
                  </p>
                  
                  <p>
                    Kiekvienas partneris gali sukurti savo puslapį ir pasiekti tūkstančius 
                    gyvūnų entuziastų visoje Lietuvoje. O kiekvienas šeimininkas gali 
                    rasti būtent tai, ko reikia jo augintiniui – greitai, patogiai ir patikimai.
                  </p>
                </div>
              </div>

              {/* Right - Image */}
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#f2eef6] to-[#e8dff8] p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🐕</div>
                    <h3 className="text-2xl font-bold text-[#6d0ef1] mb-2">
                      Visi kartu
                    </h3>
                    <p className="text-gray-700">
                      Augintiniai • Šeimininkai • Specialistai
                    </p>
                  </div>
                </div>
                
                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border-2 border-[#6d0ef1]">
                  <div className="text-3xl">✨</div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border-2 border-[#f99e1f]">
                  <div className="text-3xl">❤️</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MISSION ================= */}
        <section className="py-20 bg-[#f2eef6]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block mb-6 px-6 py-3 bg-white rounded-full shadow-md">
              <span className="text-sm font-bold text-[#6d0ef1]">Mūsų Misija</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              "Jungiame gyvūnų bendruomenę ir kuriame{" "}
              <span className="text-[#6d0ef1]">šiltą namų jausmą</span>{" "}
              kiekvienam keturkojui ir jo šeimai"
            </h2>
            
            <div className="flex items-center justify-center gap-4 mt-12">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6d0ef1] to-[#5a0bc9] flex items-center justify-center">
                <span className="text-2xl">🐾</span>
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-lg">Gleb</div>
                <div className="text-gray-600">PetLietuva įkūrėjas ir kinologas</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FOUNDER STORY ================= */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left - Image */}
              <div className="relative order-2 lg:order-1">
                <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-[#f99e1f]/20 to-[#f99e1f]/5 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80"
                    alt="PetLietuva įkūrėjas Gleb – kinologas Lietuvoje su šunimi"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                
                {/* Quote Badge */}
                <div className="absolute bottom-8 left-8 right-8 bg-white rounded-2xl shadow-2xl p-6 border-l-4 border-[#6d0ef1]">
                  <p className="text-gray-900 font-semibold italic">
                    "PetLietuva – Internetiniai tavo augintinio namai"
                  </p>
                </div>
              </div>

              {/* Right - Content */}
              <div className="order-1 lg:order-2">
                <div className="inline-block mb-4 px-4 py-2 bg-[#fff5eb] rounded-full">
                  <span className="text-sm font-bold text-[#f99e1f]">Mūsų Istorija</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Kelionė, prasidėjusi iš{" "}
                  <span className="text-[#f99e1f]">aiškos gyvūnams</span>
                </h2>
                
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Saulius – PetLietuva įkūrėjas ir profesionalus kinologas su neišsenkančia 
                    aistra gyvūnams. Jo kelionė prasidėjo dar vaikystėje su pirmuoju šuniuku 
                    ir peraugo į tikrą profesionalią kinologijos karjerą.
                  </p>
                  
                  <p>
                    Matydamas, kaip sunku šunų savininkams rasti patikimus specialistus, 
                    kaip paslaugos išsibarstę dešimtyse vietų, o informacija – nepatikima, 
                    Gleb priėmė sprendimą: <strong className="text-gray-900">sukurti platformą, 
                    kuri viską sujungtų vienoje vietoje.</strong>
                  </p>
                  
                  <p>
                    Taip gimė <strong className="text-[#6d0ef1]">PetLietuva</strong> – platforma, 
                    kuri jungia bendruomenę ir užtikrina geriausią priežiūrą kiekvienam augintiniui. 
                    Čia kiekvienas gyvūnų mylėtojas gali rasti tai, ko ieško, o kiekvienas 
                    specialistas – pasiekti tuos, kam labiausiai reikia pagalbos.
                  </p>
                </div>

                <div className="mt-8 p-6 bg-[#f2eef6] rounded-2xl border-l-4 border-[#6d0ef1]">
                  <p className="text-gray-900 font-semibold">
                    💜 "Kiekvienas augintinys nusipelno meilės, priežiūros ir šilto namų jausmo. 
                    PetLietuva – tai vieta, kur visa tai susitinka."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= VALUES ================= */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-white rounded-full shadow-sm">
                <span className="text-sm font-bold text-[#6d0ef1]">Kas mus veda</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Mūsų vertybės
              </h2>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Penkios pagrindinės vertybės, kuriomis vadovaujamės kurdami 
                PetLietuva bendruomenę
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Value 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-[#6d0ef1]">
                <div className="w-14 h-14 bg-[#f2eef6] rounded-xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🐕</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Meilė gyvūnams
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Gyvūnai yra mūsų širdies centre. Kiekvienas sprendimas priimamas 
                  atsižvelgiant į tai, kas geriausia mūsų gyvūnėliams ir jų gerovei.
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-[#f99e1f]">
                <div className="w-14 h-14 bg-[#fff5eb] rounded-xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Bendruomeniškumas
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Tikime, kad kartu esame stipresni. Skatename dalijimąsi patirtimi, 
                  tarpusavio pagalbą ir aktyvų bendruomenės augimą.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-[#6d0ef1]">
                <div className="w-14 h-14 bg-[#f2eef6] rounded-xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🌟</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Kokybė ir patikimumas
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Teikiame tik patikimas paslaugas ir informaciją. Mūsų platformoje 
                  rasite tik patvirtintus ir atsakingus verslo partnerius.
                </p>
              </div>

              {/* Value 4 */}
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-[#f99e1f]">
                <div className="w-14 h-14 bg-[#fff5eb] rounded-xl flex items-center justify-center mb-6">
                  <span className="text-3xl">💚</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Atsakomybė
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Formuojame atsakingą gyvūnų laikymo kultūrą, skatindami 
                  registraciją, čipavimą ir tinkamą priežiūrą.
                </p>
              </div>

              {/* Value 5 */}
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-[#6d0ef1]">
                <div className="w-14 h-14 bg-[#f2eef6] rounded-xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Inovacijos
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nuolat tobuliname platformą, ieškome naujų sprendimų ir 
                  prisitaikome prie bendruomenės poreikių.
                </p>
              </div>

              {/* Value 6 - Bonus */}
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-[#f99e1f]">
                <div className="w-14 h-14 bg-[#fff5eb] rounded-xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🏠</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Namų jausmas
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Kuriame šiltą ir svetingą erdvę, kur kiekvienas narys jaučiasi 
                  kaip namie – saugus, suprastas ir brangus.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= LOST PETS PROBLEM ================= */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-red-50 rounded-full">
                <span className="text-sm font-bold text-red-600">Pamestų Augintinių Problema</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Lietuvos augintinių problema reikalauja{" "}
                <span className="text-[#6d0ef1]">sprendimo</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Kiekvienais metais tūkstančiai augintinių prapuola, o tik nedidelė 
                dalis jų sugrįžta namo. Tai turi pasikeisti.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-200">
                <div className="text-5xl md:text-6xl font-extrabold text-red-600 mb-2">
                  15,000+
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  Augintinių prapuola kasmet
                </div>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200">
                <div className="text-5xl md:text-6xl font-extrabold text-orange-600 mb-2">
                  30%
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  Tik sugrįžta namo
                </div>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
                <div className="text-5xl md:text-6xl font-extrabold text-green-600 mb-2">
                  100%
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  Nusipelno sugrįžti
                </div>
              </div>
            </div>

            {/* Problem Explanation */}
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                Kiekvienas pamestą augintinys nusipelno grįžti namo
              </h3>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
                <p>
                  Pasiklydę gyvūnai dažnai yra visai šalia, tačiau skelbimai išsibarstę 
                  dešimtyse Facebook grupių, forumuose ir įvairiose platformose. Dėl to 
                  šeimininkai ir radėjai vienas kito paprasčiausiai neranda.
                </p>
                
                <p>
                  <strong className="text-gray-900">PetLietuva</strong> jungia visus vienoje 
                  vietoje: <strong className="text-[#6d0ef1]">automatinius atitikmenis</strong>,{" "}
                  <strong className="text-[#6d0ef1]">aktyvią bendruomenę</strong> ir{" "}
                  <strong className="text-[#6d0ef1]">greitą informacijos sklaidą</strong>. 
                  Todėl kiekvienas pamestą augintinys turi maksimalią šansą kuo greičiau 
                  sugrįžti namo.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#6d0ef1] rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Didelė paieškos bendruomenė</h4>
                      <p className="text-sm text-gray-600">Tūkstančiai akių ieško jūsų augintinio</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#f99e1f] rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Greita informacijos sklaida</h4>
                      <p className="text-sm text-gray-600">Skelbimas pasiekia visus per kelias minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/lost-pets/found"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#6d0ef1] text-white rounded-xl font-bold text-lg hover:bg-[#5a0bc9] transition-all shadow-lg hover:shadow-xl"
              >
                <span>📍</span>
                Radau gyvūną!
              </a>
              
              <a
                href="/lost-pets/lost"
                className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
              >
                <span>🔍</span>
                Dingo augintinis!
              </a>
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-20 bg-gradient-to-br from-[#6d0ef1] to-[#5a0bc9] text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Prisijunkite prie PetLietuva bendruomenės šiandien
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
              Kartu kuriame geresnį rytojų kiekvienam augintiniui Lietuvoje
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/register"
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-[#6d0ef1] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
              >
                Prisijungti dabar
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-5 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                Susisiekti
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default About;