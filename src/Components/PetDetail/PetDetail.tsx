import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdoptionInquiryModal from "../AdoptionInquiry/AdoptionInquiryModal";
import AdoptBundleModal from "../AdoptionInquiry/AdoptBundleModal";
import Gallery from "../Gallery/Gallery";
import petsData from "../../data/shelters/lese/scraped_lese_vilnius_full.json";
import petsDataBeglobis from "../../data/shelters/beglobis/beglobis.full.json";
import petsDataMazasdraugas from "../../data/shelters/mazasdraugas/mazasdraugas.full.json";
import petsDataPenktakoja from "../../data/shelters/penktakoja/penktakoja.full.json";
import petsDataSosGyvunai from "../../data/shelters/sos-gyvunai/sos-gyvunai.full.json";
import petsDataVggnGrinda from "../../data/shelters/vggn.grinda/vggn.grinda.full.json";
import petsDataLinksmosiospedutes from '../../data/shelters/linksmosiospedutes/linksmosiospedutes.full.json';
import DonateModal from "../Donation/DonateModal";
import { extractMedicalInfo, } from "../../utils/mapPet";
import { Pet } from "../../types/Pet";
import { BankAccount, DonationInfo } from "../../types/DonationInfo";
import LikeButton from "../Like/LikeButton";

