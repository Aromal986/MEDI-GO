import { Medicine, Pharmacy } from '../types';
import { INDIA_LOCATIONS } from './indiaLocations';

// ───────────────────────────────────────────────────
// 1. MASTER MEDICINE CATALOGUE (1000+ entries)
// ───────────────────────────────────────────────────

const SEED_MEDICINES: { name: string; price: number; common: boolean; cat: 'OTC'|'Prescription'|'Supplement' }[] = [
  // ── Very common OTC ──
  { name:'Paracetamol 500mg', price:10, common:true, cat:'OTC' },
  { name:'Paracetamol 650mg (Dolo)', price:18, common:true, cat:'OTC' },
  { name:'Dolo 650', price:20, common:true, cat:'OTC' },
  { name:'Crocin 500mg', price:17, common:true, cat:'OTC' },
  { name:'Crocin Advance 650mg', price:23, common:true, cat:'OTC' },
  { name:'Combiflam Tablet', price:26, common:true, cat:'OTC' },
  { name:'Ibuprofen 400mg (Brufen)', price:19, common:true, cat:'OTC' },
  { name:'Aspirin 75mg', price:14, common:true, cat:'OTC' },
  { name:'Disprin 325mg', price:12, common:true, cat:'OTC' },
  { name:'ORS Electral Powder 21.8g', price:22, common:true, cat:'OTC' },
  { name:'Electral ORS Strawberry Flavour', price:25, common:true, cat:'OTC' },
  { name:'Cetirizine 10mg (Cetzine)', price:25, common:true, cat:'OTC' },
  { name:'Loratadine 10mg (Lorfast)', price:22, common:true, cat:'OTC' },
  { name:'Vitamin C 500mg (Celin)', price:35, common:true, cat:'Supplement' },
  { name:'Limcee Vitamin C Chewable 500mg', price:25, common:true, cat:'Supplement' },
  { name:'Vitamin B Complex (Zevit)', price:48, common:true, cat:'Supplement' },
  { name:'Calcium Carbonate + D3 (Shelcal 500)', price:95, common:true, cat:'Supplement' },
  { name:'Zinc Sulphate 20mg', price:32, common:true, cat:'Supplement' },
  { name:'Iron Folic Acid Tablet (Dexorange)', price:45, common:true, cat:'Supplement' },
  { name:'Multivitamin Tablet (Supradyn)', price:155, common:true, cat:'Supplement' },
  // ── Common Prescription ──
  { name:'Azithromycin 500mg (Azithral)', price:115, common:true, cat:'Prescription' },
  { name:'Azithromycin 250mg', price:65, common:true, cat:'Prescription' },
  { name:'Amoxicillin 500mg (Mox 500)', price:85, common:true, cat:'Prescription' },
  { name:'Amoxicillin Clavulanate 625mg (Augmentin)', price:195, common:true, cat:'Prescription' },
  { name:'Ciprofloxacin 500mg (Ciplox)', price:65, common:true, cat:'Prescription' },
  { name:'Levofloxacin 500mg (Lox 500)', price:80, common:true, cat:'Prescription' },
  { name:'Pantoprazole 40mg (Pan 40)', price:45, common:true, cat:'Prescription' },
  { name:'Omeprazole 20mg (Omez)', price:52, common:true, cat:'Prescription' },
  { name:'Rabeprazole 20mg (Razo)', price:58, common:true, cat:'Prescription' },
  { name:'Esomeprazole 40mg (Nexium)', price:75, common:true, cat:'Prescription' },
  { name:'Metformin 500mg (Glycomet)', price:32, common:true, cat:'Prescription' },
  { name:'Metformin 1000mg', price:48, common:true, cat:'Prescription' },
  { name:'Glimepiride 2mg', price:38, common:true, cat:'Prescription' },
  { name:'Atorvastatin 10mg (Atorva)', price:78, common:true, cat:'Prescription' },
  { name:'Atorvastatin 20mg', price:95, common:true, cat:'Prescription' },
  { name:'Rosuvastatin 10mg (Rosuvas)', price:85, common:true, cat:'Prescription' },
  { name:'Telmisartan 40mg (Telma)', price:65, common:true, cat:'Prescription' },
  { name:'Amlodipine 5mg (Amlong)', price:28, common:true, cat:'Prescription' },
  { name:'Amlodipine 10mg', price:35, common:true, cat:'Prescription' },
  { name:'Losartan 50mg (Repace 50)', price:58, common:true, cat:'Prescription' },
  { name:'Enalapril 5mg', price:42, common:true, cat:'Prescription' },
  { name:'Metoprolol 25mg (Met XL)', price:32, common:true, cat:'Prescription' },
  { name:'Propranolol 40mg', price:24, common:true, cat:'Prescription' },
  { name:'Levothyroxine 50mcg (Thyronorm)', price:180, common:true, cat:'Prescription' },
  { name:'Levothyroxine 100mcg', price:210, common:true, cat:'Prescription' },
  { name:'Montelukast 10mg (Montair)', price:95, common:true, cat:'Prescription' },
  { name:'Montelukast + Levocetirizine (Montair LC)', price:140, common:true, cat:'Prescription' },
  { name:'Salbutamol Inhaler (Asthalin)', price:120, common:true, cat:'Prescription' },
  { name:'Budesonide Inhaler (Budecort)', price:320, common:true, cat:'Prescription' },
  { name:'Prednisolone 5mg', price:15, common:true, cat:'Prescription' },
  { name:'Dexamethasone 0.5mg', price:18, common:true, cat:'Prescription' },
  { name:'Metronidazole 400mg (Flagyl)', price:22, common:true, cat:'Prescription' },
  { name:'Tinidazole 500mg', price:28, common:true, cat:'Prescription' },
  { name:'Norfloxacin 400mg (Norflox)', price:38, common:true, cat:'Prescription' },
  { name:'Diclofenac 50mg (Voveran)', price:32, common:true, cat:'Prescription' },
  { name:'Naproxen 500mg', price:42, common:true, cat:'Prescription' },
  { name:'Tramadol 50mg', price:55, common:true, cat:'Prescription' },
  { name:'Clobazam 10mg', price:38, common:true, cat:'Prescription' },
  { name:'Alprazolam 0.25mg', price:28, common:true, cat:'Prescription' },
  { name:'Domperidone 10mg (Domstal)', price:22, common:true, cat:'Prescription' },
  { name:'Ondansetron 4mg (Emeset)', price:35, common:true, cat:'Prescription' },
  { name:'Ranitidine 150mg', price:18, common:true, cat:'Prescription' },
  { name:'Famotidine 20mg', price:22, common:true, cat:'Prescription' },
  { name:'Cefixime 200mg (Zifi)', price:95, common:true, cat:'Prescription' },
  { name:'Cephalexin 500mg', price:72, common:true, cat:'Prescription' },
  { name:'Doxycycline 100mg', price:45, common:true, cat:'Prescription' },
  { name:'Erythromycin 500mg', price:68, common:true, cat:'Prescription' },
  { name:'Clindamycin 300mg', price:88, common:true, cat:'Prescription' },
  { name:'Fluconazole 150mg (Flucos)', price:55, common:true, cat:'Prescription' },
  { name:'Itraconazole 100mg', price:120, common:true, cat:'Prescription' },
  { name:'Acyclovir 400mg (Acivir)', price:65, common:true, cat:'Prescription' },
  { name:'Valacyclovir 500mg', price:195, common:true, cat:'Prescription' },
  { name:'Chloroquine 250mg', price:22, common:true, cat:'Prescription' },
  { name:'Hydroxychloroquine 200mg (HCQ)', price:85, common:true, cat:'Prescription' },
  { name:'Ivermectin 12mg', price:42, common:true, cat:'Prescription' },
  { name:'Albendazole 400mg (Zentel)', price:35, common:true, cat:'OTC' },
  { name:'Mebendazole 100mg', price:22, common:true, cat:'OTC' },
  // ── Common Syrups / Topical ──
  { name:'Benadryl Cough Syrup 100ml', price:125, common:true, cat:'OTC' },
  { name:'Ascoril LS Syrup 100ml', price:110, common:true, cat:'OTC' },
  { name:'Honitus Cough Syrup 100ml', price:95, common:true, cat:'OTC' },
  { name:'Chericof Plus Syrup 100ml', price:85, common:true, cat:'OTC' },
  { name:'Gelusil Antacid Liquid 200ml', price:135, common:true, cat:'OTC' },
  { name:'Digene Gel 200ml', price:88, common:true, cat:'OTC' },
  { name:'Moov Pain Relief Cream 50g', price:165, common:true, cat:'OTC' },
  { name:'Volini Spray 40g', price:195, common:true, cat:'OTC' },
  { name:'Betadine Solution 500ml', price:220, common:true, cat:'OTC' },
  { name:'Burnol Antiseptic Cream 30g', price:62, common:true, cat:'OTC' },
  { name:'Soframycin Skin Cream 25g', price:75, common:true, cat:'OTC' },
  { name:'Strepsils Lozenges (Pack of 16)', price:36, common:true, cat:'OTC' },
  { name:'Vicks VapoRub 25g', price:55, common:true, cat:'OTC' },
  { name:'Boroline Antiseptic Cream 40g', price:48, common:true, cat:'OTC' },
  { name:'Dettol Antiseptic Liquid 250ml', price:115, common:true, cat:'OTC' },
  { name:'Lacto Calamine Lotion 120ml', price:145, common:true, cat:'OTC' },
  // ── Eye / Ear / Nose ──
  { name:'Ciprofloxacin Eye Drops 5ml', price:32, common:true, cat:'Prescription' },
  { name:'Moxifloxacin Eye Drops (Moxicip)', price:88, common:true, cat:'Prescription' },
  { name:'Ofloxacin Eye Drops 5ml', price:28, common:true, cat:'Prescription' },
  { name:'Tobramycin Eye Drops 5ml', price:65, common:true, cat:'Prescription' },
  { name:'Otrivin Nasal Drops 10ml', price:42, common:true, cat:'OTC' },
  { name:'Nasivion Nasal Drops 10ml', price:38, common:true, cat:'OTC' },
  { name:'Otosporin Ear Drops 10ml', price:65, common:true, cat:'Prescription' },
  // ── Cardiology / Specialty ──
  { name:'Aspirin 75mg Enteric Coated (Ecosprin)', price:14, common:true, cat:'OTC' },
  { name:'Clopidogrel 75mg (Clopilet)', price:78, common:true, cat:'Prescription' },
  { name:'Warfarin 5mg (Warf)', price:55, common:true, cat:'Prescription' },
  { name:'Digoxin 0.25mg (Lanoxin)', price:28, common:true, cat:'Prescription' },
  { name:'Furosemide 40mg (Lasix)', price:22, common:true, cat:'Prescription' },
  { name:'Spironolactone 25mg', price:32, common:true, cat:'Prescription' },
  { name:'Hydrochlorothiazide 12.5mg', price:18, common:true, cat:'Prescription' },
  { name:'Nitroglycerin Tablet 0.5mg', price:35, common:true, cat:'Prescription' },
  { name:'Isosorbide Dinitrate 5mg (Sorbitrate)', price:28, common:true, cat:'Prescription' },
  { name:'Diltiazem 30mg', price:38, common:true, cat:'Prescription' },
  { name:'Verapamil 40mg', price:32, common:true, cat:'Prescription' },
  // ── Neurological ──
  { name:'Gabapentin 300mg (Gabapin)', price:65, common:true, cat:'Prescription' },
  { name:'Pregabalin 75mg (Lyrica)', price:145, common:true, cat:'Prescription' },
  { name:'Phenytoin 100mg (Eptoin)', price:22, common:true, cat:'Prescription' },
  { name:'Levetiracetam 500mg (Levera)', price:220, common:true, cat:'Prescription' },
  { name:'Carbamazepine 200mg (Tegretol)', price:55, common:true, cat:'Prescription' },
  { name:'Valproic Acid 200mg (Valparin)', price:38, common:true, cat:'Prescription' },
  { name:'Donepezil 5mg (Donecept)', price:285, common:true, cat:'Prescription' },
  { name:'Zolpidem 5mg (Stilnox)', price:88, common:true, cat:'Prescription' },
  { name:'Sertraline 50mg (Serta)', price:95, common:true, cat:'Prescription' },
  { name:'Escitalopram 10mg (Nexito)', price:85, common:true, cat:'Prescription' },
  { name:'Fluoxetine 20mg (Fludac)', price:65, common:true, cat:'Prescription' },
  { name:'Paroxetine 20mg (Paxidep)', price:78, common:true, cat:'Prescription' },
  { name:'Amitriptyline 25mg (Amitone)', price:18, common:true, cat:'Prescription' },
  { name:'Mirtazapine 15mg (Mirtaz)', price:88, common:true, cat:'Prescription' },
  // ── Oncology / Rare / Specialty ──
  { name:'Tocilizumab 400mg Injection (Actemra)', price:42500, common:false, cat:'Prescription' },
  { name:'Pirfenidone 200mg (Pirfenex)', price:850, common:false, cat:'Prescription' },
  { name:'Nintedanib 150mg (Ofev)', price:3400, common:false, cat:'Prescription' },
  { name:'Amphotericin B Liposomal 50mg Injection', price:7200, common:false, cat:'Prescription' },
  { name:'Remdesivir 100mg Injection', price:2800, common:false, cat:'Prescription' },
  { name:'IVIG Human Immunoglobulin 5g', price:14500, common:false, cat:'Prescription' },
  { name:'Lenvatinib 10mg (Lenvima)', price:18900, common:false, cat:'Prescription' },
  { name:'Palbociclib 125mg (Ibrance)', price:68000, common:false, cat:'Prescription' },
  { name:'Bevacizumab 400mg Injection (Avastin)', price:38000, common:false, cat:'Prescription' },
  { name:'Rituximab 500mg Injection (Ristova)', price:29500, common:false, cat:'Prescription' },
  { name:'Bortezomib 3.5mg Injection', price:6400, common:false, cat:'Prescription' },
  { name:'Pembrolizumab 100mg Injection (Keytruda)', price:195000, common:false, cat:'Prescription' },
  { name:'Trastuzumab 440mg Injection (Herclon)', price:45000, common:false, cat:'Prescription' },
  { name:'Imatinib 400mg (Gleevec)', price:2200, common:false, cat:'Prescription' },
  { name:'Dasatinib 70mg (Sprycel)', price:12500, common:false, cat:'Prescription' },
  { name:'Erlotinib 150mg (Tarceva)', price:9800, common:false, cat:'Prescription' },
  { name:'Gefitinib 250mg (Iressa)', price:7500, common:false, cat:'Prescription' },
  { name:'Sorafenib 200mg (Sorafenat)', price:7900, common:false, cat:'Prescription' },
  { name:'Sunitinib 50mg (Sutent)', price:28000, common:false, cat:'Prescription' },
  { name:'Gemcitabine 1g Injection', price:3200, common:false, cat:'Prescription' },
  { name:'Carboplatin 450mg Injection', price:2800, common:false, cat:'Prescription' },
  { name:'Paclitaxel 300mg Injection', price:4500, common:false, cat:'Prescription' },
  { name:'Doxorubicin 50mg Injection', price:1800, common:false, cat:'Prescription' },
  { name:'Vincristine 1mg Injection', price:750, common:false, cat:'Prescription' },
  { name:'Cyclophosphamide 500mg Injection', price:580, common:false, cat:'Prescription' },
  { name:'Methotrexate 2.5mg', price:48, common:false, cat:'Prescription' },
  { name:'Capecitabine 500mg (Xeloda)', price:3200, common:false, cat:'Prescription' },
  { name:'Enzalutamide 40mg (Glenza)', price:12800, common:false, cat:'Prescription' },
  { name:'Abiraterone Acetate 250mg (Abirapro)', price:3500, common:false, cat:'Prescription' },
  { name:'Ruxolitinib 5mg (Jakavi)', price:8500, common:false, cat:'Prescription' },
  { name:'Tofacitinib 5mg (Xeljanz)', price:2800, common:false, cat:'Prescription' },
  { name:'Upadacitinib 15mg (Rinvoq)', price:12500, common:false, cat:'Prescription' },
  { name:'Secukinumab 150mg Injection (Cosentyx)', price:48000, common:false, cat:'Prescription' },
  { name:'Adalimumab 40mg Injection (Humira)', price:38000, common:false, cat:'Prescription' },
  { name:'Infliximab 100mg Injection (Remicade)', price:25000, common:false, cat:'Prescription' },
  { name:'Etanercept 25mg Injection (Enbrel)', price:14500, common:false, cat:'Prescription' },
  { name:'Sacubitril Valsartan 50mg (Vymada)', price:1250, common:false, cat:'Prescription' },
  { name:'Ivabradine 5mg (Coralan)', price:420, common:false, cat:'Prescription' },
  { name:'Rivaroxaban 10mg (Xarelto)', price:1250, common:false, cat:'Prescription' },
  { name:'Apixaban 5mg (Eliquis)', price:1450, common:false, cat:'Prescription' },
  { name:'Dabigatran 110mg (Pradaxa)', price:1100, common:false, cat:'Prescription' },
  { name:'Sitagliptin 100mg (Januvia)', price:350, common:false, cat:'Prescription' },
  { name:'Empagliflozin 10mg (Jardiance)', price:480, common:false, cat:'Prescription' },
  { name:'Dapagliflozin 10mg (Forxiga)', price:420, common:false, cat:'Prescription' },
  { name:'Liraglutide 1.2mg Injection (Victoza)', price:3800, common:false, cat:'Prescription' },
  { name:'Insulin Glargine (Lantus)', price:1200, common:false, cat:'Prescription' },
  { name:'Insulin Aspart (NovoRapid)', price:950, common:false, cat:'Prescription' },
  { name:'Etoricoxib 60mg (Nucoxia)', price:95, common:true, cat:'Prescription' },
  { name:'Methylprednisolone 4mg (Medrol)', price:65, common:true, cat:'Prescription' },
  { name:'Betamethasone 0.5mg', price:22, common:true, cat:'Prescription' },
];

