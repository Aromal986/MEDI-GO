import React, { useState } from 'react';
import { Upload, FileText, Check, Trash2, Edit2, Plus, Search, Loader2, X } from 'lucide-react';
import { ExtractedMedicineChip } from '../types';
import { simulatePrescriptionOCR } from '../services/ocrService';

interface PrescriptionUploaderProps {
  onSearchExtractedMedicine: (medicineName: string) => void;
}

export const PrescriptionUploader: React.FC<PrescriptionUploaderProps> = ({
  onSearchExtractedMedicine
}) => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [chips, setChips] = useState<ExtractedMedicineChip[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [newChipName, setNewChipName] = useState<string>('');
  const [showAddInput, setShowAddInput] = useState<boolean>(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setIsScanning(true);

    try {
      const extracted = await simulatePrescriptionOCR(file);
      setChips(extracted);
    } catch (err) {
      console.error('OCR Simulation failed:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleDeleteChip = (id: string) => {
    setChips((prev) => prev.filter((c) => c.id !== id));
  };

  const handleStartEdit = (chip: ExtractedMedicineChip) => {
    setEditingId(chip.id);
    setEditValue(chip.name);
  };

  const handleSaveEdit = (id: string) => {
    if (!editValue.trim()) return;
    setChips((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: editValue.trim() } : c))
    );
    setEditingId(null);
  };

  const handleAddChip = () => {
    if (!newChipName.trim()) return;
    const newChip: ExtractedMedicineChip = {
      id: `chip-custom-${Date.now()}`,
      name: newChipName.trim(),
      isConfirmed: true
    };
    setChips((prev) => [...prev, newChip]);
    setNewChipName('');
    setShowAddInput(false);
  };

  return (
    <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50 hover:bg-white transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-brand-600" />
          <span className="text-sm font-semibold text-gray-800">
            OR Upload Prescription
          </span>
        </div>
        <span className="text-xs text-gray-400 font-medium">
          PNG, JPEG, JPG, PDF supported
        </span>
      </div>

      {/* Upload Zone */}
      {!uploadedFileName ? (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-brand-500 rounded-xl p-4 cursor-pointer bg-white transition-all group">
          <Upload className="w-6 h-6 text-gray-400 group-hover:text-brand-600 mb-1" />
          <span className="text-xs font-semibold text-gray-700 group-hover:text-brand-600">
            Click to upload prescription image or PDF
          </span>
          <span className="text-[11px] text-gray-400 mt-0.5">
            AI OCR will automatically detect required medicine names
          </span>
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2 text-xs font-medium text-gray-700 truncate">
              <FileText className="w-4 h-4 text-brand-600 flex-shrink-0" />
              <span className="truncate">{uploadedFileName}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setUploadedFileName(null);
                setChips([]);
              }}
              className="text-xs text-gray-400 hover:text-red-600 font-medium"
            >
              Remove
            </button>
          </div>

          {/* OCR Scanning Progress */}
          {isScanning && (
            <div className="flex items-center justify-center space-x-2 py-3 bg-brand-50 rounded-lg text-brand-700 text-xs font-medium">
              <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
              <span>Simulating AI OCR Scanning & Extracting Medicines...</span>
            </div>
          )}

          {/* Extracted Medicine Chips */}
          {!isScanning && chips.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-700">
                  Extracted Medicines ({chips.length})
                </p>
                <button
                  type="button"
                  onClick={() => setShowAddInput(true)}
                  className="text-xs text-brand-600 hover:text-brand-800 font-semibold flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Medicine</span>
                </button>
              </div>

              {/* Add Custom Chip Input */}
              {showAddInput && (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newChipName}
                    onChange={(e) => setNewChipName(e.target.value)}
                    placeholder="Enter medicine name..."
                    className="flex-1 px-3 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddChip}
                    className="bg-brand-600 text-white px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-brand-700"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddInput(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Chips List */}
              <div className="flex flex-wrap gap-2">
                {chips.map((chip) => {
                  const isEditing = editingId === chip.id;

                  if (isEditing) {
                    return (
                      <div key={chip.id} className="flex items-center space-x-1 bg-white border border-brand-300 p-1 rounded-lg">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="px-2 py-0.5 text-xs text-gray-800 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(chip.id)}
                          className="text-emerald-600 hover:text-emerald-800 p-0.5"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={chip.id}
                      className="flex items-center space-x-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm hover:border-brand-300 transition-all text-xs font-medium text-gray-800"
                    >
                      <span>{chip.name}</span>
                      {chip.dosage && <span className="text-gray-400 text-[11px]">({chip.dosage})</span>}

                      {/* Action buttons on Chip */}
                      <div className="flex items-center space-x-1 pl-1 border-l border-gray-200">
                        <button
                          type="button"
                          onClick={() => onSearchExtractedMedicine(chip.name)}
                          className="text-brand-600 hover:text-brand-800 p-0.5"
                          title="Search this medicine"
                        >
                          <Search className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStartEdit(chip)}
                          className="text-gray-400 hover:text-gray-600 p-0.5"
                          title="Edit"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteChip(chip.id)}
                          className="text-gray-400 hover:text-red-600 p-0.5"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
