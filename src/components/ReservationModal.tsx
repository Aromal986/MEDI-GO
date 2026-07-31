import React, { useState } from 'react';
import { SearchResult, Reservation } from '../types';
import { X, CheckCircle, ShieldCheck, Clock, MapPin, Phone, Copy, Check } from 'lucide-react';

interface ReservationModalProps {
  targetResult: SearchResult | null;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  targetResult,
  onClose
}) => {
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  if (!targetResult) return null;

  const { pharmacy, medicine, price } = targetResult;

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

    const resCode = `RES-MED-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      reservationCode: resCode,
      pharmacyId: pharmacy.id,
      pharmacyName: pharmacy.name,
      pharmacyAddress: pharmacy.address,
      pharmacyPhone: pharmacy.phone,
      medicineName: medicine.name,
      quantity: 1,
      pricePerUnit: price,
      totalPrice: price,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      expiresAt: '4 Hours from now'
    };

    setReservation(newReservation);
  };

  const handleCopyCode = () => {
    if (reservation) {
      navigator.clipboard.writeText(reservation.reservationCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!reservation ? (
          /* Form State */
          <form onSubmit={handleConfirmReservation} className="space-y-4">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                Instant Stock Lock
              </span>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                Reserve Medicine at Pharmacy
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Hold stock for pickup. No payment required online.
              </p>
            </div>

            {/* Pharmacy & Medicine Summary */}
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1 text-xs">
              <div className="flex justify-between font-bold text-gray-900">
                <span>{pharmacy.name}</span>
                <span className="text-brand-600">₹{price}</span>
              </div>
              <p className="text-gray-600 font-semibold">{medicine.name}</p>
              <p className="text-gray-400 text-[11px]">{pharmacy.address}</p>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow transition-all text-sm"
            >
              Confirm Medicine Reservation
            </button>
          </form>
        ) : (
          /* Success Confirmation State */
          <div className="text-center space-y-4 py-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Confirmed
              </span>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                Medicine Reserved Successfully!
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Your stock has been locked at the store counter.
              </p>
            </div>

            {/* Reservation ID Box */}
            <div className="bg-brand-50 border-2 border-brand-300 p-4 rounded-xl space-y-2">
              <span className="text-xs text-brand-700 font-semibold uppercase">
                Reservation ID
              </span>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-extrabold text-brand-900 tracking-wider font-mono">
                  {reservation.reservationCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="p-1 text-brand-700 hover:text-brand-900"
                  title="Copy code"
                >
                  {isCopied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-[11px] text-gray-500">
                Hold duration: <span className="font-semibold text-gray-800">{reservation.expiresAt}</span>
              </p>
            </div>

            {/* Details Box */}
            <div className="text-left text-xs bg-gray-50 p-3 rounded-xl space-y-1 text-gray-700">
              <p><strong className="text-gray-900">Store:</strong> {reservation.pharmacyName}</p>
              <p><strong className="text-gray-900">Address:</strong> {reservation.pharmacyAddress}</p>
              <p><strong className="text-gray-900">Medicine:</strong> {reservation.medicineName}</p>
              <p><strong className="text-gray-900">Total Price:</strong> ₹{reservation.totalPrice}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-xl transition-colors"
            >
              Done / Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