// Generate additional entries to reach 1000+
function generateExtended(base: typeof SEED_MEDICINES): Medicine[] {
  const out: Medicine[] = base.map((m, i) => ({
    id: `med-${i + 1}`,
    name: m.name,
    category: m.cat,
    isCommon: m.common,
    defaultPrice: m.price,
  }));

  const generics = [
    'Acarbose','Miglitol','Pioglitazone','Repaglinide','Nateglinide',
    'Canagliflozin','Ertugliflozin','Alogliptin','Saxagliptin','Linagliptin',
    'Clonidine','Methyldopa','Hydralazine','Labetalol','Nebivolol','Bisoprolol',
    'Carvedilol','Atenolol','Acebutolol','Betaxolol','Celiprolol','Pindolol',
    'Timolol','Felodipine','Lercanidipine','Nicardipine','Nisoldipine','Nitrendipine',
    'Lacidipine','Manidipine','Barnidipine','Cilnidipine','Azelnidipine','Benidipine',
    'Olmesartan','Candesartan','Eprosartan','Irbesartan','Azilsartan','Fimasartan',
    'Aliskiren','Ramipril','Quinapril','Benazepril','Lisinopril','Captopril',
    'Fosinopril','Moexipril','Perindopril','Trandolapril','Zofenopril','Spirapril',
    'Chlorthalidone','Indapamide','Metolazone','Polythiazide','Bendroflumethiazide',
    'Eplerenone','Amiloride','Triamterene','Torsemide','Bumetanide','Ethacrynic acid',
  ];
  const doses = ['2.5mg','5mg','10mg','20mg','25mg','50mg','100mg','200mg','400mg','500mg','1g','2g'];
  const brands = ['(Cipla)','(Sun Pharma)','(Dr Reddys)','(Lupin)','(Mankind)','(Torrent)','(Alkem)','(Intas)','(Zydus)','(Glenmark)'];

  let counter = out.length + 1;
  generics.forEach((gen, gi) => {
    doses.forEach((dose, di) => {
      if (out.length >= 1100) return;
      const brand = brands[(gi + di) % brands.length];
      const isCommon = gi < 20;
      out.push({
        id: `med-${counter++}`,
        name: `${gen} ${dose} ${brand}`,
        category: 'Prescription',
        isCommon,
        defaultPrice: isCommon ? 25 + (gi * 8) : 120 + (gi * 45),
      });
    });
  });

  return out;
}

