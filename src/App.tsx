import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchCard } from './components/SearchCard';
import { PharmacyList } from './components/PharmacyList';
import { FilterBar } from './components/FilterBar';
import { MapView } from './components/MapView';
import { ReservationModal } from './components/ReservationModal';
import { EmptyState } from './components/EmptyState';
import { UserLocationState, getDefaultUserLocation } from './services/locationService';
import { SearchResult } from './types';
import { searchPharmaciesForMedicine } from './services/searchService';
import { Pill, MapPin, Search, ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<UserLocationState>(getDefaultUserLocation());
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  
  // Filters & Sorting
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'stock'>('distance');
  const [filterAvailability, setFilterAvailability] = useState<'all' | 'in_stock' | 'limited'>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  // Reservation Modal
  const [reservationTarget, setReservationTarget] = useState<SearchResult | null>(null);

  // Trigger search when query or location or filters change
  const executeSearch = async (query: string, location = currentLocation) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setCurrentSearchQuery(query.trim());
    setHasSearched(true);

    try {
      const results = await searchPharmaciesForMedicine({
        userLat: location.latitude,
        userLng: location.longitude,
        medicineQuery: query.trim(),
        sortBy,
        filterDistrict: selectedDistrict,
        filterAvailability
      });

      setSearchResults(results);
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocationChange = (newLocation: UserLocationState) => {
    setCurrentLocation(newLocation);
    if (currentSearchQuery) {
      executeSearch(currentSearchQuery, newLocation);
    }
  };

  const handleSortChange = (newSort: 'distance' | 'price' | 'stock') => {
    setSortBy(newSort);
  };

  const handleAvailabilityChange = (val: 'all' | 'in_stock' | 'limited') => {
    setFilterAvailability(val);
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
  };

  // Extract unique districts in search results for filter dropdown
  const availableDistricts = useMemo(() => {
    const districtsSet = new Set<string>();
    searchResults.forEach((r) => districtsSet.add(r.pharmacy.district));
    return Array.from(districtsSet);
  }, [searchResults]);

  // Re-run search sorting/filtering locally when controls change
  useEffect(() => {
    if (hasSearched && currentSearchQuery) {
      executeSearch(currentSearchQuery);
    }
  }, [sortBy, filterAvailability, selectedDistrict]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      {/* App Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Title & Tagline Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-2 bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-semibold border border-brand-200">
            <Pill className="w-3.5 h-3.5" />
            <span>Instant Kerala Pharmacy Medicine Finder</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Find medicines in nearby pharmacies
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Verify real-time stock availability, compare store prices in ₹, and reserve your required medicines instantly.
          </p>
        </div>

        {/* Homepage Single Search Card */}
        <SearchCard
          currentLocation={currentLocation}
          onLocationChange={handleLocationChange}
          onSearch={(medName) => executeSearch(medName)}
          isSearching={isSearching}
        />

        {/* Results Area */}
        {hasSearched && !isSearching && (
          <div className="space-y-8 pt-4 border-t border-gray-200">
            
            {searchResults.length > 0 ? (
              <>
                {/* Filter and Sort Bar */}
                <FilterBar
                  sortBy={sortBy}
                  onSortChange={handleSortChange}
                  filterAvailability={filterAvailability}
                  onAvailabilityChange={handleAvailabilityChange}
                  selectedDistrict={selectedDistrict}
                  onDistrictChange={handleDistrictChange}
                  districts={availableDistricts}
                />

                {/* Map View */}
                <MapView
                  userLocation={currentLocation}
                  results={searchResults}
                  onReserve={(target) => setReservationTarget(target)}
                />

                {/* Pharmacy Results List */}
                <PharmacyList
                  results={searchResults}
                  onReserve={(target) => setReservationTarget(target)}
                  userLocalityName={currentLocation.localityName}
                />
              </>
            ) : (
              /* Empty Result State */
              <EmptyState
                searchedMedicineName={currentSearchQuery}
                onClearSearch={() => {
                  setHasSearched(false);
                  setCurrentSearchQuery('');
                }}
              />
            )}
          </div>
        )}
      </main>

      {/* Reservation Modal Popup */}
      <ReservationModal
        targetResult={reservationTarget}
        onClose={() => setReservationTarget(null)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2 font-semibold text-gray-800">
            <span>MEDIGO Kerala</span>
            <span>•</span>
            <span className="text-gray-500 font-normal">Real-time Pharmacy Network MVP</span>
          </div>
          <p>© {new Date().getFullYear()} MEDIGO. Future API Ready (MediCare / MediSoft Integration).</p>
        </div>
      </footer>
    </div>
  );
};
