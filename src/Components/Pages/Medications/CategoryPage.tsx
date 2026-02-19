import React, { useState, useEffect } from "react";
import { ChevronRight, Search, Calendar, Tag, ArrowRight } from "lucide-react";

// TypeScript interfaces
interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  keywords: string[];
  lastUpdated: string;
}

interface CategoryContent {
  title: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  posts: Post[];
}

type CategoryData = {
  [key: string]: CategoryContent;
};

// Comprehensive category data with full SEO content for ALL 11 categories
const categoryData: CategoryData = {
  "allergies-itching": {
    title: "Allergies & Itching in Pets",
    metaDescription: "Comprehensive guide to pet allergies, itching, and skin conditions. Learn about medications, treatments, and prevention for dogs and cats.",
    keywords: ["pet allergies", "dog itching", "cat allergies", "allergy medication", "skin conditions"],
    intro: "Pet allergies affect millions of dogs and cats worldwide, causing discomfort through itching, skin irritation, and chronic conditions. Understanding the causes, symptoms, and treatment options is essential for every pet owner.",
    posts: [
      {
        slug: "dog-allergy-medications",
        title: "Top Medications for Dog Allergies: Complete Guide 2026",
        excerpt: "Discover the most effective allergy medications for dogs, including Apoquel, Cytopoint, and natural alternatives.",
        content: `Dogs commonly suffer from allergies caused by environmental triggers (pollen, dust mites), food ingredients (chicken, beef, grains), or flea bites. These allergies manifest as intense itching, red skin, ear infections, and hot spots.

**Top Medications for Dog Allergies:**

**Apoquel (Oclacitinib):** Fast-acting oral medication that provides relief within 4 hours. Works by targeting specific enzymes that cause itching. Recommended for dogs over 12 months old. Typical dosage: 0.4-0.6 mg/kg twice daily initially, then once daily for maintenance.

**Cytopoint (Lokivetmab):** Injectable monoclonal antibody that neutralizes the itch signal. Effects last 4-8 weeks per injection. Excellent safety profile with minimal side effects. Ideal for dogs who can't take daily pills.

**Antihistamines:** Benadryl (diphenhydramine), Zyrtec (cetirizine), and Claritin (loratinib) can help mild allergies. Dosage varies by weight; consult your veterinarian before use.

**Corticosteroids:** Prednisone or dexamethasone for severe flare-ups. Should be used short-term due to potential side effects like increased thirst, appetite, and immune suppression.

**Medicated Shampoos:** Weekly bathing with chlorhexidine or oatmeal-based shampoos removes allergens from the coat and soothes inflamed skin.

**Natural Supplements:** Omega-3 fatty acids, probiotics, and quercetin may support skin health and reduce inflammation over time.`,
        keywords: ["dog allergy medication", "Apoquel for dogs", "Cytopoint injection", "dog itching relief"],
        lastUpdated: "2026-01-15"
      },
      {
        slug: "cat-allergy-treatment",
        title: "Cat Allergies: Symptoms, Diagnosis & Treatment Options",
        excerpt: "Learn how to identify and treat allergies in cats, from food sensitivities to environmental triggers.",
        content: `Cats develop allergies to environmental allergens (pollen, mold, dust), food proteins, or flea saliva. Unlike dogs, cats often show allergies through excessive grooming, miliary dermatitis, and eosinophilic granulomas.

**Common Cat Allergy Symptoms:**
- Over-grooming leading to hair loss
- Scabs on neck, back, and tail base
- Red, inflamed skin lesions
- Chronic ear infections
- Respiratory issues (rare but possible)

**Treatment Options for Cat Allergies:**

**Corticosteroids:** Prednisolone is commonly prescribed for feline allergies. Cats tolerate steroids better than dogs. Typical course: 1-2 mg/kg daily, then tapered to lowest effective dose.

**Dietary Elimination Trials:** Novel protein diets (duck, venison, rabbit) or hydrolyzed protein formulas for 8-12 weeks to identify food allergies. Must be strictly maintained with no treats or table food.

**Antihistamines:** Chlorpheniramine may help some cats, though response rates are lower than in dogs.

**Cyclosporine (Atopica):** Immunosuppressant medication effective for severe allergic dermatitis. Requires regular monitoring of kidney and liver function.

**Environmental Control:** HEPA air filters, dust-free litters, frequent cleaning to reduce allergen exposure.

**Flea Prevention:** Even indoor cats need year-round flea prevention, as a single flea bite can trigger severe allergic reactions in sensitive cats.`,
        keywords: ["cat allergies", "feline dermatitis", "cat itching treatment", "cat food allergies"],
        lastUpdated: "2026-01-10"
      },
      {
        slug: "preventing-pet-allergies",
        title: "How to Prevent Pet Allergies: Essential Tips for Dog & Cat Owners",
        excerpt: "Prevention strategies to minimize allergic reactions and keep your pet's skin healthy year-round.",
        content: `Preventing allergies in pets requires a multi-faceted approach combining environmental management, nutrition, grooming, and parasite control.

**Essential Prevention Strategies:**

**Regular Grooming:** Weekly bathing removes allergens from fur before they can be absorbed through skin. Use hypoallergenic, fragrance-free shampoos. Brush daily to remove loose fur and dander.

**Year-Round Flea Prevention:** Apply topical, oral, or collar-based flea preventatives monthly. Even one flea can cause severe allergic dermatitis in sensitive pets. Treat all pets in the household.

**High-Quality Nutrition:** Feed premium diets with limited ingredients and novel proteins if food allergies are suspected. Omega-3 fatty acids support skin barrier function. Avoid common allergens like corn, wheat, and soy.

**Environmental Allergen Reduction:** Wash pet bedding weekly in hot water. Use HEPA filters in your home. Keep pets off upholstered furniture. Wipe paws after outdoor walks to remove pollen.

**Humidity Control:** Maintain 30-50% humidity to prevent dry, itchy skin. Use humidifiers in winter and dehumidifiers in summer.

**Probiotic Supplementation:** Gut health influences immune function. Daily probiotics may reduce allergic responses over time.

**Early Intervention:** Address skin issues immediately before they become chronic. Minor itching can escalate to secondary bacterial or yeast infections requiring intensive treatment.

**Regular Veterinary Check-ups:** Annual exams help identify early signs of allergies. Your vet can recommend preventative strategies tailored to your pet's specific risk factors.`,
        keywords: ["prevent pet allergies", "pet allergy prevention", "dog skin care", "cat grooming"],
        lastUpdated: "2026-01-12"
      }
    ]
  },
  "anxiety-sedation": {
    title: "Anxiety & Sedation Medications for Pets",
    metaDescription: "Expert guide to managing pet anxiety, stress, and behavioral issues with medications, natural remedies, and training techniques.",
    keywords: ["pet anxiety", "dog anxiety medication", "cat sedation", "behavioral medications", "stress relief"],
    intro: "Anxiety in pets can manifest as destructive behavior, excessive vocalization, aggression, or fear. Modern veterinary medicine offers various pharmaceutical and behavioral interventions to help anxious pets live calmer, happier lives.",
    posts: [
      {
        slug: "dog-anxiety-medications",
        title: "Best Anxiety Medications for Dogs: From Mild to Severe Cases",
        excerpt: "Complete overview of prescription and over-the-counter anxiety medications for dogs with dosing guidelines.",
        content: `Canine anxiety stems from separation, noise phobias, generalized anxiety disorder, or past trauma. Treatment combines behavior modification with appropriate medication.

**Prescription Anxiety Medications:**

**Trazodone:** Fast-acting sedative ideal for situational anxiety (vet visits, grooming, thunderstorms). Dosage: 2-5 mg/kg, given 1-2 hours before stressful event. Effects last 4-6 hours. Minimal side effects; may cause mild drowsiness.

**Alprazolam (Xanax):** Benzodiazepine for acute panic episodes. Rapid onset (30-60 minutes). Use with caution; can cause paradoxical excitement in some dogs. Dosage: 0.01-0.05 mg/kg as needed.

**Fluoxetine (Prozac):** SSRI for chronic anxiety and separation distress. Requires 4-6 weeks to reach full effectiveness. Daily dosing: 1-2 mg/kg. Long-term use safe under veterinary supervision.

**Clomicalm (Clomipramine):** Tricyclic antidepressant specifically FDA-approved for separation anxiety. Takes 2-4 weeks to work fully. Dosage: 1-3 mg/kg daily.

**Sileo:** FDA-approved for noise aversion (fireworks, thunder). Oromucosal gel absorbed through gums. Precise dosing based on body weight using calibrated syringe.

**Natural Supplements:** L-theanine, melatonin, and CBD oil may help mild anxiety. Consult your vet about appropriate products and dosing.

**Behavioral Modification:** Medication works best when combined with desensitization, counter-conditioning, and environmental enrichment.`,
        keywords: ["dog anxiety medication", "trazodone for dogs", "separation anxiety dogs", "dog calming medication"],
        lastUpdated: "2026-01-14"
      },
      {
        slug: "cat-anxiety-solutions",
        title: "Managing Cat Anxiety: Medications and Behavioral Solutions",
        excerpt: "Effective treatments for stressed and anxious cats, including pharmaceuticals and environmental modifications.",
        content: `Feline anxiety often manifests differently than canine anxiety, with hiding, inappropriate urination, excessive grooming, and aggression being common signs.

**Cat Anxiety Medications:**

**Gabapentin:** Versatile medication for situational anxiety (vet visits, travel, grooming). Dosage: 50-100 mg per cat, given 2 hours before event. Safe and effective with minimal side effects.

**Fluoxetine:** Long-term management of generalized anxiety and compulsive behaviors. Requires 4-6 weeks to take effect. Dosage: 0.5-1.5 mg/kg daily.

**Feliway (Pheromone Therapy):** Synthetic feline facial pheromone that creates calming environment. Available as diffusers, sprays, and collars. Non-pharmaceutical option for mild anxiety.

**Buspirone:** Anti-anxiety medication for fear-based behaviors and inter-cat aggression. Takes 2-4 weeks for full effect. Dosage: 0.5-1 mg/kg twice daily.

**Environmental Enrichment:** Provide vertical territory (cat trees), hiding spots, interactive toys, and separate resources for multi-cat households. Reduce stressors and maintain consistent routines.`,
        keywords: ["cat anxiety medication", "gabapentin for cats", "stressed cat treatment", "feline behavior"],
        lastUpdated: "2026-01-13"
      }
    ]
  },
  "diabetes": {
    title: "Diabetes Management in Pets",
    metaDescription: "Complete guide to managing diabetes in dogs and cats, including insulin therapy, diet, monitoring, and long-term care strategies.",
    keywords: ["pet diabetes", "insulin for dogs", "diabetic cat care", "blood glucose monitoring", "diabetes diet"],
    intro: "Diabetes mellitus is a common endocrine disorder in pets, requiring lifelong management through insulin therapy, dietary control, and regular monitoring. With proper care, diabetic pets can live full, healthy lives.",
    posts: [
      {
        slug: "insulin-therapy-dogs",
        title: "Insulin Therapy for Dogs: Types, Dosing, and Administration Guide",
        excerpt: "Everything you need to know about insulin treatment for diabetic dogs, from choosing the right type to proper injection techniques.",
        content: `Canine diabetes typically requires twice-daily insulin injections combined with consistent feeding schedules and regular monitoring.

**Types of Insulin for Dogs:**

**Vetsulin (Porcine Insulin Zinc):** FDA-approved specifically for dogs. Intermediate-acting insulin providing 12-24 hour coverage. Most commonly prescribed. Typical starting dose: 0.25-0.5 units/kg twice daily.

**Caninsulin:** Porcine lente insulin similar to Vetsulin. Well-established safety profile. Available internationally.

**NPH (Humulin N, Novolin N):** Human intermediate-acting insulin. Cost-effective alternative. Duration 8-12 hours in dogs. Requires more frequent monitoring initially.

**Detemir (Levemir):** Long-acting human insulin gaining popularity. Once or twice daily dosing. More predictable glucose control in some dogs.

**Insulin Administration:**
1. Store insulin in refrigerator, never freeze
2. Roll gently to mix, never shake vigorously
3. Use U-100 or U-40 syringes as appropriate
4. Inject subcutaneously in scruff or flank area
5. Rotate injection sites to prevent tissue damage
6. Always feed before injecting to prevent hypoglycemia

**Monitoring:** Home glucose testing with veterinary glucometer 2-3 times weekly. Fructosamine testing every 3-4 months at vet clinic for long-term control assessment.`,
        keywords: ["insulin for dogs", "Vetsulin dosage", "diabetic dog care", "canine diabetes treatment"],
        lastUpdated: "2026-01-16"
      },
      {
        slug: "diabetic-cat-management",
        title: "Managing Feline Diabetes: Insulin, Diet, and Remission Strategies",
        excerpt: "Comprehensive care plan for diabetic cats, including potential for remission with proper management.",
        content: `Feline diabetes differs from canine diabetes in that cats can sometimes achieve remission with aggressive early treatment and dietary management.

**Feline Diabetes Medications:**

**Glargine (Lantus):** Long-acting insulin, gold standard for cats. Once or twice daily dosing. Highest remission rates. Starting dose: 0.25-0.5 units/kg twice daily.

**PZI (ProZinc):** FDA-approved for cats. Intermediate to long-acting. Good alternative to glargine. Duration 10-16 hours.

**Detemir (Levemir):** Alternative long-acting option. Similar efficacy to glargine with potentially lower hypoglycemia risk.

**Diet for Diabetic Cats:**
High-protein, low-carbohydrate diet is essential. Canned food preferred over dry. Examples: Hill's m/d, Purina DM, Royal Canin Diabetic. Consistent meal timing with insulin injections.

**Remission Protocol:**
- Aggressive early insulin therapy
- Strict low-carb diet
- Frequent glucose monitoring
- Insulin dose adjustments to maintain tight control
- 30-50% of cats achieve remission within 3-6 months

**Warning Signs of Hypoglycemia:**
Lethargy, weakness, wobbliness, seizures. Keep corn syrup or honey available. Rub on gums if symptoms occur and contact vet immediately.`,
        keywords: ["diabetic cat insulin", "Lantus for cats", "feline diabetes remission", "low-carb cat food"],
        lastUpdated: "2026-01-14"
      }
    ]
  },
  "diarrhea": {
    title: "Diarrhea Treatment and Prevention in Pets",
    metaDescription: "Learn about causes, treatments, and prevention of diarrhea in dogs and cats, including medications, dietary management, and when to seek veterinary care.",
    keywords: ["pet diarrhea", "dog diarrhea treatment", "cat diarrhea medication", "gastrointestinal health", "bland diet"],
    intro: "Diarrhea is one of the most common reasons pet owners seek veterinary care. While often self-limiting, persistent or severe diarrhea can indicate serious underlying conditions requiring professional treatment.",
    posts: [
      {
        slug: "dog-diarrhea-medications",
        title: "Treating Dog Diarrhea: Medications, Diet, and Home Care",
        excerpt: "Effective treatments for acute and chronic diarrhea in dogs, including over-the-counter and prescription options.",
        content: `Canine diarrhea can result from dietary indiscretion, parasites, infections, inflammatory bowel disease, or systemic illness. Treatment depends on severity and underlying cause.

**Medications for Dog Diarrhea:**

**Metronidazole:** Antibiotic with anti-inflammatory properties. Effective for acute diarrhea and giardia. Dosage: 10-15 mg/kg twice daily for 5-7 days. Can cause bitter taste; hide in food.

**Tylosin:** Antibiotic particularly effective for chronic diarrhea and small intestinal bacterial overgrowth. Dosage: 10-20 mg/kg daily. Well-tolerated long-term.

**Sulfasalazine:** Anti-inflammatory for inflammatory bowel disease and colitis. Dosage: 20-40 mg/kg twice daily. May cause dry eye as side effect.

**Probiotics:** FortiFlora, Proviable, or prescription strength probiotics support beneficial gut bacteria. Use during and after antibiotic treatment.

**Kaolin/Pectin (Kao-Pectate):** Coats intestinal lining and firms stool. Over-the-counter option for mild diarrhea. Dosage: 1-2 ml/kg every 2-6 hours.

**Bland Diet Protocol:**
Fast for 12-24 hours (water only). Then feed boiled chicken and white rice (1:3 ratio) in small frequent meals. Gradually transition back to regular diet over 3-5 days.

**When to See a Vet:**
Blood in stool, vomiting, lethargy, dehydration signs, puppies with diarrhea, symptoms lasting >24-48 hours.`,
        keywords: ["dog diarrhea medicine", "metronidazole for dogs", "bland diet for dogs", "puppy diarrhea treatment"],
        lastUpdated: "2026-01-15"
      }
    ]
  },
  "fleas-ticks": {
    title: "Flea & Tick Prevention for Pets",
    metaDescription: "Comprehensive guide to flea and tick prevention and treatment for dogs and cats, including topical, oral, and collar options.",
    keywords: ["flea prevention", "tick control", "flea medication for dogs", "tick prevention for cats", "parasite control"],
    intro: "Fleas and ticks pose serious health risks to pets, transmitting diseases and causing allergic reactions. Year-round prevention is essential for all dogs and cats, even those living primarily indoors.",
    posts: [
      {
        slug: "flea-tick-prevention-dogs",
        title: "Best Flea and Tick Prevention for Dogs: Complete Product Comparison 2026",
        excerpt: "Compare the most effective flea and tick preventatives for dogs, from topicals to oral medications and collars.",
        content: `Modern flea and tick prevention offers multiple options, each with specific advantages. Choose based on your dog's lifestyle, health status, and your preferences.

**Oral Flea/Tick Medications:**

**Simparica Trio:** Monthly chewable providing flea, tick, heartworm, and intestinal parasite protection. Starts killing fleas in 3 hours, ticks in 8 hours. Contains sarolaner, moxidectin, and pyrantel. Safe for puppies 8 weeks and older, over 2.8 lbs.

**NexGard:** Monthly chewable killing fleas and ticks. Flavored tablet most dogs accept readily. Afoxolaner-based. Kills fleas before they can lay eggs. Safe for puppies 8 weeks and older.

**Bravecto:** Long-lasting protection (12 weeks for fleas, 8-12 weeks for ticks depending on species). Fluralaner-based. Less frequent dosing means better compliance.

**Topical Medications:**

**Revolution Plus:** Monthly topical preventing fleas, ticks, heartworm, ear mites, and roundworms. Apply between shoulder blades. Water-resistant after 2 hours. Selamectin and sarolaner combination.

**Advantage Multi:** Imidacloprid and moxidectin for fleas, heartworm, and intestinal parasites. No tick coverage. Good for dogs with tick-borne disease sensitivity.

**Collars:**

**Seresto:** 8-month flea and tick prevention in collar form. Imidacloprid and flumethrin. Convenient for dogs who won't take pills. Water-resistant.

**All products should be used year-round for maximum effectiveness. Consult your veterinarian about the best option for your dog's specific needs.**`,
        keywords: ["Simparica Trio", "NexGard for dogs", "Bravecto", "Revolution Plus dogs", "flea prevention"],
        lastUpdated: "2026-01-17"
      }
    ]
  },
  "heartworms": {
    title: "Heartworm Prevention and Treatment",
    metaDescription: "Essential information about heartworm disease in pets, including prevention medications, testing protocols, and treatment options.",
    keywords: ["heartworm prevention", "heartworm treatment", "heartworm test", "dog heartworm medication", "mosquito-borne diseases"],
    intro: "Heartworm disease is a serious and potentially fatal parasitic infection transmitted by mosquitoes. Prevention is far safer and more cost-effective than treatment, making year-round prevention essential for all dogs and cats.",
    posts: [
      {
        slug: "heartworm-prevention-dogs",
        title: "Heartworm Prevention for Dogs: Medications, Testing, and Best Practices",
        excerpt: "Complete guide to protecting your dog from heartworm disease with preventative medications and regular testing.",
        content: `Heartworm prevention is simple, safe, and essential. Adult heartworms living in the heart and lungs cause progressive damage that can be life-threatening if untreated.

**Monthly Heartworm Preventatives:**

**Heartgard Plus:** Ivermectin and pyrantel combination. Chewable tablet. Prevents heartworm and treats roundworms and hookworms. Safe for collies and herding breeds at preventative doses. Give monthly, year-round.

**Interceptor Plus:** Milbemycin oxime and praziquantel. Prevents heartworm, treats roundworms, hookworms, whipworms, and tapeworms. Broad-spectrum protection.

**Tri-Heart Plus:** Generic equivalent to Heartgard Plus. Same active ingredients at lower cost. Effective and FDA-approved.

**Simparica Trio:** Monthly chewable providing heartworm prevention plus flea, tick, and intestinal parasite protection. All-in-one convenience.

**ProHeart 12:** Injectable heartworm prevention lasting full year. Moxidectin-based. Administered by veterinarian. Excellent for owners who forget monthly doses.

**Testing Protocol:**
Puppies: Begin prevention at 8 weeks. Test at 7 months and annually thereafter.
Adult dogs: Test before starting prevention if lapsed >2 months. Then annually even with consistent prevention to detect rare breakthrough infections.

**Why Year-Round Prevention:**
Even in cold climates, mosquitoes can survive indoors. Missing even one dose can leave dogs vulnerable. Consistent prevention is safer than treatment.`,
        keywords: ["Heartgard Plus", "heartworm prevention", "ProHeart injection", "heartworm test dogs"],
        lastUpdated: "2026-01-16"
      }
    ]
  },
  "infections": {
    title: "Infections and Antibiotics for Pets",
    metaDescription: "Guide to common bacterial, viral, and fungal infections in pets, including antibiotic treatments, resistance concerns, and proper medication use.",
    keywords: ["pet antibiotics", "bacterial infections", "dog infection treatment", "cat antibiotics", "antibiotic resistance"],
    intro: "Infections in pets require prompt diagnosis and appropriate treatment. Understanding when antibiotics are necessary, which ones to use, and how to prevent resistance is crucial for responsible pet ownership.",
    posts: [
      {
        slug: "antibiotics-for-dogs",
        title: "Common Antibiotics for Dogs: Uses, Dosing, and Side Effects",
        excerpt: "Comprehensive guide to antibiotics prescribed for dogs, including proper usage and what to expect during treatment.",
        content: `Bacterial infections in dogs range from skin infections to urinary tract infections, respiratory infections, and more serious systemic diseases. Appropriate antibiotic selection depends on infection type and location.

**Commonly Prescribed Dog Antibiotics:**

**Amoxicillin/Clavulanic Acid (Clavamox):** Broad-spectrum antibiotic for skin, urinary, respiratory infections. Dosage: 12.5-25 mg/kg twice daily. Generally well-tolerated. Can cause soft stool.

**Cephalexin:** First-generation cephalosporin effective for skin and soft tissue infections. Dosage: 15-30 mg/kg twice to three times daily. Safe for most dogs. Take with food if stomach upset occurs.

**Enrofloxacin (Baytril):** Fluoroquinolone for resistant bacteria, urinary, respiratory, skin infections. Dosage: 5-20 mg/kg once daily. Not for puppies due to cartilage damage risk. Can cause retinal damage in cats at high doses.

**Doxycycline:** Tetracycline antibiotic for tick-borne diseases (Lyme, Ehrlichia), respiratory infections, periodontal disease. Dosage: 5-10 mg/kg once or twice daily. Give with food to prevent esophageal irritation.

**Metronidazole:** Effective against anaerobic bacteria and certain protozoans (Giardia). Used for gastrointestinal infections, dental disease. Dosage: 10-15 mg/kg twice daily.

**Important Usage Guidelines:**
- Complete full course even if symptoms improve
- Give with food to minimize stomach upset
- Watch for allergic reactions (facial swelling, hives, difficulty breathing)
- Probiotics can help prevent antibiotic-associated diarrhea
- Never share antibiotics between pets or use leftover antibiotics without vet approval

**Antibiotic Resistance:**
Improper use contributes to resistance. Always follow veterinarian instructions precisely. Don't stop early or skip doses.`,
        keywords: ["Clavamox for dogs", "cephalexin dosage", "Baytril dogs", "dog antibiotics", "antibiotic resistance"],
        lastUpdated: "2026-01-15"
      }
    ]
  },
  "nausea-vomiting": {
    title: "Nausea & Vomiting Treatment for Pets",
    metaDescription: "Learn about causes and treatments for nausea and vomiting in dogs and cats, including anti-nausea medications and dietary management.",
    keywords: ["pet vomiting", "anti-nausea medication", "dog nausea treatment", "cat vomiting", "Cerenia"],
    intro: "Vomiting in pets can indicate minor dietary indiscretion or serious medical conditions. Understanding when to treat at home versus seeking veterinary care can be critical for your pet's health.",
    posts: [
      {
        slug: "anti-nausea-medications-pets",
        title: "Anti-Nausea Medications for Dogs and Cats: Cerenia, Zofran, and More",
        excerpt: "Effective medications to stop vomiting and relieve nausea in pets, with dosing information and usage guidelines.",
        content: `Nausea and vomiting in pets warrant anti-emetic medication when caused by motion sickness, chemotherapy, post-surgical recovery, or chronic conditions like pancreatitis or kidney disease.

**Anti-Nausea Medications:**

**Cerenia (Maropitant):** Most effective veterinary anti-emetic. Blocks substance P in vomiting center of brain. For dogs: 2 mg/kg once daily, oral or injectable. For cats: 1 mg/kg once daily. Safe for travel, chemotherapy, acute vomiting. Can be used for up to 5 consecutive days.

**Ondansetron (Zofran):** Potent anti-nausea medication preventing serotonin-induced vomiting. Dosage: 0.5-1 mg/kg every 12-24 hours. Particularly effective for chemotherapy-related nausea. Safe for dogs and cats.

**Metoclopramide (Reglan):** Prokinetic agent that speeds gastric emptying while reducing nausea. Dosage: 0.2-0.5 mg/kg every 8-12 hours. Useful for chronic nausea, megaesophagus. Can cross blood-brain barrier; avoid in seizure-prone animals.

**Meclizine (Bonine):** Over-the-counter option for motion sickness. Dosage for dogs: 25 mg per dog once daily. Best given 1 hour before travel. Not effective for cats.

**Famotidine (Pepcid AC):** H2-blocker reducing stomach acid. Helps nausea from acid reflux or gastritis. Dosage: 0.5-1 mg/kg every 12-24 hours. Safe long-term.

**Dietary Management:**
Fast for 12-24 hours (water only), then offer small frequent meals of bland diet (boiled chicken and rice). Gradually reintroduce regular food over 3-5 days.

**Emergency Signs:**
Multiple vomiting episodes, blood in vomit, abdominal pain, lethargy, suspected foreign body ingestion - seek immediate veterinary care.`,
        keywords: ["Cerenia for dogs", "Cerenia for cats", "dog vomiting treatment", "anti-nausea medication pets"],
        lastUpdated: "2026-01-14"
      }
    ]
  },
  "pain-arthritis": {
    title: "Pain Management & Arthritis Treatment for Pets",
    metaDescription: "Comprehensive guide to managing pain and arthritis in dogs and cats, including NSAIDs, opioids, and alternative therapies.",
    keywords: ["pet pain relief", "dog arthritis medication", "NSAIDs for dogs", "cat pain management", "joint supplements"],
    intro: "Chronic pain from arthritis affects millions of senior pets, significantly impacting quality of life. Modern pain management combines medications, supplements, and lifestyle modifications to keep pets comfortable and mobile.",
    posts: [
      {
        slug: "arthritis-medications-dogs",
        title: "Arthritis Medications for Dogs: NSAIDs, Supplements, and Alternative Therapies",
        excerpt: "Complete treatment options for canine arthritis, from prescription medications to joint supplements and physical therapy.",
        content: `Osteoarthritis affects up to 80% of dogs over age 8. Multi-modal pain management provides the best quality of life while minimizing side effects.

**NSAIDs for Dogs:**

**Carprofen (Rimadyl):** Most commonly prescribed canine NSAID. Dosage: 2-4 mg/kg daily, divided into one or two doses. Reduces inflammation and pain. Monitor liver and kidney function with long-term use.

**Meloxicam (Metacam):** Once-daily NSAID with liquid formulation for easy dosing. Dosage: 0.1 mg/kg after first day loading dose of 0.2 mg/kg. Generally well-tolerated. Flavored suspension.

**Galliprant (Grapiprant):** Newest NSAID targeting only inflammatory pathway (EP4 receptor). Fewer gastrointestinal and kidney side effects than traditional NSAIDs. Dosage: 2 mg/kg once daily. Safe for long-term use in dogs over 9 months old.

**Deracoxib (Deramaxx):** COX-2 selective NSAID. Post-surgical pain and osteoarthritis. Dosage: 1-2 mg/kg daily for arthritis. Not for cats.

**Additional Pain Medications:**

**Gabapentin:** Nerve pain medication increasingly used for arthritis. Dosage: 5-10 mg/kg every 8-12 hours. Can cause sedation initially. Excellent safety profile.

**Tramadol:** Opioid pain reliever for moderate to severe pain. Dosage: 2-5 mg/kg every 8-12 hours. Often combined with NSAIDs for enhanced effect.

**Joint Supplements:**

**Glucosamine/Chondroitin:** Building blocks for cartilage repair. Dosage: 20 mg/kg glucosamine daily. Takes 4-6 weeks for effect. Safe long-term.

**Adequan Injections:** Polysulfated glycosaminoglycan injected twice weekly for 4 weeks, then monthly. Slows cartilage breakdown and promotes repair.

**Omega-3 Fatty Acids:** Anti-inflammatory effects. High-quality fish oil: 100 mg/kg EPA/DHA daily.

**Alternative Therapies:**
Acupuncture, cold laser therapy, hydrotherapy, physical rehabilitation, weight management (critical for joint health).`,
        keywords: ["Rimadyl for dogs", "Galliprant", "dog arthritis treatment", "glucosamine for dogs", "joint supplements"],
        lastUpdated: "2026-01-18"
      }
    ]
  },
  "seizures": {
    title: "Seizure Management in Pets",
    metaDescription: "Guide to epilepsy and seizure disorders in dogs and cats, including anti-seizure medications, emergency care, and long-term management.",
    keywords: ["pet seizures", "epilepsy in dogs", "seizure medication", "phenobarbital", "anti-convulsant drugs"],
    intro: "Seizures in pets can be frightening but are often manageable with appropriate medication. Understanding seizure triggers, emergency care, and long-term treatment options helps pet owners support their epileptic companions.",
    posts: [
      {
        slug: "seizure-medications-dogs",
        title: "Anti-Seizure Medications for Dogs: Phenobarbital, Keppra, and More",
        excerpt: "Comprehensive guide to managing epilepsy in dogs with medications, monitoring, and lifestyle adjustments.",
        content: `Canine epilepsy requires lifelong medication in most cases. The goal is to reduce seizure frequency and severity while minimizing side effects. Most dogs with epilepsy live normal, happy lives with proper treatment.

**First-Line Anti-Seizure Medications:**

**Phenobarbital:** Gold standard for canine epilepsy. Dosage: 2-5 mg/kg twice daily. Highly effective, controlling seizures in 60-80% of epileptic dogs. Side effects: increased thirst/urination, sedation (usually resolves after 2-3 weeks), increased appetite. Requires regular blood monitoring (liver enzymes, drug levels). Lifelong treatment; sudden discontinuation can trigger cluster seizures.

**Potassium Bromide (KBr):** Alternative or adjunct to phenobarbital. Dosage: 20-40 mg/kg daily. Loading dose protocol available for faster control. Minimal liver impact, good for dogs with liver disease. Side effects: rear limb weakness (usually temporary), increased thirst. Takes 3-4 months to reach steady state.

**Newer Anti-Epileptic Drugs:**

**Levetiracetam (Keppra):** Rapidly acting with excellent safety profile. Dosage: 20 mg/kg three times daily (extended release: 30-40 mg/kg twice daily). Often used as add-on therapy. No liver concerns. More expensive than traditional options. Effects wear off quickly if dose missed.

**Zonisamide:** Once or twice daily dosing. Dosage: 5-10 mg/kg. Can be used alone or with phenobarbital. Fewer side effects than phenobarbital. Effective in many refractory cases.

**Emergency Seizure Care:**
- Time the seizure (concerning if >5 minutes)
- Move away from hazards, don't restrain
- Don't put hands near mouth
- Keep cool and dim environment
- Rectal diazepam for cluster seizures (0.5-2 mg/kg)
- Seek emergency care for seizures >5 minutes or multiple seizures in 24 hours

**Monitoring:**
Regular blood work (every 6-12 months) to check drug levels and organ function. Seizure diary tracking frequency, duration, and triggers.`,
        keywords: ["phenobarbital for dogs", "Keppra dogs", "dog epilepsy treatment", "seizure medication dogs"],
        lastUpdated: "2026-01-17"
      }
    ]
  },
  "stomach-ulcers": {
    title: "Stomach Ulcers and Gastric Health in Pets",
    metaDescription: "Information about stomach ulcers, gastritis, and digestive health in pets, including medications and dietary management.",
    keywords: ["stomach ulcers pets", "gastritis treatment", "acid reducers for dogs", "omeprazole for pets", "digestive health"],
    intro: "Stomach ulcers and gastritis in pets can result from NSAID use, kidney disease, stress, or underlying conditions. Proper treatment involves medications to reduce acid production, protect the stomach lining, and address underlying causes.",
    posts: [
      {
        slug: "stomach-ulcer-medications-pets",
        title: "Treating Stomach Ulcers in Pets: Acid Reducers and Protective Medications",
        excerpt: "Effective treatments for gastric ulcers and gastritis in dogs and cats, including proton pump inhibitors and gastric protectants.",
        content: `Gastric ulcers cause vomiting (sometimes with blood), black tarry stool, abdominal pain, and decreased appetite. Prompt treatment prevents serious complications like perforation.

**Acid-Reducing Medications:**

**Omeprazole (Prilosec):** Proton pump inhibitor (PPI), most effective acid reducer. Dosage: 0.5-1 mg/kg once daily. Give on empty stomach 30 minutes before feeding for best absorption. Takes 3-5 days for full effect. Safe for long-term use in most pets.

**Pantoprazole (Protonix):** Alternative PPI similar efficacy to omeprazole. Available in injectable form for hospitalized patients. Dosage: 1 mg/kg once daily.

**Famotidine (Pepcid AC):** H2-blocker, less potent than PPIs but faster acting. Dosage: 0.5-1 mg/kg every 12-24 hours. Over-the-counter availability. Good for mild gastritis or short-term use.

**Gastric Protectants:**

**Sucralfate (Carafate):** Forms protective coating over ulcers, allowing healing. Dosage: 0.5-1 gram per 20-40 kg dog, three to four times daily. Give on empty stomach, 1 hour before meals. Liquid suspension easier to administer to cats.

**Misoprostol:** Prostaglandin analog preventing NSAID-induced ulcers. Dosage: 2-5 mcg/kg three times daily. Use when long-term NSAIDs necessary in high-risk patients.

**Dietary Management:**
- Small, frequent meals of low-fat, easily digestible food
- Hill's i/d, Royal Canin Gastro formulas
- Avoid treats and table food during healing
- Bland diet: boiled chicken and rice initially

**Treatment Duration:**
Mild gastritis: 2-3 weeks. Confirmed ulcers: 4-8 weeks minimum. Recheck endoscopy to confirm healing if severe.`,
        keywords: ["omeprazole for dogs", "Prilosec pets", "stomach ulcer treatment", "gastritis in pets", "sucralfate dosage"],
        lastUpdated: "2026-01-16"
      }
    ]
  }
};

