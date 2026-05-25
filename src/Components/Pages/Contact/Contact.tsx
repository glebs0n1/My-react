import React, { useState } from "react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setSubmitStatus("success");
      setIsSubmitting(false);
      // Reset form
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Page Title */}
        <div className="mb-12">
          <h2 className="text-[#6d0ef1] text-lg font-semibold mb-2">Kontaktai</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Column - Contact Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Susisiekime. Mielai atsakysime į visus klausimus.
            </h1>

            <div className="space-y-6 text-gray-700 mb-10">
              <p>
                Jeigu turite klausimų dėl paslaugų teikėjų, dresūros, 
                augintinių paieškos ar bendradarbiavimo – drąsiai 
                kreipkitės. „PetLietuva" komanda visada pasiruošusi padėti ir 
                atsakyti į visus jūsų klausimus. Stengiamės atsakyti per 24 
                valandas, o esant skubiam poreikiui – kuo greičiau.
              </p>

              <p>
                Jei norite daugiau sužinoti apie mūsų veiklą, kviečiame 
                apsilankyti puslapyje{" "}
                <a href="/about" className="text-[#f99e1f] font-semibold hover:underline">
                  Apie mus
                </a>
                , o visų teikiamų paslaugų 
                sąrašą rasite skiltyje{" "}
                <a href="/services" className="text-[#f99e1f] font-semibold hover:underline">
                  Paslaugų teikėjai
                </a>
                . Tai padės greičiau 
                suprasti, kokios paslaugos jums tinkamiausios.
              </p>

              <p>
                Taip pat kviečiame sekti mus socialiniuose tinkluose – čia 
                dalinamės naujienomis, patarimais ir naudinga informacija 
                gyvūnų augintojams. Mūsų{" "}
                <a 
                  href="https://www.facebook.com/petlietuva" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#f99e1f] font-semibold hover:underline"
                >
                  Facebook
                </a>
                ,{" "}
                <a 
                  href="https://www.instagram.com/petlietuva" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#f99e1f] font-semibold hover:underline"
                >
                  Instagram
                </a>
                {" "}paskyros.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Mūsų el. Paštas</h3>
                <a 
                  href="mailto:info@petlietuva.lt" 
                  className="text-gray-700 hover:text-[#6d0ef1] transition"
                >
                  info@petlietuva.lt
                </a>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Mūsų tel numeris</h3>
                <a 
                  href="tel:+37063653162" 
                  className="text-gray-700 hover:text-[#6d0ef1] transition"
                >
                  +370 (636) 53 162
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 lg:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Užpildykite anketą
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Jūsų vardas
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6d0ef1] focus:border-transparent transition"
                  placeholder="Vardas Pavardė"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Jūsų el. paštas
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6d0ef1] focus:border-transparent transition"
                  placeholder="vardas@email.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Jūsų žinutė
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6d0ef1] focus:border-transparent transition resize-none"
                  placeholder="Parašykite savo žinutę..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#6d0ef1] text-white rounded-xl font-bold text-lg hover:bg-[#5a0bc9] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Siunčiama..." : "Siųsti užklausą"}
              </button>

              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-green-800 font-semibold text-center">
                    ✓ Žinutė sėkmingai išsiųsta! Atsakysime kuo greičiau.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;