const PetDetail: React.FC = () => {
  const { slug } = useParams(); 
  const normalizedSlug = slug?.replace(/\.html$/, "");
  const { user, isAuthenticated } = useAuth();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isBundleOpen, setIsBundleOpen] = useState(false);

  // Helper function to clean image URLs
  const cleanImageUrl = (url: string): string => {
    if (!url) return "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993";
    return url.replace(/^url\((['"]?)(.*?)\1\)$/, '$2').trim();
  };

  // Helper function to extract city from location string
  const extractCity = (location: string): string => {
    if (!location) return "Nežinoma";
    const match = location.match(/[„"](.+?)[""]/);
    return match ? match[1] : location.split(',')[0].trim();
  };

  // Helper function to clean description text
  const cleanDescription = (text: string): string => {
    if (!text) return "";
    let cleaned = text.replace(/\n*(Copy Link|Facebook|WhatsApp|Email)\s*$/gi, '');
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
    cleaned = cleaned.trim();
    return cleaned;
  };

  // Helper function to extract slug from URL
  const extractSlug = (value: string): string => {
    if (!value) return "";
    return value
      .split("/")
      .filter(Boolean)
      .pop()!
      .replace(/\.html$/, "")
      .toLowerCase();
  };

  const needsFromMedicalInfo: Record<string, string> = {
    "Reikia priaugti svorio": "Specialus maistas ir papildomas maitinimas",
    "Rekomenduojami vitaminai": "Vitaminai pagal veterinaro rekomendacijas",
    "Virškinimo problemos": "Lengvai virškinamas maistas",
    "Odos ir kailio problemos": "Speciali kailio / odos priežiūra",
    "Patyręs traumą": "Ramus režimas ir stebėjimas",
  };

  // Helper function to parse age from scraped data
  const parseAge = (ageData: any): string => {
    if (!ageData || ageData.length === 0) return "Nežinoma";
    const data = ageData[1];
    if (!data) return "Nežinoma";

    const years = data[0]?.split(":")?.[1]?.trim();
    const months = data[1]?.split(":")?.[1]?.trim();

    if (years && years !== "0") return `${years} m.`;
    if (months && months !== "0") return `${months} mėn.`;
    return "Jaunas";
  };

  const hasShelterVet = (source?: string) => {
    return ["LĖŠĖ", "Penkta koja", "SOS gyvūnai", "Grinda"].includes(source || "");
  };

  const extractDonationInfo = (animal: any): DonationInfo | undefined => {
    const link = animal.link || "";
  
    // BEGLOBIS
    if (link.includes("beglobis.com")) {
      return {
        organizationName: 'VšĮ "Beglobis"',
        organizationCode: "303194182",
        email: animal.contactPetShelter?.email,
        banks: [
          {
            bank: "Swedbank",
            iban: "LT167300010137615996",
            swift: "HABALT22",
          },
        ],
      };
    }
  
    // LESĖ
    if (link.includes("lese.lt")) {
      return {
        organizationName: 'VšĮ „Lesė"',
        organizationCode: "300709225",
        email: "info@lese.lt",
        banks: [
          {
            bank: "SEB (Vilnius)",
            iban: "LT64 7044 0600 0597 6183",
            swift: "CBVILT2X",
          },
          {
            bank: "SEB (Kaunas)",
            iban: "LT65 7044 0600 0618 6558",
            swift: "CBVILT2X",
          },
        ],
      };
    }
  
    // LINKSMOSIOS PĖDUTĖS (čia jau yra JSON)
    if (animal.shelter?.donationInfo) {
      const di = animal.shelter.donationInfo;
    
      const banks: BankAccount[] = [];
    
      if (di.swedbank) {
        banks.push({
          bank: "Swedbank",
          iban: di.swedbank.accountNumber,
          swift: di.swedbank.swift,
        });
      }
    
      if (di.payseraLink) {
        banks.push({
          bank: "Paysera",
          iban: "LT48 3500 0100 0204 1989",
          swift: "EVIULT21XXX",
        });
      }
    
      return {
        organizationName: 'Gyvūnų globos namai "Linksmosios pėdutės", VšĮ',
        organizationCode: "303039292",
        email: animal.shelter.contactPetShelter?.email,
        phone: di.phone,
        payseraLink: di.payseraLink,
        banks,
      };
    }
  
    return undefined;
  };

  useEffect(() => {
    const loadPet = () => {
      try {
        console.log('=== PetDetail Debug ===');
        console.log('Raw petsData:', petsData, petsDataVggnGrinda, petsDataBeglobis, petsDataLinksmosiospedutes, petsDataMazasdraugas, petsDataPenktakoja, petsDataSosGyvunai);
        
        const data = [
          ...petsData,
          ...petsDataVggnGrinda,
          ...petsDataBeglobis,
          ...petsDataLinksmosiospedutes,
          ...petsDataMazasdraugas,
          ...petsDataPenktakoja,
          ...petsDataSosGyvunai
        ];

        const transformedPets: Pet[] = data.map((animal: any) => {
          const details = animal.details || {};
        
          const image = cleanImageUrl(animal.image);
        
          const slug =
            animal.slug ||
            extractSlug(animal.link) ||
            animal.id ||
            animal.name?.toLowerCase().replace(/\s+/g, "-");
        
          const rawDescription =
            details["Aprašymas"] ||
            animal.description ||
            animal.excerpt ||
            "";
        
          const description = cleanDescription(rawDescription);
          const medicalInfo = extractMedicalInfo(description);
        
          const source: Pet["source"] =
            animal.link?.includes("beglobis") ? "beglobis" :
            animal.link?.includes("lese") ? "lese" :
            animal.link?.includes("penktakoja") ? "penktakoja" :
            animal.link?.includes("linksmosiospedutes") ? "linksmosiospedutes" :
            animal.link?.includes("mazasdraugas") ? "mazasdraugas" :
            animal.link?.includes("grinda") ? "grinda" :
            "lese";
            
          return {
            id: slug,
            slug,
        
            name: animal.name || details["Vardas:"] || "Nežinoma",
        
            image,
            images: Array.isArray(animal.imagesGallery) && animal.imagesGallery.length > 0
              ? animal.imagesGallery.map(cleanImageUrl)
              : [image],
        
            species: details["Rūšis:"] || animal.species || "Nežinoma",
            breed: details["Veislė:"] || animal.breed || "Mišrūnas",
            age: parseAge(animal.age),
            gender: details["Lytis:"] || animal.gender || "Nežinoma",
            size: details["Dydis:"] || animal.size || "Vidutinio dydžio",
            city: extractCity(details["Miestas:"] || animal.city || "Vilnius"),
        
            traits: details["Bruožai:"]
              ? details["Bruožai:"].split(",").map((t: string) => t.trim())
              : Array.isArray(animal.traits)
                ? animal.traits
                : undefined,
        
            description,
            medicalInfo,
        
            sterilized:
              description.toLowerCase().includes("sterilizuot") ||
              details["Sterilizacija:"] === "taip",
        
            vaccinated:
              description.toLowerCase().includes("skiep") ||
              details["Skiepai:"] === "taip",
        
            source,
            donationInfo: extractDonationInfo(animal),
            profileUrl: animal.link || "",
          };
        });

        const foundPet = transformedPets.find(
          (p) => p.slug === normalizedSlug
        );

        console.log('Available slugs:', transformedPets.map(p => p.slug));
        console.log('Found pet:', foundPet);

        setPet(foundPet || null);
        setLoading(false);
      } catch (error) {
        console.error("Error loading pet:", error);
        setLoading(false);
      }
    };

    loadPet();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Kraunama... 🐾
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Gyvūnas nerastas 🐾
      </div>
    );
  }

  const likeItem = {
    id: pet.id,
    name: pet.name,
    image: pet.image,
    species: pet.species,
    city: pet.city,
    slug: pet.slug,
  };
  
  const allImages =
    Array.isArray(pet.images) && pet.images.length > 0
      ? pet.images
      : [pet.image];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
      <nav className="text-sm text-gray-500 mb-8">
        <Link to="/shelter" className="hover:text-purple-600 transition-colors">
          Pradžia
        </Link>{" "}
        / <span className="text-gray-700 font-medium">{pet.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <Gallery images={allImages} alt={pet.name} />
        </div>

        <div className="flex flex-col justify-between pt-6 lg:pt-0 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{pet.name}</h1>
            <p className="text-gray-600 text-lg">
              {pet.breed || "Mišrūnas"} {pet.species && `• ${pet.species}`}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Bendra informacija</h2>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-gray-700">
              <div>
                <span className="font-medium">Prieglauda:</span> {pet.city || "Nežinoma"}
              </div>
              <div>
                <span className="font-medium">Amžius:</span> {pet.age || "Nežinomas"}
              </div>
              <div>
                <span className="font-medium">Lytis:</span> {pet.gender || "Nežinoma"}
              </div>
              <div>
                <span className="font-medium">Dydis:</span> {pet.size || "Vidutinis"}
              </div>
              <div>
                <span className="font-medium">Kailis:</span> Trumpas
              </div>
              <div>
                <span className="font-medium">Spalva:</span> Mišri
              </div>
            </div>
          </div>

          <section className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Sveikata ir priežiūra
            </h2>

            <ul className="space-y-3 text-gray-700 text-sm">
            {pet.vaccinated && <li>✔ Paskiepytas</li>}
            {pet.sterilized && <li>✔ Sterilizuotas / Kastruotas</li>}

              {hasShelterVet(pet.source) && (
                <li>✔ Patikrintas prieglaudos veterinaro</li>
              )}

              <li>
                ✔ Pasirengęs įsivaikinimui iš{" "}
                <strong>{pet.source || "prieglaudos"}</strong>
              </li>
            </ul>

            <div className="mt-5 rounded-xl bg-emerald-50 p-4">
              <p className="text-sm text-emerald-800">
                💡 <strong>Rekomenduojama:</strong> Suplanuokite veterinarinį
                patikrinimą per pirmąsias 7 dienas po įsivaikinimo.
              </p>

              <Link
                to={`/veterinarians?city=${pet.city}`}
                className="inline-block mt-3 text-sm font-semibold text-emerald-700 hover:underline"
              >
                Rasti veterinarą netoliese →
              </Link>
            </div>
          </section>

          <div className="flex flex-col gap-4">
            {/* ĮSIVAIKINIMAS */}
            <button
              onClick={() => setIsInquiryOpen(true)}
              className="w-full py-3 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              Pradėti įsivaikinimo užklausą
            </button>

            {/* PARAMA */}
            <button
              onClick={() => setIsDonateOpen(true)}
              className="w-full py-3 bg-purple-100 text-purple-700 rounded-lg text-lg font-semibold hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            >
              Paremti / Aukoti
            </button>

            {/* PATINKA */}
            <button
              type="button"
              className="
                w-full py-3
                flex items-center justify-center gap-3
                border-2 border-purple-600
                text-purple-600
                rounded-lg
                text-lg font-semibold
                transition
                hover:bg-purple-600 hover:text-white
                focus:outline-none focus:ring-2 focus:ring-purple-500
              "
            >
              <LikeButton item={pet} />
              Pridėti prie mėgstamiausių
            </button>
          </div>
        </div>

        {isDonateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
           <DonateModal
              onClose={() => setIsDonateOpen(false)}
              petName={pet.name}
              donationInfo={pet.donationInfo}
            />
          </div>
        )}
      </div>

      <section className="rounded-2xl bg-white p-6 border text-center mt-16 shadow-sm">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-gray-700">
            💜 Įvaikinti {pet.name} reiškia kantrybę, rūpestį ir saugią vietą augti.
            Mainais už tai jūs gaunate ištikimą draugą visam gyvenimui.
          </p>
        </div>
      </section>

      <section className="mt-14 rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Pasirengimas įvaikinti</h2>

        <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-700">
          <div>
            <h3 className="font-semibold mb-3">Gyvūno profilis</h3>
            <ul className="space-y-2">
              <li>Veislė: {pet.breed}</li>
              <li>Amžius: {pet.age}</li>
              <li>Lytis: {pet.gender}</li>
              <li>Dydis: {pet.size || "Vidutinis"}</li>
              {pet.traits && <li>Bruožai: {pet.traits}</li>}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Sveikatos būklė pagal aprašymą</h3>
            <ul className="space-y-2">
              {pet.medicalInfo.length > 0 ? (
                pet.medicalInfo.map((item: string) => (
                  <li key={item}>✔ {item}</li>
                ))
              ) : (
                <li className="text-gray-500">
                  Informacija apie sveikatą nenurodyta
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Ko reikės:</h3>
            <ul className="space-y-2">
              <li>✔ Maistas ir vandens indai</li>
              <li>✔ Guolis ir saugi erdvė</li>

              {pet.medicalInfo.map((info) =>
                needsFromMedicalInfo[info] ? (
                  <li key={info}>✔ {needsFromMedicalInfo[info]}</li>
                ) : null
              )}

              {!hasShelterVet(pet.source) && (
                <li className="text-amber-700">
                  ⚠ Rekomenduojama papildoma veterinarinė apžiūra
                </li>
              )}
            </ul>

            <Link
              to="/shop?category=starter-kit"
              className="inline-block mt-3 font-semibold text-purple-600 hover:underline"
            >
              Žiūrėti starterių rinkinius →
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-16 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-sm p-8 lg:p-12 space-y-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Labas, aš {pet.name}!</h2>
          <p className="text-gray-600 text-lg">
            Asmenybė ir gyvenimas su {pet.name}
          </p>
        </div>

        <div className="max-w-3xl space-y-4 text-gray-700 leading-relaxed">
          {pet.description ? (
            <div className="whitespace-pre-line">{pet.description}</div>
          ) : (
            <>
              <p>
                {pet.name} yra šiltas, mylintis kompanionas, kuris mėgsta žmonių bendravimą
                ir stabilią kasdienę rutiną. {pet.gender === "Patelė" ? "Ji" : "Jis"} klesti
                aplinkose, kur kantrybė, gerumas ir švelnumas yra kasdienis dalykėlis.
              </p>

              <p>
                Kaip ir daugelis prieglaudos gyvūnų, {pet.name} yra pasiruošęs naujam gyvenimo skyriui.
                Su šiek tiek laiko ir nuoseklumo, {pet.gender === "Patelė" ? "ji" : "jis"}
                greitai taps ištikimu ir mylinčiu jūsų šeimos nariu.
              </p>
            </>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-emerald-50 p-6">
            <h3 className="font-semibold text-emerald-900 mb-3">
              🏡 {pet.name} jausis patogiai namuose su:
            </h3>
            <ul className="space-y-2 text-sm text-emerald-800">
              <li>✔ Kitais gyvūnais ar ramiais kompanionais</li>
              <li>✔ Nuspėjama kasdiene rutina</li>
              <li>✔ Laiku susiejimui ir žaidimams</li>
              {pet.traits && <li>✔ Ypatingas dėmesys: {pet.traits}</li>}
            </ul>
          </div>

          <div className="rounded-2xl bg-rose-50 p-6">
            <h3 className="font-semibold text-rose-900 mb-3">
              🚫 Gali būti neidealu namuose su:
            </h3>
            <ul className="space-y-2 text-sm text-rose-800">
              <li>• Labai mažais vaikais</li>
              <li>• Triukšminga ar labai chaotiška aplinka</li>
              <li>• Ilgais laikotarpiais vienatvėje</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50 via-indigo-50 to-white border border-purple-200 p-8 lg:p-12">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />

        <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div className="space-y-5 max-w-2xl">
            <span className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
              Rekomenduojama įsivaikinimo ekspertų
            </span>

            <h3 className="text-3xl font-bold text-gray-900 leading-tight">
              Palengvinkite {pet.name} įsivaikinimą
            </h3>

            <p className="text-gray-700 text-lg">
              Pirmosios savaitės naujuose namuose yra pačios svarbiausios. Daugelis įtėvių pasirenka
              priežiūros paketą, kad jų augintinis jaustųsi saugus, pasitikintis ir palaikomas nuo pat pirmos dienos.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 text-lg">✔</span>
                <span>Pradinis veterinarinis patikrinimas ir sveikatos konsultacija</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 text-lg">✔</span>
                <span>Vienas švelnaus dresavimo arba elgesio palaikymo užsiėmimas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 text-lg">✔</span>
                <span>Būtinieji starterio daiktai patogumui ir rutinai</span>
              </li>
            </ul>

            <p className="text-sm text-gray-600">
              💡 Visos paslaugos yra neprivalomas. Įsivaikinimas visada įmanomas be papildomų paslaugų.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full sm:w-auto">
            <button
              onClick={() => setIsBundleOpen(true)}
              className="px-10 py-4 rounded-xl bg-purple-600 text-white font-semibold text-lg hover:bg-purple-700 shadow-lg transition"
            >
              Įsivaikinti su priežiūros paketu
            </button>

            {isBundleOpen && (
              <AdoptBundleModal
                petId={typeof pet.id === 'number' ? pet.id : parseInt(pet.id as string) || 0}
                petName={pet.name}
                onClose={() => setIsBundleOpen(false)}
              />
            )}

            <Link
              to="/training"
              className="px-10 py-3 rounded-xl border-2 border-purple-600 text-purple-600 font-semibold hover:bg-purple-600 hover:text-white transition text-center"
            >
              Peržiūrėti dresavimo paslaugas
            </Link>

            <button className="text-sm text-gray-500 underline">
              Tęsti tik su įsivaikinimu
            </button>
          </div>
        </div>
      </section>

      <section className="mt-14 bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Rekomenduojama priežiūra {pet.name}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-xl p-5 hover:shadow-md transition">
            <div className="text-3xl mb-3">🏥</div>
            <h3 className="font-semibold mb-2">Veterinarinis patikrinimas</h3>
            <p className="text-sm text-gray-600 mb-4">
              Pirmasis sveikatos patikrinimas per 7 dienas po įsivaikinimo.
            </p>
            <Link
              to={`/veterinarians?city=${pet.city}`}
              className="text-sm font-semibold text-purple-600 hover:underline"
            >
              Rasti klinkas netoliese →
            </Link>
          </div>

          <div className="border rounded-xl p-5 hover:shadow-md transition">
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="font-semibold mb-2">Dresavimo užsiėmimai</h3>
            <p className="text-sm text-gray-600 mb-4">
              Padėkite {pet.name} greičiau prisitaikyti prie naujų namų.
            </p>
            <Link
              to="/training"
              className="text-sm font-semibold text-purple-600 hover:underline"
            >
              Peržiūrėti dresavimo programas →
            </Link>
          </div>

          <div className="border rounded-xl p-5 hover:shadow-md transition">
            <div className="text-3xl mb-3">🛒</div>
            <h3 className="font-semibold mb-2">Starterio būtinybės</h3>
            <p className="text-sm text-gray-600 mb-4">
              Guolis, maistas, žaislai ir kasdienės priežiūros būtinybės.
            </p>
            <Link
              to="/shop?category=starter-kit"
              className="text-sm font-semibold text-purple-600 hover:underline"
            >
              Žiūrėti starterio rinkinius →
            </Link>
          </div>
        </div>
      </section>

      <AdoptionInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        pet={{
          id: typeof pet.id === 'number' ? pet.id : parseInt(pet.id as string) || 0,
          name: pet.name,
          breed: pet.breed,
          age: pet.age,
          image: pet.image,
          city: pet.city,
          shelterId: "lese-shelter",
          shelterName: pet.source || "LĖŠĖ Prieglauda",
          shelterEmail: "info@lese.lt",
          shelterPhone: "+370 5 000 0000",
        }}
        isLoggedIn={isAuthenticated}
        userEmail={user?.email}
      />
    </div>
  );
};

export default PetDetail;