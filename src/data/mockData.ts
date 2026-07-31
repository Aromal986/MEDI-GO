import { Pharmacy, Medicine, InventoryItem } from '../types';
import { KERALA_LOCATIONS } from './keralaLocations';

// ----------------------------------------------------
// 1. GENERATE 1000+ MEDICINES
// ----------------------------------------------------

const COMMON_MEDICINE_LIST = [
  { name: 'Paracetamol 650mg', price: 18, category: 'OTC' },
  { name: 'Dolo 650', price: 20, category: 'OTC' },
  { name: 'Crocin 500mg', price: 17, category: 'OTC' },
  { name: 'ORS (Electral Powder 21.8g)', price: 22, category: 'OTC' },
  { name: 'Pantoprazole 40mg (Pan 40)', price: 45, category: 'Prescription' },
  { name: 'Cetirizine 10mg (Cetzine)', price: 25, category: 'OTC' },
  { name: 'Vitamin C 500mg (Celin)', price: 35, category: 'Supplement' },
  { name: 'Azithromycin 500mg (Azithral)', price: 115, category: 'Prescription' },
  { name: 'Amoxicillin 500mg (Mox 500)', price: 85, category: 'Prescription' },
  { name: 'Metformin 500mg (Glycomet)', price: 32, category: 'Prescription' },
  { name: 'Atorvastatin 10mg (Atorva)', price: 78, category: 'Prescription' },
  { name: 'Telmisartan 40mg (Telma)', price: 65, category: 'Prescription' },
  { name: 'Montelukast 10mg (Montair LC)', price: 140, category: 'Prescription' },
  { name: 'Ibuprofen 400mg (Brufen)', price: 19, category: 'OTC' },
  { name: 'Omeprazole 20mg (Omez)', price: 52, category: 'Prescription' },
  { name: 'Amlodipine 5mg (Amlong)', price: 28, category: 'Prescription' },
  { name: 'Levothyroxine 50mcg (Thyronorm)', price: 180, category: 'Prescription' },
  { name: 'Losartan 50mg (Repace)', price: 58, category: 'Prescription' },
  { name: 'Disprin 325mg', price: 12, category: 'OTC' },
  { name: 'Voveran SR 100mg', price: 95, category: 'Prescription' },
  { name: 'Deriphyllin 150mg', price: 24, category: 'Prescription' },
  { name: 'Ascoril LS Syrup 100ml', price: 110, category: 'OTC' },
  { name: 'Benadryl Cough Syrup 100ml', price: 125, category: 'OTC' },
  { name: 'Combiflam Tablet', price: 26, category: 'OTC' },
  { name: 'Gelusil Antacid Liquid 200ml', price: 135, category: 'OTC' },
  { name: 'Moov Pain Relief Cream 50g', price: 165, category: 'OTC' },
  { name: 'Volini Spray 40g', price: 195, category: 'OTC' },
  { name: 'Strepsils Sore Throat Lozenges', price: 36, category: 'OTC' },
  { name: 'B-Complex with Zevit Capsules', price: 48, category: 'Supplement' },
  { name: 'Limcee Chewable Vitamin C 500mg', price: 25, category: 'Supplement' }
];

const RARE_MEDICINE_LIST = [
  { name: 'Tocilizumab 400mg Injection (Actemra)', price: 42500, category: 'Prescription' },
  { name: 'Pirfenidone 200mg (Pirfenex)', price: 850, category: 'Prescription' },
  { name: 'Amphotericin B Liposomal 50mg Injection', price: 7200, category: 'Prescription' },
  { name: 'Remdesivir 100mg Injection (Covifor)', price: 2800, category: 'Prescription' },
  { name: 'Human Normal Immunoglobulin 5g (IVIG)', price: 14500, category: 'Prescription' },
  { name: 'Lenvatinib 10mg Capsules (Lenvima)', price: 18900, category: 'Prescription' },
  { name: 'Nintedanib 150mg (Cyendiv)', price: 3400, category: 'Prescription' },
  { name: 'Sacubitril Valsartan 50mg (Vymada)', price: 1250, category: 'Prescription' },
  { name: 'Palbociclib 125mg (Ibrance)', price: 68000, category: 'Prescription' },
  { name: 'Bevacizumab 400mg Injection (Avastin)', price: 38000, category: 'Prescription' },
  { name: 'Rituximab 500mg Injection (Ristova)', price: 29500, category: 'Prescription' },
  { name: 'Bortezomib 3.5mg Injection (BTEZ)', price: 6400, category: 'Prescription' },
  { name: 'Pembrolizumab 100mg (Keytruda)', price: 195000, category: 'Prescription' },
  { name: 'Brentuximab Vedotin 50mg (Adcetris)', price: 140000, category: 'Prescription' },
  { name: 'Enzalutamide 40mg (Glenza)', price: 12800, category: 'Prescription' },
  { name: 'Sorafenib 200mg (Sorafenat)', price: 7900, category: 'Prescription' },
  { name: 'Gemcitabine 1g Injection (Gemita)', price: 3200, category: 'Prescription' },
  { name: 'Carmustine 100mg Injection', price: 18500, category: 'Prescription' }
];

