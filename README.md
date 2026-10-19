# 💊 MediGo - Pharmacy Medicine Availability Finder

**MediGo** is a modern, lightweight, production-ready web application that helps users instantly find the nearest pharmacies where their required medicine is available in stock across India.

---

## 🎯 Objective

MediGo is **not** an online pharmacy or medicine delivery app. Its core objective is:
> **Help users instantly find the nearest pharmacies where their required medicine is in stock, with transparent pricing and direct Google Maps directions.**

---

## ✨ Features

- **📍 Dual Location System**:
  - **GPS Detection**: Uses Browser Geolocation API to detect coordinates, locate the nearest city, and estimate accuracy.
  - **Manual Search**: Instant autocomplete search for 300+ cities and towns across all 28 Indian States and 8 Union Territories.

- **💊 Intelligent Medicine Search**:
  - Live autocomplete suggestions for **1,000+ medicines** (OTC, prescription, common, and rare).
  - **Dynamic custom medicine synthesis**: Any custom typed medicine name appears immediately in search and matches nearby pharmacy inventory.

- **📄 AI OCR Prescription Scanner**:
  - Upload prescriptions in **PNG, JPEG, JPG, or PDF** format.
  - Automatically simulates OCR scanning and extracts medicines into editable, deletable, and searchable interactive chips.

- **🧭 Distance & Navigation**:
  - Distance calculated via the mathematical **Haversine Formula** using exact coordinates (never random distances).
  - Silent radius expansion (1 km → 50 km) ensuring 5–10 nearest pharmacy results.
  - **Get Directions**: One-click direct turn-by-turn navigation in Google Maps with exact pharmacy coordinates.

- **🏷️ Price Comparison & Best Match**:
  - Nearest store highlighted with a **BEST MATCH** badge.
  - Price comparison callout indicating lowest to highest store price and potential savings.
  - Stock indicators (**In Stock** / **Limited Stock** with exact units).

- **📝 Instant Stock Reservation**:
  - Users can reserve medicine for counter pickup without paying online.
  - Generates a unique **Reservation ID** (e.g. `RES-ABC-12345`) with hold instructions.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Distance Calculation**: Haversine Formula (Spherical Trigonometry)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
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
├── public/
│   └── logo.png              # MediGo official logo
├── src/
│   ├── assets/               # Brand assets
│   ├── data/
│   │   ├── indiaLocations.ts # 300+ Indian cities and states
│   │   └── mockData.ts       # 1000+ medicines, 500+ pharmacies & dynamic synthesis
│   ├── services/
│   │   └── searchService.ts  # Haversine radius search, sorting & filtering
│   ├── utils/
│   │   └── haversine.ts      # Distance and travel time calculations
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # React DOM entry
│   └── index.css             # Tailwind & custom styling
├── index.html                # HTML entry & favicon
├── package.json
├── tailwind.config.js
└── vite.config.ts
```
