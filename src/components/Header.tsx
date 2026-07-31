import React from 'react';
import { Pill, ShieldCheck, MapPin } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md">
            <Pill className="w-6 h-6 transform -rotate-45" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                MEDI<span className="text-brand-600">GO</span>
              </span>
              <span className="bg-brand-50 text-brand-700 text-xs font-semibold px-2 py-0.5 rounded border border-brand-200">
                MVP
              </span>
            </div>
            <p className="text-xs text-gray-500 hidden sm:block">
              Find medicines in nearby pharmacies
            </p>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex items-center space-x-3 text-xs font-medium text-gray-600">
          <div className="hidden md:flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Kerala Live Network (500+ Pharmacies)</span>
          </div>

          <div className="flex items-center space-x-1 text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>Instant Stock Verification</span>
          </div>
        </div>

      </div>
    </header>
  );
};
