import React from 'react';
import { Filter, ArrowUpDown, MapPin } from 'lucide-react';

interface FilterBarProps {
  sortBy: 'distance' | 'price' | 'stock';
  onSortChange: (sort: 'distance' | 'price' | 'stock') => void;
  filterAvailability: 'all' | 'in_stock' | 'limited';
  onAvailabilityChange: (val: 'all' | 'in_stock' | 'limited') => void;
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
  districts: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  sortBy,
  onSortChange,
  filterAvailability,
  onAvailabilityChange,
  selectedDistrict,
  onDistrictChange,
  districts
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Sort Section */}
      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <ArrowUpDown className="w-4 h-4 text-brand-600 flex-shrink-0" />
        <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">Sort By:</span>
        <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl w-full sm:w-auto text-xs">
          <button
            type="button"
            onClick={() => onSortChange('distance')}
            className={`py-1.5 px-3 rounded-lg font-medium transition-all ${
              sortBy === 'distance'
                ? 'bg-white text-brand-600 shadow-sm font-bold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Nearest
          </button>

          <button
            type="button"
            onClick={() => onSortChange('price')}
            className={`py-1.5 px-3 rounded-lg font-medium transition-all ${
              sortBy === 'price'
                ? 'bg-white text-brand-600 shadow-sm font-bold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Lowest Price
          </button>

          <button
            type="button"
            onClick={() => onSortChange('stock')}
            className={`py-1.5 px-3 rounded-lg font-medium transition-all ${
              sortBy === 'stock'
                ? 'bg-white text-brand-600 shadow-sm font-bold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Highest Stock
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex items-center space-x-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
        <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
        
        {/* Availability Filter */}
        <select
          value={filterAvailability}
          onChange={(e) => onAvailabilityChange(e.target.value as any)}
          className="bg-gray-50 border border-gray-300 text-gray-800 text-xs font-medium rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-500"
        >
          <option value="all">All Availability</option>
          <option value="in_stock">In Stock Only</option>
          <option value="limited">Limited Stock Only</option>
        </select>

        {/* District Filter */}
        {districts.length > 0 && (
          <select
            value={selectedDistrict}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-800 text-xs font-medium rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="all">All Districts</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d} District
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};
