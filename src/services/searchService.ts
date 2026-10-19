import { SearchResult, UserLocation } from '../types';
import { getPharmacies, resolveOrCreateMedicine } from '../data/mockData';
import { haversineDistance, travelTime } from '../utils/haversine';

const SEARCH_RADII = [1, 2, 3, 5, 8, 10, 15, 20, 30, 50, 100, 200];
const MIN_RESULTS = 5;
const MAX_RESULTS = 10;

export interface SearchOptions {
  location: UserLocation;
  medicineName: string;
  sortBy?: 'distance' | 'price' | 'stock';
  filterState?: string;
  filterAvailability?: string;
}

export async function searchMedicine(opts: SearchOptions): Promise<SearchResult[]> {
  await new Promise(r => setTimeout(r, 300)); // slight async feel

  const { location, medicineName, sortBy = 'distance', filterState, filterAvailability } = opts;
  const pharmacies = getPharmacies();
  const medicine = resolveOrCreateMedicine(medicineName);

  // Assign stock/price to every pharmacy deterministically for this medicine
  type Candidate = {
    distanceKm: number;
    result: Omit<SearchResult, 'isBestMatch'>;
  };

  const candidates: Candidate[] = pharmacies
    .filter(ph => {
      if (filterState && filterState !== 'all' && ph.state !== filterState) return false;
      return true;
    })
    .map(ph => {
      const dist = haversineDistance(location.latitude, location.longitude, ph.latitude, ph.longitude);

      // Deterministic price & stock seeded from pharmacy id + medicine name
      const seed = ph.id.split('-')[1] ? parseInt(ph.id.split('-')[1], 10) : 1;
      const medSeed = medicineName.length;
      const priceOffset = ((seed + medSeed) % 13) - 6;
      const price = Math.max(1, medicine.defaultPrice + priceOffset);
      const stockSeed = (seed * medSeed) % 150;

      let stockQty: number;
      let status: 'In Stock' | 'Limited Stock';

      if (medicine.isCommon) {
        // Common medicines → nearly all pharmacies have stock
        const excluded = (seed + medSeed) % 12 === 0;
        if (excluded) return null;
        stockQty = 20 + stockSeed;
        status = stockQty < 30 ? 'Limited Stock' : 'In Stock';
      } else {
        // Rare → ~15% of pharmacies
        if ((seed + medSeed) % 7 !== 0) return null;
        stockQty = 1 + (stockSeed % 10);
        status = stockQty <= 3 ? 'Limited Stock' : 'In Stock';
      }

      if (filterAvailability === 'in_stock' && status !== 'In Stock') return null;
      if (filterAvailability === 'limited' && status !== 'Limited Stock') return null;

      return {
        distanceKm: dist,
        result: {
          pharmacy: ph,
          medicineName: medicine.name,
          price,
          stockQuantity: stockQty,
          availabilityStatus: status,
          distanceKm: dist,
          travelTimeMinutes: travelTime(dist),
        }
      };
    })
    .filter((c): c is Candidate => c !== null);

  // Sort by distance first
  candidates.sort((a, b) => a.distanceKm - b.distanceKm);

  // Silent radius expansion
  let selected: Candidate[] = [];
  for (const radius of SEARCH_RADII) {
    const inRadius = candidates.filter(c => c.distanceKm <= radius);
    if (inRadius.length >= MIN_RESULTS) {
      selected = inRadius.slice(0, MAX_RESULTS);
      break;
    }
  }

  if (selected.length === 0) {
    selected = candidates.slice(0, MAX_RESULTS);
  }

  // Sort by selected option
  let results: SearchResult[] = selected.map(c => ({ ...c.result, isBestMatch: false }));

  if (sortBy === 'price') {
    results.sort((a, b) => a.price - b.price || a.distanceKm - b.distanceKm);
  } else if (sortBy === 'stock') {
    results.sort((a, b) => b.stockQuantity - a.stockQuantity || a.distanceKm - b.distanceKm);
  } else {
    results.sort((a, b) => a.distanceKm - b.distanceKm || a.price - b.price);
  }

  if (results.length > 0) results[0].isBestMatch = true;
  return results;
}
