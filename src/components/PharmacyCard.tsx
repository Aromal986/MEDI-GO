import React from 'react';
import { SearchResult } from '../types';
import { MapPin, Phone, Clock, Navigation, BookmarkPlus, CheckCircle, AlertTriangle, Award, Car } from 'lucide-react';

interface PharmacyCardProps {
  result: SearchResult;
  onReserve: (result: SearchResult) => void;
}

export const PharmacyCard: React.FC<PharmacyCardProps> = ({ result, onReserve }) => {
  const { pharmacy, medicine, price, stockQuantity, availabilityStatus, distanceKm, travelTimeMinutes, isBestMatch } = result;

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}&travelmode=driving`;

  return (
    <div
      className={`relative bg-white rounded-2xl border transition-all hover:shadow-lg p-5 sm:p-6 flex flex-col justify-between ${
        isBestMatch
          ? 'border-brand-500 shadow-md ring-2 ring-brand-500/20'
          : 'border-gray-200 shadow-sm hover:border-gray-300'
      }`}
    >
      {/* Best Match Badge */}
      {isBestMatch && (
        <div className="absolute -top-3 left-6 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
          <Award className="w-3.5 h-3.5" />
          <span>BEST MATCH</span>
        </div>
      )}

      <div>
        {/* Top Header: Pharmacy Name & Distance */}
        <div className="flex items-start justify-between gap-2 mt-1">
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
              {pharmacy.name}
            </h3>
            <p className="text-xs text-gray-500 flex items-center space-x-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span>{pharmacy.address}</span>
            </p>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="bg-brand-50 text-brand-700 px-2.5 py-1 rounded-lg font-bold text-sm inline-flex items-center space-x-1">
              <Navigation className="w-3.5 h-3.5 text-brand-600" />
              <span>{distanceKm} km</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5 flex items-center justify-end space-x-1">
              <Car className="w-3 h-3 text-gray-400" />
              <span>~{travelTimeMinutes} mins</span>
            </p>
          </div>
        </div>

        {/* Medicine & Price Row */}
        <div className="my-4 p-3 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100">
          <div>
            <p className="text-xs text-gray-500 font-medium">Requested Medicine</p>
            <p className="text-sm font-bold text-gray-900">{medicine.name}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 font-medium">Store Price</p>
            <p className="text-xl font-extrabold text-brand-700">₹{price}</p>
          </div>
        </div>

        {/* Stock & Operational Details */}
        <div className="space-y-2 text-xs text-gray-600 mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {availabilityStatus === 'In Stock' ? (
                <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-semibold border border-emerald-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>In Stock</span>
                </span>
              ) : (
                <span className="inline-flex items-center space-x-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md font-semibold border border-amber-200">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Limited Stock</span>
                </span>
              )}
              <span className="text-gray-500">({stockQuantity} units available)</span>
            </div>

            <div className="flex items-center space-x-1 text-gray-500">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{pharmacy.openingHours}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-gray-500 pt-1">
            <Phone className="w-3.5 h-3.5 text-gray-400" />
            <a
              href={`tel:${pharmacy.phone}`}
              className="text-brand-600 hover:underline font-medium"
            >
              {pharmacy.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs sm:text-sm rounded-xl transition-colors text-center"
        >
          <Navigation className="w-4 h-4 text-brand-600" />
          <span>Get Directions</span>
        </a>

        <button
          type="button"
          onClick={() => onReserve(result)}
          className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow transition-all text-center"
        >
          <BookmarkPlus className="w-4 h-4" />
          <span>Reserve Medicine</span>
        </button>
      </div>
    </div>
  );
};
