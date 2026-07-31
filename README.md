# 💊 MEDIGO - Kerala Pharmacy Medicine Availability Finder

MEDIGO is a production-ready web application built to help users in Kerala instantly find nearest pharmacies where their required medicine is available in stock.

![MEDIGO Banner](https://img.shields.io/badge/MEDIGO-Production--Ready-0284c7?style=for-the-badge&logo=react)
![Tech Stack](https://img.shields.io/badge/Stack-React_|_TypeScript_|_Vite_|_Tailwind_|_Leaflet-059669?style=for-the-badge)

---

## 🎯 Purpose

MEDIGO is **not** an online pharmacy or medicine delivery app. Its sole objective is:
**Help users instantly locate nearby pharmacies in Kerala where their required medicine is in stock.**

---

## ✨ Features

- **📍 Dual Location Engine**:
  - *GPS Location*: Browser Geolocation API with reverse geocoding to nearest Kerala locality & accuracy estimation.
  - *Manual Location*: Autocomplete selection for major Kerala towns across all 14 districts (*Kochi, Kayamkulam, Chengannur, Alappuzha, Thrissur, Trivandrum, Kozhikode, Kollam, Kottayam, Kannur, etc.*). Manual location overrides GPS cleanly.

- **💊 Medicine Search & AI OCR**:
  - Search bar with live autocomplete suggestions for **1,000+ medicines**.
  - **Prescription Upload (PNG, JPG, PDF)** with simulated AI OCR scanning that extracts medicine names into editable, deletable, and searchable chips.

- **🎯 Haversine Distance & Silent Search Expansion**:
  - Exact great-circle distance calculation using lat/lng coordinates and the Haversine formula.
  - Silent search radius expansion (1 km → 50 km) returning **5 to 10 pharmacy results** every time.
  - **Common Medicines** (*Paracetamol, Dolo 650, Crocin, Cetirizine, Pantoprazole, ORS*) appear within 1–5 km.
  - **Rare Medicines** (*Tocilizumab, Pirfenidone, Amphotericin B, Remdesivir*) expand to farther distances while maintaining multiple store options.

- **🏷️ Price Comparison & Store Cards**:
  - `BEST MATCH` badge awarded to the nearest/best store result.
  - Store Name, Address, Phone Number (clickable `tel:` link), Operating Hours (`24 Hours Open` or `8 AM - 10 PM`).
  - Medicine Price in Indian Rupees (**₹**) and Stock Status (`In Stock` / `Limited Stock`).
  - Price comparison callout highlighting price variations across stores and potential savings.

- **🗺️ Interactive Pharmacy Map**:
  - Leaflet map displaying user position and store markers styled with live prices.
  - Direct `Get Directions` button linking to Google Maps navigation.

- **📝 Stock Reservation**:
  - Customer reservation form issuing a unique **Reservation ID** (e.g. `RES-MED-84920`) with 4-hour stock hold instructions.

- **🔌 Future-API Ready**:
  - Modular structure (`types/`, `data/`, `services/`, `components/`) ready for live inventory API integration (*MediCare*, *MediSoft*).

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Maps**: Leaflet / OpenStreetMap
- **Distance Math**: Haversine Formula (Spherical Trigonometry)

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd MEDI-GO
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```
MEDI-GO/
├── src/
│   ├── components/       # Header, SearchCard, PharmacyCard, PharmacyList, MapView, etc.
│   ├── data/             # Mock DB (500+ Pharmacies, 1000+ Medicines, Kerala towns)
│   ├── services/         # Location service, Search engine, AI OCR simulation
│   ├── utils/            # Haversine math & travel time calculations
│   ├── types/            # TypeScript interfaces
│   ├── App.tsx           # Main application view
│   ├── main.tsx          # React mount entry
│   └── index.css         # Tailwind & custom CSS
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```