const CategoryPageDemo: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("allergies-itching");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const category = categoryData[selectedCategory];
  const activePost = selectedPost || category.posts[0];

  useEffect(() => {
    if (category && category.posts && category.posts.length > 0) {
      setSelectedPost(category.posts[0]);
    }
  }, [selectedCategory, category]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* SEO-Optimized Header - with top margin to clear main nav */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-purple-600">Pet Medications Hub</h1>
              <p className="text-sm text-gray-600">Comprehensive veterinary medication guides</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search medications..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb for SEO */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-purple-600">Home</a>
          <ChevronRight className="w-4 h-4" />
          <a href="/medications" className="hover:text-purple-600">Medications</a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{category.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-32">
              <h2 className="text-lg font-bold mb-4 text-gray-900">Categories</h2>
              <nav className="space-y-2">
                {Object.entries(categoryData).map(([slug, cat]) => (
                  <button
                    key={slug}
                    onClick={() => setSelectedCategory(slug)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition flex items-center justify-between ${
                      selectedCategory === slug
                        ? "bg-purple-600 text-white"
                        : "hover:bg-purple-50 text-gray-700"
                    }`}
                  >
                    <span className="text-sm">{cat.title}</span>
                    {selectedCategory === slug && <ArrowRight className="w-4 h-4" />}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            {/* Category Overview - SEO-Rich */}
            <article className="bg-white rounded-xl shadow-sm p-8 mb-6">
              <header>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.title}</h1>
                <p className="text-lg text-gray-700 mb-4">{category.metaDescription}</p>
                
                {/* Keywords Display */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {category.keywords.map((keyword: string, i: number) => (
                    <span key={i} className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      <Tag className="w-3 h-3 mr-1" />
                      {keyword}
                    </span>
                  ))}
                </div>
              </header>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{category.intro}</p>
              </div>
            </article>

            {/* Posts List with Full Content */}
            <div className="space-y-6">
              {category.posts.map((post: Post) => (
                <article 
                  key={post.slug}
                  id={post.slug}
                  className={`bg-white rounded-xl shadow-sm p-8 transition ${
                    activePost.slug === post.slug ? "ring-2 ring-purple-500" : ""
                  }`}
                >
                  <header className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">{post.title}</h2>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Updated: {post.lastUpdated}
                      </span>
                    </div>

                    <p className="text-lg text-gray-600 mt-3 italic">{post.excerpt}</p>
                  </header>

                  {/* Full Post Content for SEO */}
                  <div className="prose max-w-none">
                    {post.content.split('\n\n').map((paragraph: string, i: number) => (
                      <p key={i} className="mb-4 text-gray-700 leading-relaxed whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Post Keywords */}
                  <footer className="mt-6 pt-6 border-t">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-medium text-gray-700">Related topics:</span>
                      {post.keywords.map((keyword: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </footer>
                </article>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">Need Veterinary Advice?</h3>
              <p className="mb-6">Always consult with a licensed veterinarian before starting any medication regimen for your pet.</p>
              <div className="flex gap-4">
                <a 
                  href="/veterinarian"
                  className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Find a Veterinarian
                </a>
                <a 
                  href="/medications"
                  className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                >
                  Browse All Categories
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoryPageDemo;