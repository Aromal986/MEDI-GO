export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  district: string;
  latitude: number;
  longitude: number;
  phone: string;
  openingHours: string;
  is24Hours: boolean;
}

export interface Medicine {
  id: string;
  name: string;
  category: 'OTC' | 'Prescription' | 'Supplement';
  isCommon: boolean;
  genericName?: string;
  defaultPrice: number;
}

export interface InventoryItem {
  pharmacyId: string;
  medicineId: string;
  price: number;
  stockQuantity: number;
  availabilityStatus: 'In Stock' | 'Limited Stock' | 'Out of Stock';
}

export interface SearchResult {
  pharmacy: Pharmacy;
  medicine: Medicine;
  price: number;
  stockQuantity: number;
  availabilityStatus: 'In Stock' | 'Limited Stock' | 'Out of Stock';
  distanceKm: number;
  travelTimeMinutes: number;
  isBestMatch?: boolean;
}

export interface KeralaLocation {
  id: string;
  name: string;
  district: string;
  latitude: number;
  longitude: number;
}

export interface ExtractedMedicineChip {
  id: string;
  name: string;
  dosage?: string;
  isConfirmed: boolean;
}

export interface Reservation {
  id: string;
  reservationCode: string;
  pharmacyId: string;
  pharmacyName: string;
  pharmacyAddress: string;
  pharmacyPhone: string;
  medicineName: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  customerName: string;
  customerPhone: string;
  createdAt: string;
  expiresAt: string;
}