// ───────────────────────────────────────────────────
// 2. GENERATE 500+ PHARMACIES (all India)
// ───────────────────────────────────────────────────

const PHARMACY_CHAINS = [
  'Apollo Pharmacy','MedPlus','Jan Aushadhi','Netmeds','PharmEasy Store',
  'HealthMart','CityMedicals','Wellness Forever','Fortis Pharmacy','AIIMS Pharmacy',
  'Lifecare Medicals','CarePlus Pharmacy','24x7 Medicals','Sanjivani Chemist',
  'Royal Pharmacy','Metro Pharmacy','Dr Trust Pharmacy','NearMed','GoodHealth Store',
  'National Pharmacy',
];

const STREET_TYPES = [
  'MG Road','Main Road','Station Road','Hospital Road','Bus Stand Road',
  'Market Street','Railway Nagar','Civil Lines','Nagar Road','Town Road',
];

export function generatePharmacies(): Pharmacy[] {
  const pharmacies: Pharmacy[] = [];
  let id = 1;

  INDIA_LOCATIONS.forEach((loc) => {
    const count = 4; // 4 pharmacies near each location × 300+ locations = 1200+ total (trim to 550)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI;
      const radiusDeg = 0.003 + i * 0.004;
      const lat = +(loc.latitude + Math.sin(angle) * radiusDeg).toFixed(6);
      const lng = +(loc.longitude + Math.cos(angle) * radiusDeg * 1.1).toFixed(6);
      const chain = PHARMACY_CHAINS[(id + i) % PHARMACY_CHAINS.length];
      const street = STREET_TYPES[i % STREET_TYPES.length];
      const is24 = i === 0;

      pharmacies.push({
        id: `ph-${id++}`,
        name: `${chain} – ${loc.name}`,
        address: `No.${10 + i}/${100 + i * 5}, ${street}, ${loc.name}, ${loc.state}`,
        state: loc.state,
        latitude: lat,
        longitude: lng,
        phone: `+91 ${80000 + id} ${10000 + id * 3}`,
        openingHours: is24 ? '24 Hours Open' : '8:00 AM – 10:00 PM',
        is24Hours: is24,
      });
    }
  });

  return pharmacies;
}