// Helper to generate variants to reach 1000+ distinct medicines deterministically
export function generateMedicines(): Medicine[] {
  const medicines: Medicine[] = [];
  let idCounter = 1;

  // Add primary common medicines
  COMMON_MEDICINE_LIST.forEach((m) => {
    medicines.push({
      id: `med-${idCounter++}`,
      name: m.name,
      category: m.category as any,
      isCommon: true,
      defaultPrice: m.price,
    });
  });

  // Add primary rare medicines
  RARE_MEDICINE_LIST.forEach((m) => {
    medicines.push({
      id: `med-${idCounter++}`,
      name: m.name,
      category: m.category as any,
      isCommon: false,
      defaultPrice: m.price,
    });
  });

  // Generate extended structured medicine catalog (Generics, Dosages, Brands) up to 1020 items
  const prefixes = [
    'Aspirin', 'Cefixime', 'Ciprofloxacin', 'Clopidogrel', 'Diclofenac',
    'Erythromycin', 'Furosemide', 'Gabapentin', 'Hydrochlorothiazide', 'Levofloxacin',
    'Losartan', 'Metoprolol', 'Nifedipine', 'Ofloxacin', 'Paroxetine',
    'Rosuvastatin', 'Sertraline', 'Tramadol', 'Valsartan', 'Zolpidem',
    'Adalimumab', 'Infliximab', 'Trastuzumab', 'Erlotinib', 'Gefitinib',
    'Imatinib', 'Dasatinib', 'Nilotinib', 'Sunitinib', 'Pazopanib',
    'Regorafenib', 'Ruxolitinib', 'Tofacitinib', 'Upadacitinib', 'Baricitinib',
    'Secukinumab', 'Ixekizumab', 'Ustekinumab', 'Guselkumab', 'Risankizumab'
  ];

  const suffixes = ['10mg', '25mg', '50mg', '100mg', '200mg', '500mg', 'Syrup 60ml', 'Injection 2ml', 'Gel 30g', 'Drops 10ml'];
  const brands = ['Apex', 'Cipla', 'Sun Pharma', 'Dr Reddys', 'Lupin', 'Mankind', 'Torrent', 'Alkem', 'Intas', 'Zydus'];

  let pIndex = 0;
  let sIndex = 0;
  let bIndex = 0;

  while (medicines.length < 1020) {
    const pName = prefixes[pIndex % prefixes.length];
    const sName = suffixes[sIndex % suffixes.length];
    const bName = brands[bIndex % brands.length];

    const isRare = pIndex >= 20 || sName.includes('Injection');
    const basePrice = isRare ? Math.floor(1500 + (pIndex * 140)) : Math.floor(25 + (pIndex * 8));

    medicines.push({
      id: `med-${idCounter++}`,
      name: `${pName} ${sName} (${bName})`,
      category: isRare ? 'Prescription' : (sIndex % 2 === 0 ? 'OTC' : 'Prescription'),
      isCommon: !isRare,
      defaultPrice: basePrice,
    });

    pIndex++;
    if (pIndex % prefixes.length === 0) sIndex++;
    if (sIndex % suffixes.length === 0) bIndex++;
  }

  return medicines;
}


// ----------------------------------------------------
// 2. GENERATE 500+ PHARMACIES ACROSS KERALA
// ----------------------------------------------------

const PHARMACY_BRANDS = [
  'Apollo Pharmacy',
  'MedPlus Pharmacy',
  'Jan Aushadhi Medical Store',
  'Neethi Medicals',
  'Karunya Community Pharmacy',
  'City Medicals',
  'Care Medical & Surgical',
  'Lifecare Pharmacy',
  'Wellcare Medicals',
  'Metro Pharmacy',
  'Good Health Chemists',
  'St. Marys Medical Store',
  'Kerala State Co-op Pharmacy',
  'Royal Medicals',
  'Express Pharma'
];

const STREET_NAMES = [
  'MG Road',
  'Main Bus Stand Road',
  'Civil Station Road',
  'Hospital Junction',
  'Railway Station Road',
  'Junction Plaza',
  'Market Road',
  'Bypass Highway',
  'Temple Road',
  'Church Road'
];

