import React from "react";
import { Link } from "react-router-dom";
import medicationsBanner from "../../../assets/medications.jpg";
import allergies from "../../../assets/allergies.svg";
import anxiety from "../../../assets/anxiety.svg";
import Diabetes from "../../../assets/diabet.svg";
import Diarrhea from "../../../assets/diarrhea.svg";
import Ticks from "../../../assets/ticks.svg";
import Heartworms from "../../../assets/heartworm.svg";
import Infections from "../../../assets/infections.svg";
import Vomiting from "../../../assets/vomiting.svg";
import Pain from "../../../assets/pain.svg";
import Seizures from "../../../assets/seizures.svg";
import Stomach from "../../../assets/stomach.svg";
import Donation from "../../Donation/Donation";
import donationImage from "../../../assets/donationImage.png";

interface MedicationCategory {
  image: string;
  title: string;
  slug: string;
}

const categories: MedicationCategory[] = [
  { image: allergies, title: "Allergies & Itching", slug: "allergies-itching" },
  { image: anxiety, title: "Anxiety & Sedation", slug: "anxiety-sedation" },
  { image: Diabetes, title: "Diabetes", slug: "diabetes" },
  { image: Diarrhea, title: "Diarrhea", slug: "diarrhea" },
  { image: Ticks, title: "Fleas & Ticks", slug: "fleas-ticks" },
  { image: Heartworms, title: "Heartworms", slug: "heartworms" },
  { image: Infections, title: "Infections", slug: "infections" },
  { image: Vomiting, title: "Nausea & Vomiting", slug: "nausea-vomiting" },
  { image: Pain, title: "Pain & Arthritis", slug: "pain-arthritis" },
  { image: Seizures, title: "Seizures", slug: "seizures" },
  { image: Stomach, title: "Stomach Ulcers", slug: "stomach-ulcers" },
];

const Medications: React.FC = () => {
  return (
    <main className="pt-140 overflow-hidden">
      {/* HERO */}
      <section className="relative h-[540px] flex items-center justify-center text-center overflow-visible">
        <img
          src={medicationsBanner}
          alt="Common Veterinary Medications"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-4xl px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Common Veterinary Medications
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-10">
            Explore pet medications by category and learn everything you need for your pet's health.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[6px] bg-purple-800" />
      </section>

      {/* CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <header className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">Medication Categories</h2>
          <p className="mt-2 text-gray-600">
            Click a category to read detailed posts, guides, and SEO-rich content.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/medications/${category.slug}`}
              className="flex items-center p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition"
            >
              <img src={category.image} alt={category.title} className="w-16 h-16 rounded-full mr-4" />
              <h3 className="text-lg font-bold text-gray-800">{category.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* DONATION CTA */}
      <Donation
        image={donationImage}
        title="Help Us Make a Difference"
        text="Your donation helps us care for pets in need."
        cta="Donate Now"
      />
    </main>
  );
};

export default Medications;