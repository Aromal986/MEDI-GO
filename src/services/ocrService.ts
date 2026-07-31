import { ExtractedMedicineChip } from '../types';

const SAMPLE_PRESCRIPTION_RESULTS = [
  [
    { name: 'Paracetamol', dosage: '650 mg' },
    { name: 'Pantoprazole', dosage: '40 mg' },
    { name: 'Cetirizine', dosage: '10 mg' }
  ],
  [
    { name: 'Dolo 650', dosage: '650 mg' },
    { name: 'Azithromycin', dosage: '500 mg' },
    { name: 'ORS (Electral Powder)', dosage: '21.8 g' }
  ],
  [
    { name: 'Amoxicillin', dosage: '500 mg' },
    { name: 'Vitamin C', dosage: '500 mg' },
    { name: 'Ibuprofen', dosage: '400 mg' }
  ]
];

/**
 * Simulate AI OCR prescription scanning on an uploaded image or PDF file
 */
export async function simulatePrescriptionOCR(file: File): Promise<ExtractedMedicineChip[]> {
  // Simulate network processing delay (800ms)
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Pick sample set based on filename / random seed
  const sampleIndex = Math.abs(file.name.length + file.size) % SAMPLE_PRESCRIPTION_RESULTS.length;
  const rawList = SAMPLE_PRESCRIPTION_RESULTS[sampleIndex];

  return rawList.map((item, idx) => ({
    id: `chip-${Date.now()}-${idx}`,
    name: item.name,
    dosage: item.dosage,
    isConfirmed: true
  }));
}