export function generatePharmacies(): Pharmacy[] {
  const pharmacies: Pharmacy[] = [];
  let idCounter = 1;

  // We loop over each Kerala location and generate 20-25 pharmacies within 0.1 to 12 km radius
  KERALA_LOCATIONS.forEach((loc) => {
    const pharmaciesPerTown = 22; // 25 locations * 22 = 550 pharmacies total

    for (let i = 0; i < pharmaciesPerTown; i++) {
      const brand = PHARMACY_BRANDS[i % PHARMACY_BRANDS.length];
      const street = STREET_NAMES[i % STREET_NAMES.length];

      // Add small deterministic coordinate offset around center point
      // 0.01 deg lat ~= 1.1 km
      const angle = (i / pharmaciesPerTown) * 2 * Math.PI;
      const radiusDeg = 0.003 + (i * 0.0035); // 0.3 km up to 10-12 km

      const latOffset = Math.sin(angle) * radiusDeg;
      const lngOffset = Math.cos(angle) * radiusDeg * 1.1; // adjust for longitude scale

      const is24H = i % 4 === 0;
      const openTime = is24H ? '24 Hours Open' : '8:00 AM - 10:00 PM';

      pharmacies.push({
        id: `ph-kerala-${idCounter++}`,
        name: `${brand} - ${loc.name.split(',')[0]} #${i + 1}`,
        address: `Door No. ${12 + i}/${100 + i * 3}, ${street}, ${loc.name}`,
        district: loc.district,
        latitude: +(loc.latitude + latOffset).toFixed(6),
        longitude: +(loc.longitude + lngOffset).toFixed(6),
        phone: `+91 ${484 + (i % 5)} ${250000 + idCounter * 7}`,
        openingHours: openTime,
        is24Hours: is24H
      });
    }
  });

  return pharmacies;
}


// ----------------------------------------------------
// 3. GENERATE INVENTORY (PRICE & STOCK)
// ----------------------------------------------------

export function generateInventory(
  pharmacies: Pharmacy[],
  medicines: Medicine[]
): Map<string, InventoryItem[]> {
  // Map from medicineId -> InventoryItem[]
  const inventoryMap = new Map<string, InventoryItem[]>();

  // Pre-seed common medicine index lookup for speed
  const commonMedMap = new Map<string, Medicine>();
  const rareMedMap = new Map<string, Medicine>();

  medicines.forEach(m => {
    if (m.isCommon) {
      commonMedMap.set(m.name.toLowerCase(), m);
    } else {
      rareMedMap.set(m.name.toLowerCase(), m);
    }
  });

  medicines.forEach((med) => {
    const items: InventoryItem[] = [];

    if (med.isCommon) {
      // Common medicines (Paracetamol, Dolo, etc.) are available in 85% of pharmacies
      pharmacies.forEach((ph, index) => {
        // Deterministic inclusion based on index
        if ((index + med.name.length) % 10 !== 0) {
          // Price variation (+/- 15% around defaultPrice)
          const priceOffset = ((index % 7) - 3); // -3 to +3 rupees
          const finalPrice = Math.max(5, med.defaultPrice + priceOffset);

          // Stock quantity
          const isLimited = index % 8 === 0;
          const stock = isLimited ? (2 + (index % 5)) : (30 + (index % 120));

          items.push({
            pharmacyId: ph.id,
            medicineId: med.id,
            price: finalPrice,
            stockQuantity: stock,
            availabilityStatus: isLimited ? 'Limited Stock' : 'In Stock'
          });
        }
      });
    } else {
      // Rare medicines (Tocilizumab, Pirfenidone, etc.) are stocked in ~12-15% of specialty pharmacies
      pharmacies.forEach((ph, index) => {
        if ((index + med.id.length * 3) % 7 === 0) {
          const priceOffset = Math.floor(((index % 11) - 5) * (med.defaultPrice * 0.02));
          const finalPrice = Math.max(100, med.defaultPrice + priceOffset);

          const isLimited = index % 3 === 0;
          const stock = isLimited ? 1 + (index % 3) : 5 + (index % 15);

          items.push({
            pharmacyId: ph.id,
            medicineId: med.id,
            price: finalPrice,
            stockQuantity: stock,
            availabilityStatus: isLimited ? 'Limited Stock' : 'In Stock'
          });
        }
      });
    }

    inventoryMap.set(med.id, items);
  });

  return inventoryMap;
}

// Singleton Cache
let cachedMedicines: Medicine[] | null = null;
let cachedPharmacies: Pharmacy[] | null = null;
let cachedInventory: Map<string, InventoryItem[]> | null = null;

export function getMockDatabase() {
  if (!cachedMedicines) {
    cachedMedicines = generateMedicines();
  }
  if (!cachedPharmacies) {
    cachedPharmacies = generatePharmacies();
  }
  if (!cachedInventory) {
    cachedInventory = generateInventory(cachedPharmacies, cachedMedicines);
  }

  return {
    medicines: cachedMedicines,
    pharmacies: cachedPharmacies,
    inventory: cachedInventory
  };
}
