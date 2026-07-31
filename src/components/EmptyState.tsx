import React from 'react';
import { AlertCircle, RefreshCw, Search } from 'lucide-react';

interface EmptyStateProps {
  searchedMedicineName: string;
  onClearSearch: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  searchedMedicineName,
  onClearSearch
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 text-center shadow-sm max-w-2xl mx-auto space-y-4">
      <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center border border-amber-200">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-bold text-gray-900">
          This medicine is currently unavailable in our pharmacy network.
        </h3>
        <p className="text-sm text-gray-500">
          No nearby pharmacies in Kerala have stock registered for "<span className="font-semibold text-gray-800">{searchedMedicineName}</span>".
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl text-xs text-gray-600 space-y-1 text-left border border-gray-100">
        <p className="font-semibold text-gray-800">Suggested Steps:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Check spelling or try generic names (e.g. Paracetamol instead of brand name).</li>
          <li>Try searching with a broader locality in manual location mode.</li>
          <li>Upload your prescription to let AI OCR extract alternative brand names.</li>
        </ul>
      </div>

      <button
        type="button"
        onClick={onClearSearch}
        className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Try Another Search</span>
      </button>
    </div>
  );
};