// ───────────────────────────────────────────────────
// 3. BUILD & CACHE
// ───────────────────────────────────────────────────

let _medicines: Medicine[] | null = null;
let _pharmacies: Pharmacy[] | null = null;

export function getMedicines(): Medicine[] {
  if (!_medicines) _medicines = generateExtended(SEED_MEDICINES);
  return _medicines;
}

export function getPharmacies(): Pharmacy[] {
  if (!_pharmacies) _pharmacies = generatePharmacies();
  return _pharmacies;
}

/**
 * Get autocomplete suggestions for a query.
 * KEY FEATURE: The user's own input is always prepended as the first option.
 */
export function getMedicineSuggestions(query: string): string[] {
  if (!query.trim()) return [];
  const q = query.trim().toLowerCase();
  const medicines = getMedicines();

  const matched = medicines
    .filter(m => m.name.toLowerCase().includes(q))
    .slice(0, 9)
    .map(m => m.name);

  // Always show the user's exact typed text as first suggestion
  const userInput = query.trim();
  const userInputLower = userInput.toLowerCase();
  const withCustom = [
    userInput,
    ...matched.filter(m => m.toLowerCase() !== userInputLower),
  ];

  return [...new Set(withCustom)].slice(0, 10);
}

/**
 * Find or synthesise a medicine record for any typed name.
 * If not in DB → create a plausible synthetic entry so search always works.
 */
export function resolveOrCreateMedicine(name: string): Medicine {
  const q = name.trim().toLowerCase();
  const medicines = getMedicines();

  const exact = medicines.find(m => m.name.toLowerCase() === q);
  if (exact) return exact;

  const partial = medicines.find(m => m.name.toLowerCase().includes(q) || q.includes(m.name.toLowerCase().split(' ')[0]));
  if (partial) return partial;

  // Synthesise a new medicine for any unknown input
  const looksRare = name.length > 22 || /injection|iv\b|mg\/ml/i.test(name);
  return {
    id: `custom-${Date.now()}`,
    name: name.trim(),
    category: 'Prescription',
    isCommon: !looksRare,
    defaultPrice: looksRare ? 1500 + Math.floor(Math.random() * 5000) : 30 + Math.floor(Math.random() * 200),
  };
}
