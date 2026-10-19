import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Pill, MapPin, Navigation, Search, Loader2, RefreshCw, ChevronDown,
  Check, CheckCircle, AlertTriangle, Award, Phone, Clock, Car,
  ArrowUpDown, Filter, X, Copy, BookmarkPlus, TrendingDown,
  Upload, FileText, Trash2, Plus, Edit2, ShieldCheck, AlertCircle,
  Sparkles, Star
} from 'lucide-react';
import { INDIA_LOCATIONS } from './data/indiaLocations';
import { getMedicineSuggestions } from './data/mockData';
import { searchMedicine } from './services/searchService';
import { UserLocation, SearchResult, Reservation } from './types';

// ─────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────
interface MedicineChip {
  id: string;
  name: string;
  dosage?: string;
}

// ─────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────
function genCode() {
  return `RES-${Math.random().toString(36).substring(2,5).toUpperCase()}-${Math.floor(10000+Math.random()*90000)}`;
}

// Simulated OCR results for prescription scanning
const OCR_SAMPLES: { name: string; dosage: string }[][] = [
  [
    { name: 'Paracetamol', dosage: '650mg' },
    { name: 'Pantoprazole', dosage: '40mg' },
    { name: 'Cetirizine', dosage: '10mg' },
  ],
  [
    { name: 'Azithromycin', dosage: '500mg' },
    { name: 'Dolo 650', dosage: '650mg' },
    { name: 'ORS Electral', dosage: '21.8g' },
  ],
  [
    { name: 'Amoxicillin', dosage: '500mg' },
    { name: 'Ibuprofen', dosage: '400mg' },
    { name: 'Vitamin C', dosage: '500mg' },
  ],
];

async function simulateOCR(file: File): Promise<MedicineChip[]> {
  await new Promise(r => setTimeout(r, 1200));
  const idx = (file.name.length + file.size) % OCR_SAMPLES.length;
  return OCR_SAMPLES[idx].map((m, i) => ({
    id: `chip-${Date.now()}-${i}`,
    name: m.name,
    dosage: m.dosage,
  }));
}

