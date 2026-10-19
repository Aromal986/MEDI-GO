export interface Medicine {
  id: string;
  name: string;
  category: 'OTC' | 'Prescription' | 'Supplement';
  isCommon: boolean;
  defaultPrice: number;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  state: string;
  latitude: number;
  longitude: number;
  phone: string;
  openingHours: string;
  is24Hours: boolean;
}

export interface InventoryItem {
  pharmacyId: string;
  medicineId: string;
  price: number;
  stockQuantity: number;
  availabilityStatus: 'In Stock' | 'Limited Stock';
}

export interface SearchResult {
  pharmacy: Pharmacy;
  medicineName: string;
  price: number;
  stockQuantity: number;
  availabilityStatus: 'In Stock' | 'Limited Stock';
  distanceKm: number;
  travelTimeMinutes: number;
  isBestMatch?: boolean;
}

export interface UserLocation {
  name: string;
  state: string;
  latitude: number;
  longitude: number;
  isGPS: boolean;
  accuracyMeters?: number;
}

export interface Reservation {
  code: string;
  pharmacyName: string;
  pharmacyAddress: string;
  pharmacyPhone: string;
  medicineName: string;
  price: number;
  customerName: string;
  customerPhone: string;
  expiresAt: string;
}
