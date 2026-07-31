import React from 'react';
import { SearchResult } from '../types';
import { PharmacyCard } from './PharmacyCard';
import { Tag, TrendingDown, MapPin } from 'lucide-react';

interface PharmacyListProps {
  results: SearchResult[];
  onReserve: (result: SearchResult) => void;
  userLocalityName: string;
}

export const PharmacyList: React.FC<PharmacyListProps> = ({
  results,
  onReserve,
  userLocalityName
}) => {
  if (results.length === 0) return null;

  // Calculate Price Comparison Metrics
  const prices = results.map((r) => r.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceDifference = maxPrice - minPrice;

  return (
    <div className="space-y-6">
      {/* Result Header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {results.length} Pharmacies Near {userLocalityName}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Showing nearest available pharmacies sorted by proximity and price
          </p>
        </div>

        {/* Price Comparison Callout */}
        {results.length > 1 && (
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 flex items-center space-x-3 text-xs flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center">
              <TrendingDown className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2 font-bold text-gray-900">
                <span>Price Range: ₹{minPrice} - ₹{maxPrice}</span>
                {priceDifference > 0 && (
                  <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[10px]">
                    Save up to ₹{priceDifference}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500">
                Cheapest available at <span className="font-semibold text-brand-700">{results.find(r => r.price === minPrice)?.pharmacy.name}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pharmacy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {results.map((res) => (
          <PharmacyCard
            key={`${res.pharmacy.id}-${res.medicine.id}`}
            result={res}
            onReserve={onReserve}
          />
        ))}
      </div>
    </div>
  );
};
