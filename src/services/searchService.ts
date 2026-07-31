import { SearchResult, Pharmacy, Medicine, InventoryItem } from '../types';
import { getMockDatabase } from '../data/mockData';
import { calculateHaversineDistance, estimateTravelTimeMinutes } from '../utils/haversine';

export interface SearchOptions {
  userLat: number;
  userLng: number;
  medicineQuery: string;
  sortBy?: 'distance' | 'price' | 'stock';
  filterDistrict?: string;
  filterAvailability?: 'all' | 'in_stock' | 'limited';
}

const SEARCH_RADII_KM = [1, 2, 3, 5, 8, 10, 15, 20, 30, 50];
const MIN_RESULTS = 5;
const MAX_RESULTS = 10;

/**
 * Execute silent radius-expanding search for medicine availability
 */
export async function searchPharmaciesForMedicine(
  options: SearchOptions
): Promise<SearchResult[]> {
  const { userLat, userLng, medicineQuery, sortBy = 'distance', filterDistrict, filterAvailability } = options;

  if (!medicineQuery || !medicineQuery.trim()) {
    return [];
  }

  // Artificial mini delay to simulate lightning-fast DB execution (250ms)
  await new Promise((res) => setTimeout(res, 250));

  const db = getMockDatabase();
  const queryLower = medicineQuery.trim().toLowerCase();

  // Find matching medicine in database (fuzzy name match)
  const matchedMedicine = findMatchingMedicine(db.medicines, queryLower);

  if (!matchedMedicine) {
    return [];
  }

  // Retrieve inventory items for matched medicine
  const inventoryItems = db.inventory.get(matchedMedicine.id) || [];
  if (inventoryItems.length === 0) {
    return [];
  }

  // Quick lookup for pharmacy details
  const pharmacyMap = new Map<string, Pharmacy>();
  db.pharmacies.forEach((p) => pharmacyMap.set(p.id, p));

  // Compute distance for all pharmacies with stock
  let allCandidates: {
    pharmacy: Pharmacy;
    inventory: InventoryItem;
    distanceKm: number;
  }[] = [];

  inventoryItems.forEach((inv) => {
    const ph = pharmacyMap.get(inv.pharmacyId);
    if (!ph) return;

    // Filter by district if requested
    if (filterDistrict && filterDistrict !== 'all' && ph.district.toLowerCase() !== filterDistrict.toLowerCase()) {
      return;
    }

    // Filter by availability status if requested
    if (filterAvailability === 'in_stock' && inv.availabilityStatus !== 'In Stock') {
      return;
    }
    if (filterAvailability === 'limited' && inv.availabilityStatus !== 'Limited Stock') {
      return;
    }

    const dist = calculateHaversineDistance(userLat, userLng, ph.latitude, ph.longitude);
    allCandidates.push({
      pharmacy: ph,
      inventory: inv,
      distanceKm: dist
    });
  });

  // Sort candidates by distance ascending
  allCandidates.sort((a, b) => a.distanceKm - b.distanceKm);

  // Silent search radius expansion (1km -> 2km -> 3km -> 5km -> 8km -> 10km -> 15km -> 20km -> 30km -> 50km)
  let selectedCandidates: typeof allCandidates = [];

  for (const radius of SEARCH_RADII_KM) {
    const inRadius = allCandidates.filter((c) => c.distanceKm <= radius);
    if (inRadius.length >= MIN_RESULTS) {
      selectedCandidates = inRadius.slice(0, MAX_RESULTS);
      break;
    }
  }

  // Fallback: If less than MIN_RESULTS inside 50km, take the top available candidates up to MAX_RESULTS
  if (selectedCandidates.length < MIN_RESULTS && allCandidates.length > 0) {
    selectedCandidates = allCandidates.slice(0, Math.min(MAX_RESULTS, allCandidates.length));
  }

  // Format into SearchResult items
  let results: SearchResult[] = selectedCandidates.map((cand) => ({
    pharmacy: cand.pharmacy,
    medicine: matchedMedicine,
    price: cand.inventory.price,
    stockQuantity: cand.inventory.stockQuantity,
    availabilityStatus: cand.inventory.availabilityStatus,
    distanceKm: cand.distanceKm,
    travelTimeMinutes: estimateTravelTimeMinutes(cand.distanceKm),
    isBestMatch: false
  }));

  // Apply requested sorting
  if (sortBy === 'price') {
    results.sort((a, b) => a.price - b.price || a.distanceKm - b.distanceKm);
  } else if (sortBy === 'stock') {
    results.sort((a, b) => b.stockQuantity - a.stockQuantity || a.distanceKm - b.distanceKm);
  } else {
    // Default: Nearest -> Lowest Price -> Highest Stock
    results.sort((a, b) => {
      if (a.distanceKm !== b.distanceKm) return a.distanceKm - b.distanceKm;
      if (a.price !== b.price) return a.price - b.price;
      return b.stockQuantity - a.stockQuantity;
    });
  }

  // Mark the top result as BEST MATCH
  if (results.length > 0) {
    results[0].isBestMatch = true;
  }

  return results;
}

/**
 * Find matching medicine by name (exact, prefix, or substring match)
 */
export function findMatchingMedicine(medicines: Medicine[], queryLower: string): Medicine | null {
  // 1. Exact match
  const exact = medicines.find((m) => m.name.toLowerCase() === queryLower);
  if (exact) return exact;

  // 2. Starts with match
  const startsWith = medicines.find((m) => m.name.toLowerCase().startsWith(queryLower));
  if (startsWith) return startsWith;

  // 3. Substring match
  const contains = medicines.find((m) => m.name.toLowerCase().includes(queryLower));
  if (contains) return contains;

  return null;
}

/**
 * Autocomplete suggestions for medicine search input
 */
export function getMedicineSuggestions(query: string, limit = 8): Medicine[] {
  if (!query || query.trim().length < 2) return [];

  const db = getMockDatabase();
  const q = query.trim().toLowerCase();

  return db.medicines
    .filter((m) => m.name.toLowerCase().includes(q))
    .slice(0, limit);
}