// ─────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────
export default function App() {

  // ── Location State ──
  const [userLocation, setUserLocation] = useState<UserLocation>({
    name: 'Kochi (Ernakulam)', state: 'Kerala',
    latitude: 9.9312, longitude: 76.2673, isGPS: false,
  });
  const [locationTab, setLocationTab] = useState<'gps' | 'manual'>('manual');
  const [locQuery, setLocQuery] = useState('');
  const [locDropOpen, setLocDropOpen] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState('');

  // ── Medicine Search State ──
  const [medQuery, setMedQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSug, setShowSug] = useState(false);

  // ── Prescription Upload State ──
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [chips, setChips] = useState<MedicineChip[]>([]);
  const [editingChipId, setEditingChipId] = useState<string | null>(null);
  const [editingChipVal, setEditingChipVal] = useState('');
  const [showAddChip, setShowAddChip] = useState(false);
  const [newChipName, setNewChipName] = useState('');

  // ── Search Results State ──
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState('');

  // ── Filter / Sort State ──
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'stock'>('distance');
  const [filterState, setFilterState] = useState('all');
  const [filterAvail, setFilterAvail] = useState('all');

  // ── Reservation State ──
  const [resTarget, setResTarget] = useState<SearchResult | null>(null);
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [copied, setCopied] = useState(false);

  // ─────────────────────────────────────────────────────
  // GPS LOCATION
  // ─────────────────────────────────────────────────────
  const handleGPS = async () => {
    setGpsLoading(true); setGpsError('');
    try {
      const pos = await new Promise<GeolocationPosition>((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, { enableHighAccuracy: true, timeout: 10000 })
      );
      const { latitude, longitude, accuracy } = pos.coords;
      let nearest = INDIA_LOCATIONS[0];
      let minD = Infinity;
      INDIA_LOCATIONS.forEach(loc => {
        const d = Math.hypot(loc.latitude - latitude, loc.longitude - longitude);
        if (d < minD) { minD = d; nearest = loc; }
      });
      setUserLocation({ name: `${nearest.name} (GPS)`, state: nearest.state, latitude, longitude, isGPS: true, accuracyMeters: Math.round(accuracy) });
      setLocationTab('gps');
    } catch (e: any) {
      setGpsError(e.code === 1 ? 'Location permission denied. Please allow location access or use manual selection.' : 'Unable to fetch GPS. Try manual location.');
      setLocationTab('manual');
    } finally {
      setGpsLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────
  // LOCATION FILTER
  // ─────────────────────────────────────────────────────
  const filteredLocs = useMemo(() => {
    if (!locQuery.trim()) return INDIA_LOCATIONS;
    const q = locQuery.toLowerCase();
    return INDIA_LOCATIONS.filter(l =>
      l.name.toLowerCase().includes(q) || l.state.toLowerCase().includes(q)
    );
  }, [locQuery]);

  // ─────────────────────────────────────────────────────
  // MEDICINE AUTOCOMPLETE
  // ─────────────────────────────────────────────────────
  useEffect(() => {
    if (medQuery.length >= 1) {
      setSuggestions(getMedicineSuggestions(medQuery));
      setShowSug(true);
    } else {
      setSuggestions([]); setShowSug(false);
    }
  }, [medQuery]);

  // ─────────────────────────────────────────────────────
  // PRESCRIPTION UPLOAD & OCR
  // ─────────────────────────────────────────────────────
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file.name);
    setOcrLoading(true);
    setChips([]);
    try {
      const extracted = await simulateOCR(file);
      setChips(extracted);
    } finally {
      setOcrLoading(false);
    }
  };

  const deleteChip = (id: string) => setChips(p => p.filter(c => c.id !== id));
  const startEditChip = (chip: MedicineChip) => { setEditingChipId(chip.id); setEditingChipVal(chip.name); };
  const saveEditChip = (id: string) => {
    if (!editingChipVal.trim()) return;
    setChips(p => p.map(c => c.id === id ? { ...c, name: editingChipVal.trim() } : c));
    setEditingChipId(null);
  };
  const addChip = () => {
    if (!newChipName.trim()) return;
    setChips(p => [...p, { id: `chip-custom-${Date.now()}`, name: newChipName.trim() }]);
    setNewChipName(''); setShowAddChip(false);
  };
  const searchChip = (name: string) => {
    setMedQuery(name);
    setShowSug(false);
  };

  // ─────────────────────────────────────────────────────
  // SEARCH ENGINE
  // ─────────────────────────────────────────────────────
  const executeSearch = useCallback(async (
    query: string = medQuery,
    loc?: { latitude: number; longitude: number }
  ) => {
    if (!query.trim()) return;
    setSearching(true);
    setSearched(true);
    setLastQuery(query.trim());
    setShowSug(false);
    const useLoc = loc
      ? { ...userLocation, latitude: loc.latitude, longitude: loc.longitude }
      : userLocation;
    try {
      const res = await searchMedicine({
        location: useLoc,
        medicineName: query.trim(),
        sortBy,
        filterState,
        filterAvailability: filterAvail,
      });
      setResults(res);
    } finally {
      setSearching(false);
    }
  }, [userLocation, sortBy, filterState, filterAvail, medQuery]);

  useEffect(() => {
    if (searched && lastQuery) executeSearch(lastQuery);
  }, [sortBy, filterState, filterAvail]);

  // ─────────────────────────────────────────────────────
  // RESERVATION
  // ─────────────────────────────────────────────────────
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTarget || !resName.trim() || !resPhone.trim()) return;
    setReservation({
      code: genCode(),
      pharmacyName: resTarget.pharmacy.name,
      pharmacyAddress: resTarget.pharmacy.address,
      pharmacyPhone: resTarget.pharmacy.phone,
      medicineName: resTarget.medicineName,
      price: resTarget.price,
      customerName: resName.trim(),
      customerPhone: resPhone.trim(),
      expiresAt: '4 hours from now',
    });
  };

  const closeReservation = () => {
    setResTarget(null); setResName(''); setResPhone('');
    setReservation(null); setCopied(false);
  };

  const availableStates = useMemo(() =>
    [...new Set(results.map(r => r.pharmacy.state))].sort(), [results]);
  const prices = results.map(r => r.price);
  const minP = prices.length ? Math.min(...prices) : 0;
  const maxP = prices.length ? Math.max(...prices) : 0;

  // ─────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ══════════════ HEADER ══════════════ */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="MediGo Logo"
              className="h-10 sm:h-12 w-auto object-contain max-w-[160px] sm:max-w-[200px]"
            />
            <span className="hidden sm:inline text-[10px] font-bold bg-brand-50 text-brand-700 px-2 py-0.5 rounded border border-brand-200 self-center">
              ALL INDIA
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              500+ Pharmacies · All India
            </div>
            <div className="hidden sm:flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              Instant Stock Check
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ══════════════ HERO ══════════════ */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 border border-brand-200 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Instant Pharmacy Finder · All India Network
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Find medicines in nearby pharmacies
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            Search any medicine or upload a prescription. We find the nearest pharmacies with stock — anywhere in India.
          </p>
        </div>

        {/* ══════════════ SEARCH CARD ══════════════ */}
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">

          {/* ── LOCATION SECTION ── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">📍 Location</label>
              <span className="text-xs text-gray-400 font-medium">
                {userLocation.isGPS ? '🛰 GPS Active' : `📌 ${userLocation.state}`}
              </span>
            </div>

            {/* Tab switcher */}
            <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => { setLocationTab('gps'); handleGPS(); }}
                className={`flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-lg transition-all ${locationTab === 'gps' ? 'bg-white text-brand-600 shadow font-bold' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Navigation className={`w-4 h-4 ${gpsLoading ? 'animate-spin' : ''}`} />
                📍 Use My Location
              </button>
              <button
                onClick={() => { setLocationTab('manual'); setLocDropOpen(true); }}
                className={`flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-lg transition-all ${locationTab === 'manual' ? 'bg-white text-brand-600 shadow font-bold' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <MapPin className="w-4 h-4" /> Manual Location
              </button>
            </div>

            {/* GPS result */}
            {locationTab === 'gps' && !gpsLoading && (
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center flex-shrink-0">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-800">Detected Location</p>
                    <p className="text-sm font-bold text-gray-900">{userLocation.name}</p>
                    {userLocation.accuracyMeters && (
                      <p className="text-[11px] text-gray-500">±{userLocation.accuracyMeters}m accuracy · {userLocation.state}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleGPS}
                  disabled={gpsLoading}
                  className="text-xs font-semibold text-brand-700 bg-white border border-brand-300 px-3 py-1.5 rounded-lg hover:bg-brand-50 flex items-center gap-1"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${gpsLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            )}
            {gpsLoading && (
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 flex items-center gap-3 text-sm text-brand-700 font-medium">
                <Loader2 className="w-4 h-4 animate-spin" /> Fetching your GPS location...
              </div>
            )}
            {gpsError && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />{gpsError}
              </p>
            )}

            {/* Manual location dropdown */}
            {locationTab === 'manual' && (
              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    value={locDropOpen ? locQuery : userLocation.name}
                    onChange={e => { setLocQuery(e.target.value); setLocDropOpen(true); }}
                    onFocus={() => setLocDropOpen(true)}
                    placeholder="Search any city, town, district or state in India..."
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
                  />
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <ChevronDown
                    className="absolute right-3 top-3 w-4 h-4 text-gray-400 cursor-pointer"
                    onClick={() => setLocDropOpen(v => !v)}
                  />
                </div>
                {locDropOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto divide-y divide-gray-50">
                    {filteredLocs.length ? filteredLocs.map(loc => {
                      const sel = userLocation.name.startsWith(loc.name);
                      return (
                        <button key={loc.id}
                          onClick={() => {
                            setUserLocation({ name: loc.name, state: loc.state, latitude: loc.latitude, longitude: loc.longitude, isGPS: false });
                            setLocDropOpen(false); setLocQuery('');
                          }}
                          className={`w-full text-left px-4 py-2.5 flex justify-between items-center text-sm hover:bg-brand-50 transition-colors ${sel ? 'bg-brand-50 text-brand-700 font-bold' : 'text-gray-700'}`}
                        >
                          <div>
                            <span className="font-semibold">{loc.name}</span>
                            <span className="text-xs text-gray-400 ml-2">{loc.state}</span>
                          </div>
                          {sel && <Check className="w-4 h-4 text-brand-600" />}
                        </button>
                      );
                    }) : (
                      <p className="text-xs text-center text-gray-500 py-5">
                        No location found. Try city (e.g. Chennai, Jaipur) or state name (e.g. Kerala, Punjab).
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <hr className="border-gray-100" />

          {/* ── MEDICINE NAME INPUT ── */}
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-gray-800">💊 Medicine Name</label>
            <div className="relative">
              <input
                id="medicine-input"
                type="text"
                value={medQuery}
                onChange={e => setMedQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') executeSearch(); }}
                onFocus={() => medQuery.length >= 1 && setShowSug(true)}
                placeholder="Type any medicine name — it will appear in search list..."
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
              />
              <Pill className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400 -rotate-45" />
            </div>

            {/* Autocomplete — user's input always first */}
            {showSug && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto divide-y divide-gray-50">
                {suggestions.map((s, i) => (
                  <button key={i}
                    onClick={() => { setMedQuery(s); setShowSug(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-brand-50 flex items-center justify-between text-sm transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Pill className="w-3.5 h-3.5 text-gray-300 -rotate-45 flex-shrink-0" />
                      <span className="font-medium text-gray-900">{s}</span>
                    </div>
                    {i === 0 && s.toLowerCase() === medQuery.trim().toLowerCase() && (
                      <span className="text-[10px] font-bold bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full flex-shrink-0">
                        Your Input
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── QUICK SEARCH PILLS ── */}
          <div className="flex flex-wrap gap-1.5 items-center text-xs">
            <span className="text-gray-400 font-medium flex items-center gap-1 mr-1">
              <Sparkles className="w-3 h-3 text-brand-500" /> Quick:
            </span>
            {['Paracetamol', 'Dolo 650', 'Crocin', 'ORS Electral', 'Cetirizine', 'Azithromycin', 'Pantoprazole', 'Combiflam'].map(m => (
              <button key={m}
                onClick={() => { setMedQuery(m); }}
                className="bg-gray-100 hover:bg-brand-50 hover:text-brand-700 text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200 transition-colors font-medium"
              >
                {m}
              </button>
            ))}
          </div>

          {/* ── PRESCRIPTION UPLOAD ── */}
          <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50 hover:bg-white transition-colors space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-600" />
                <span className="text-sm font-semibold text-gray-800">OR Upload Prescription</span>
              </div>
              <span className="text-xs text-gray-400 font-medium">PNG · JPEG · JPG · PDF</span>
            </div>

            {!uploadedFile ? (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-brand-500 rounded-xl p-5 cursor-pointer bg-white transition-all group">
                <Upload className="w-6 h-6 text-gray-400 group-hover:text-brand-600 mb-1.5" />
                <span className="text-xs font-semibold text-gray-700 group-hover:text-brand-700">
                  Click to upload prescription
                </span>
                <span className="text-[11px] text-gray-400 mt-0.5">
                  AI OCR will auto-extract medicine names
                </span>
                <input type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={handleFileUpload} className="hidden" />
              </label>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-2.5">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-700 truncate">
                    <FileText className="w-4 h-4 text-brand-600 flex-shrink-0" />
                    <span className="truncate">{uploadedFile}</span>
                  </div>
                  <button onClick={() => { setUploadedFile(null); setChips([]); }}
                    className="text-xs text-gray-400 hover:text-red-600 font-medium ml-2 flex-shrink-0">
                    Remove
                  </button>
                </div>

                {ocrLoading && (
                  <div className="flex items-center gap-2 text-xs font-medium text-brand-700 bg-brand-50 rounded-lg p-3">
                    <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
                    AI scanning prescription and extracting medicines...
                  </div>
                )}

                {!ocrLoading && chips.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-gray-700">
                        Extracted Medicines ({chips.length})
                      </p>
                      <button onClick={() => setShowAddChip(true)}
                        className="text-xs text-brand-600 hover:text-brand-800 font-semibold flex items-center gap-1">
                        <Plus className="w-3.5 h-3.5" /> Add Medicine
                      </button>
                    </div>

                    {showAddChip && (
                      <div className="flex items-center gap-2">
                        <input type="text" value={newChipName} onChange={e => setNewChipName(e.target.value)}
                          placeholder="Enter medicine name..."
                          onKeyDown={e => e.key === 'Enter' && addChip()}
                          className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-500" />
                        <button onClick={addChip} className="bg-brand-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-brand-700">Add</button>
                        <button onClick={() => setShowAddChip(false)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {chips.map(chip => (
                        editingChipId === chip.id ? (
                          <div key={chip.id} className="flex items-center gap-1 bg-white border border-brand-300 p-1 rounded-lg">
                            <input type="text" value={editingChipVal}
                              onChange={e => setEditingChipVal(e.target.value)}
                              onKeyDown={e => e.key === 'Enter' && saveEditChip(chip.id)}
                              className="px-2 py-0.5 text-xs text-gray-800 focus:outline-none w-28" />
                            <button onClick={() => saveEditChip(chip.id)} className="text-emerald-600 hover:text-emerald-800 p-0.5">
                              <Check className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div key={chip.id}
                            className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm hover:border-brand-300 transition-all text-xs font-medium text-gray-800">
                            <span>{chip.name}</span>
                            {chip.dosage && <span className="text-gray-400 text-[11px]">({chip.dosage})</span>}
                            <div className="flex items-center gap-1 pl-1 border-l border-gray-200">
                              <button onClick={() => searchChip(chip.name)} title="Search this medicine"
                                className="text-brand-600 hover:text-brand-800 p-0.5">
                                <Search className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => startEditChip(chip)} title="Edit"
                                className="text-gray-400 hover:text-gray-600 p-0.5">
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button onClick={() => deleteChip(chip.id)} title="Remove"
                                className="text-gray-400 hover:text-red-600 p-0.5">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── FIND MEDICINE BUTTON ── */}
          <button
            onClick={() => executeSearch()}
            disabled={searching || !medQuery.trim()}
            className="w-full py-4 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 text-white font-bold text-lg rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            {searching
              ? <><Loader2 className="w-6 h-6 animate-spin" />Searching nearby pharmacies...</>
              : <><Search className="w-6 h-6" />Find Medicine</>
            }
          </button>
        </div>

        {/* ══════════════ RESULTS SECTION ══════════════ */}
        {searched && !searching && (
          <div className="space-y-6 pt-2 border-t border-gray-200">
            {results.length > 0 ? (
              <>
                {/* Filter Bar */}
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <ArrowUpDown className="w-4 h-4 text-brand-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">Sort by:</span>
                    <div className="flex gap-1 bg-gray-100 p-1 rounded-xl text-xs flex-1 sm:flex-none">
                      {(['distance', 'price', 'stock'] as const).map(s => (
                        <button key={s} onClick={() => setSortBy(s)}
                          className={`py-1.5 px-3 rounded-lg font-medium transition-all ${sortBy === s ? 'bg-white text-brand-600 shadow font-bold' : 'text-gray-600'}`}>
                          {s === 'distance' ? 'Nearest' : s === 'price' ? 'Lowest Price' : 'Highest Stock'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <select value={filterAvail} onChange={e => setFilterAvail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-xs font-medium rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-500 flex-1 sm:flex-none">
                      <option value="all">All Availability</option>
                      <option value="in_stock">In Stock Only</option>
                      <option value="limited">Limited Stock Only</option>
                    </select>
                    <select value={filterState} onChange={e => setFilterState(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-xs font-medium rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-500 flex-1 sm:flex-none">
                      <option value="all">All States</option>
                      {availableStates.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Result Header */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {results.length} Pharmacies Near {userLocation.name}
                      </h2>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Showing nearest available pharmacies for{' '}
                      <span className="font-semibold text-gray-800">"{lastQuery}"</span>
                    </p>
                  </div>
                  {results.length > 1 && (
                    <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 flex items-center gap-3 text-xs flex-shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                        <TrendingDown className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Price Range: ₹{minP} – ₹{maxP}</p>
                        {maxP > minP ? (
                          <p className="text-[11px] text-gray-500">
                            Save up to <span className="font-semibold text-emerald-600">₹{maxP - minP}</span> by comparing stores
                          </p>
                        ) : (
                          <p className="text-[11px] text-gray-500">Same price at all stores</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Pharmacy Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {results.map((res, idx) => (
                    <div key={idx}
                      className={`relative bg-white rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-all hover:shadow-lg ${res.isBestMatch ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' : 'border-gray-200 shadow-sm'}`}>

                      {res.isBestMatch && (
                        <div className="absolute -top-3 left-5 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow">
                          <Star className="w-3.5 h-3.5 fill-white" /> BEST MATCH
                        </div>
                      )}

                      <div>
                        {/* Name + Distance */}
                        <div className="flex items-start justify-between gap-2 mt-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-gray-900 leading-tight">{res.pharmacy.name}</h3>
                            <p className="text-xs text-gray-500 flex items-start gap-1 mt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span className="truncate">{res.pharmacy.address}</span>
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="bg-brand-50 text-brand-700 px-2.5 py-1 rounded-lg font-bold text-sm flex items-center gap-1">
                              <Navigation className="w-3.5 h-3.5" />{res.distanceKm} km
                            </div>
                            <p className="text-[11px] text-gray-500 mt-0.5 flex items-center justify-end gap-1">
                              <Car className="w-3 h-3" />~{res.travelTimeMinutes} min
                            </p>
                          </div>
                        </div>

                        {/* Medicine + Price */}
                        <div className="my-4 p-3 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100">
                          <div>
                            <p className="text-xs text-gray-500">Requested Medicine</p>
                            <p className="text-sm font-bold text-gray-900">{res.medicineName}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Price</p>
                            <p className="text-2xl font-extrabold text-brand-700">₹{res.price}</p>
                          </div>
                        </div>

                        {/* Stock + Hours */}
                        <div className="flex items-center justify-between text-xs mb-3">
                          <div className="flex items-center gap-2">
                            {res.availabilityStatus === 'In Stock' ? (
                              <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-semibold border border-emerald-200">
                                <CheckCircle className="w-3.5 h-3.5" />In Stock
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md font-semibold border border-amber-200">
                                <AlertTriangle className="w-3.5 h-3.5" />Limited Stock
                              </span>
                            )}
                            <span className="text-gray-500">({res.stockQuantity} units)</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span className={res.pharmacy.is24Hours ? 'text-emerald-600 font-semibold' : ''}>
                              {res.pharmacy.openingHours}
                            </span>
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <a href={`tel:${res.pharmacy.phone}`} className="text-brand-600 hover:underline font-medium">
                            {res.pharmacy.phone}
                          </a>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${res.pharmacy.latitude},${res.pharmacy.longitude}`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition-colors"
                        >
                          <Navigation className="w-4 h-4 text-brand-600" />Get Directions
                        </a>
                        <button
                          onClick={() => setResTarget(res)}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow transition-all"
                        >
                          <BookmarkPlus className="w-4 h-4" />Reserve Medicine
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm max-w-xl mx-auto space-y-4">
                <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-500 mx-auto flex items-center justify-center border border-amber-200">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  This medicine is currently unavailable in our pharmacy network.
                </h3>
                <p className="text-sm text-gray-500">
                  No pharmacies near <b>{userLocation.name}</b> have <b>"{lastQuery}"</b> in stock right now.
                </p>
                <div className="bg-gray-50 p-4 rounded-xl text-xs text-gray-600 text-left border border-gray-100 space-y-1">
                  <p className="font-semibold text-gray-800">Suggestions:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Check spelling or try the generic name (e.g. Paracetamol instead of brand name)</li>
                    <li>Try selecting a larger city or different location</li>
                    <li>Upload your prescription — AI OCR will extract alternative drug names</li>
                  </ul>
                </div>
                <button onClick={() => { setSearched(false); setMedQuery(''); setResults([]); }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow">
                  <RefreshCw className="w-4 h-4" /> Try Another Search
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="bg-white border-t border-gray-200 py-5 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-2.5 font-bold text-gray-800">
            <img src="/logo.png" alt="MediGo" className="h-6 w-auto object-contain" />
            <span className="text-gray-300 font-normal">|</span>
            <span>All-India Pharmacy Network</span>
          </div>
          <p>© {new Date().getFullYear()} MEDIGO · Future API Ready (MediCare / MediSoft)</p>
        </div>
      </footer>

      {/* ══════════════ RESERVATION MODAL ══════════════ */}
      {resTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
            <button onClick={closeReservation}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>

            {!reservation ? (
              <form onSubmit={handleConfirmReservation} className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Instant Stock Hold</span>
                  <h2 className="text-xl font-bold text-gray-900 mt-0.5">Reserve Medicine</h2>
                  <p className="text-xs text-gray-500 mt-1">Hold stock for pickup. No payment required online.</p>
                </div>
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>{resTarget.pharmacy.name}</span>
                    <span className="text-brand-600 text-base font-extrabold">₹{resTarget.price}</span>
                  </div>
                  <p className="text-gray-700 font-semibold">{resTarget.medicineName}</p>
                  <p className="text-gray-400">{resTarget.pharmacy.address}</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name</label>
                    <input type="text" value={resName} onChange={e => setResName(e.target.value)} required
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number</label>
                    <input type="tel" value={resPhone} onChange={e => setResPhone(e.target.value)} required
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                </div>
                <button type="submit"
                  className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow text-sm transition-all">
                  Confirm Reservation
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4 py-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-9 h-9" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Confirmed!</span>
                  <h2 className="text-xl font-bold text-gray-900 mt-0.5">Medicine Reserved Successfully!</h2>
                  <p className="text-xs text-gray-500 mt-1">Your stock has been locked at the store counter.</p>
                </div>
                <div className="bg-brand-50 border-2 border-brand-300 p-4 rounded-xl">
                  <p className="text-xs text-brand-700 font-semibold uppercase mb-1">Reservation ID</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-extrabold text-brand-900 font-mono tracking-wider">
                      {reservation.code}
                    </span>
                    <button onClick={() => { navigator.clipboard.writeText(reservation.code); setCopied(true); }}
                      className="text-brand-700 hover:text-brand-900 p-1">
                      {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">Hold expires: <b className="text-gray-700">{reservation.expiresAt}</b></p>
                </div>
                <div className="text-left text-xs bg-gray-50 p-3 rounded-xl space-y-1.5 text-gray-700">
                  <p><b className="text-gray-900">Store:</b> {reservation.pharmacyName}</p>
                  <p><b className="text-gray-900">Address:</b> {reservation.pharmacyAddress}</p>
                  <p><b className="text-gray-900">Medicine:</b> {reservation.medicineName}</p>
                  <p><b className="text-gray-900">Total:</b> ₹{reservation.price}</p>
                </div>
                <button onClick={closeReservation}
                  className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-xl transition-colors">
                  Done / Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
