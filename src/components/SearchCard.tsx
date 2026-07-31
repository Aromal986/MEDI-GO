import React, { useState } from 'react';
import { Search, Loader2, Pill, Sparkles } from 'lucide-react';
import { UserLocationState } from '../services/locationService';
import { LocationSelector } from './LocationSelector';
import { PrescriptionUploader } from './PrescriptionUploader';
import { getMedicineSuggestions } from '../services/searchService';
import { Medicine } from '../types';

interface SearchCardProps {
  currentLocation: UserLocationState;
  onLocationChange: (loc: UserLocationState) => void;
  onSearch: (medicineName: string) => void;
  isSearching: boolean;
}

export const SearchCard: React.FC<SearchCardProps> = ({
  currentLocation,
  onLocationChange,
  onSearch,
  isSearching
}) => {
  const [medicineQuery, setMedicineQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Medicine[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setMedicineQuery(val);
    if (val.length >= 2) {
      const matches = getMedicineSuggestions(val);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (medName: string) => {
    setMedicineQuery(medName);
    setShowSuggestions(false);
    onSearch(medName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (medicineQuery.trim()) {
      setShowSuggestions(false);
      onSearch(medicineQuery.trim());
    }
  };

  const quickCommonMedicines = [
    'Paracetamol 650mg',
    'Dolo 650',
    'Crocin 500mg',
    'ORS (Electral)',
    'Pantoprazole 40mg',
    'Cetirizine 10mg',
    'Azithromycin 500mg'
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
      
      {/* Location Section */}
      <LocationSelector
        currentLocation={currentLocation}
        onLocationChange={onLocationChange}
      />

      <hr className="border-gray-100" />

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Medicine Name Input */}
        <div className="space-y-2 relative">
          <label htmlFor="medicine-input" className="block text-sm font-semibold text-gray-800">
            Medicine Name
          </label>
          <div className="relative">
            <input
              id="medicine-input"
              type="text"
              value={medicineQuery}
              onChange={handleInputChange}
              onFocus={() => {
                if (medicineQuery.length >= 2) setShowSuggestions(true);
              }}
              placeholder="Enter Medicine Name (e.g. Paracetamol, Dolo 650, Tocilizumab)..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-base font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-sm"
              required
            />
            <Pill className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5 transform -rotate-45" />
          </div>

          {/* Autocomplete Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-56 overflow-y-auto divide-y divide-gray-100">
              {suggestions.map((med) => (
                <button
                  key={med.id}
                  type="button"
                  onClick={() => handleSelectSuggestion(med.name)}
                  className="w-full text-left px-4 py-2.5 hover:bg-brand-50 flex items-center justify-between text-sm transition-colors"
                >
                  <div>
                    <span className="font-semibold text-gray-900">{med.name}</span>
                    <span className="text-xs text-gray-400 ml-2">({med.category})</span>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${med.isCommon ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {med.isCommon ? 'Common Stock' : 'Specialty Stock'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-gray-400 font-medium flex items-center mr-1">
            <Sparkles className="w-3 h-3 text-brand-500 mr-1" /> Quick search:
          </span>
          {quickCommonMedicines.map((med) => (
            <button
              key={med}
              type="button"
              onClick={() => {
                setMedicineQuery(med);
                onSearch(med);
              }}
              className="bg-gray-100 hover:bg-brand-50 hover:text-brand-700 text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200 transition-colors font-medium"
            >
              {med}
            </button>
          ))}
        </div>

        {/* Prescription Uploader */}
        <PrescriptionUploader
          onSearchExtractedMedicine={(medName) => {
            setMedicineQuery(medName);
            onSearch(medName);
          }}
        />

        {/* Find Medicine Button */}
        <button
          type="submit"
          disabled={isSearching || !medicineQuery.trim()}
          className="w-full py-4 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
        >
          {isSearching ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin text-white" />
              <span>Searching Nearby Network...</span>
            </>
          ) : (
            <>
              <Search className="w-6 h-6" />
              <span>Find Medicine</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
