import React, { useState } from 'react';
import { MapPin, Navigation, RefreshCw, ChevronDown, Check, AlertCircle } from 'lucide-react';
import { KERALA_LOCATIONS } from '../data/keralaLocations';
import { UserLocationState, getCurrentGPSLocation, createLocationFromKeralaLocation } from '../services/locationService';

interface LocationSelectorProps {
  currentLocation: UserLocationState;
  onLocationChange: (loc: UserLocationState) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  currentLocation,
  onLocationChange
}) => {
  const [activeTab, setActiveTab] = useState<'gps' | 'manual'>(currentLocation.isGPS ? 'gps' : 'manual');
  const [isLoadingGPS, setIsLoadingGPS] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [manualQuery, setManualQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleUseGPS = async () => {
    setIsLoadingGPS(true);
    setGpsError(null);
    try {
      const gpsLoc = await getCurrentGPSLocation();
      onLocationChange(gpsLoc);
      setActiveTab('gps');
    } catch (err: any) {
      setGpsError(err.message || 'Unable to access your location.');
    } finally {
      setIsLoadingGPS(false);
    }
  };

  const filteredLocations = KERALA_LOCATIONS.filter(
    (loc) =>
      loc.name.toLowerCase().includes(manualQuery.toLowerCase()) ||
      loc.district.toLowerCase().includes(manualQuery.toLowerCase())
  );

  const handleSelectManualLocation = (loc: typeof KERALA_LOCATIONS[0]) => {
    const manualLoc = createLocationFromKeralaLocation(loc);
    onLocationChange(manualLoc);
    setActiveTab('manual');
    setIsDropdownOpen(false);
    setManualQuery('');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-800">
          Location Selection
        </label>
        <span className="text-xs text-gray-500">
          {currentLocation.isGPS ? '📍 GPS Active' : '📍 Manual Location Set'}
        </span>
      </div>

      {/* Tabs / Mode Selector */}
      <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
        <button
          type="button"
          onClick={() => {
            setActiveTab('gps');
            if (!currentLocation.isGPS) {
              handleUseGPS();
            }
          }}
          className={`flex items-center justify-center space-x-2 py-2 px-3 text-xs sm:text-sm font-medium rounded-lg transition-all ${
            activeTab === 'gps'
              ? 'bg-white text-brand-600 shadow-sm font-semibold'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Navigation className={`w-4 h-4 ${isLoadingGPS ? 'animate-spin' : ''}`} />
          <span>📍 Use My Current Location</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('manual');
            setIsDropdownOpen(true);
          }}
          className={`flex items-center justify-center space-x-2 py-2 px-3 text-xs sm:text-sm font-medium rounded-lg transition-all ${
            activeTab === 'manual'
              ? 'bg-white text-brand-600 shadow-sm font-semibold'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Manual Location</span>
        </button>
      </div>

      {/* GPS Output & Refresh */}
      {activeTab === 'gps' && (
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center flex-shrink-0">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-brand-900">
                Detected GPS Locality
              </p>
              <p className="text-sm font-bold text-gray-900">
                {currentLocation.localityName}
              </p>
              {currentLocation.accuracyMeters && (
                <p className="text-[11px] text-gray-500">
                  Accurate within ~{currentLocation.accuracyMeters} meters
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleUseGPS}
            disabled={isLoadingGPS}
            className="flex items-center space-x-1 text-xs font-medium text-brand-700 bg-white border border-brand-300 px-3 py-1.5 rounded-lg hover:bg-brand-100 transition-colors"
            title="Refresh GPS location"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingGPS ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      )}

      {gpsError && (
        <div className="bg-red-50 text-red-700 p-2.5 rounded-lg border border-red-200 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{gpsError} Please select a location manually below.</span>
        </div>
      )}

      {/* Manual Location Autocomplete Selection */}
      {activeTab === 'manual' && (
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              value={isDropdownOpen ? manualQuery : currentLocation.localityName}
              onChange={(e) => {
                setManualQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Search Kerala location (e.g. Kochi, Kayamkulam, Chengannur)..."
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-sm"
            />
            <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto divide-y divide-gray-100">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((loc) => {
                  const isSelected = currentLocation.localityName === loc.name;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => handleSelectManualLocation(loc)}
                      className={`w-full text-left px-4 py-2.5 hover:bg-brand-50 flex items-center justify-between text-xs sm:text-sm transition-colors ${
                        isSelected ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-gray-700'
                      }`}
                    >
                      <div>
                        <span className="font-semibold">{loc.name}</span>
                        <span className="text-gray-400 text-xs ml-2">({loc.district} District)</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-brand-600" />}
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-xs text-gray-500 text-center">
                  No matching Kerala locality found. Try "Kochi", "Kayamkulam", "Chengannur", etc.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
