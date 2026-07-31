import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { SearchResult } from '../types';
import { UserLocationState } from '../services/locationService';

interface MapViewProps {
  userLocation: UserLocationState;
  results: SearchResult[];
  onReserve: (result: SearchResult) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  userLocation,
  results,
  onReserve
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map if not created
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false
      }).setView([userLocation.latitude, userLocation.longitude], 12);

      // Clean OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | MEDIGO'
      }).addTo(map);

      mapInstanceRef.current = map;
      markersLayerRef.current = L.layerGroup().addTo(map);
    }

    const map = mapInstanceRef.current;
    const layerGroup = markersLayerRef.current;

    if (!map || !layerGroup) return;

    // Clear old markers
    layerGroup.clearLayers();

    // 1. User Location Pin Icon
    const userIcon = L.divIcon({
      className: 'custom-user-pin',
      html: `<div class="custom-user-pin-inner"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const userMarker = L.marker([userLocation.latitude, userLocation.longitude], {
      icon: userIcon
    }).bindPopup(`
      <div class="p-1 text-center font-sans">
        <strong style="color: #2563eb; font-size: 13px;">📍 Your Selected Location</strong>
        <p style="margin: 2px 0 0 0; font-size: 11px; color: #4b5563;">${userLocation.localityName}</p>
      </div>
    `);

    layerGroup.addLayer(userMarker);

    const bounds = L.latLngBounds([[userLocation.latitude, userLocation.longitude]]);

    // 2. Pharmacy Pins
    results.forEach((res) => {
      const ph = res.pharmacy;
      bounds.extend([ph.latitude, ph.longitude]);

      const phIcon = L.divIcon({
        className: 'custom-pharmacy-pin',
        html: `<div class="custom-pharmacy-pin-inner">₹${res.price} • ${res.distanceKm}km</div>`,
        iconSize: [100, 30],
        iconAnchor: [50, 15]
      });

      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${ph.latitude},${ph.longitude}&travelmode=driving`;

      const popupHtml = `
        <div style="font-family: sans-serif; padding: 4px; max-width: 220px;">
          <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold; color: #111827;">${ph.name}</h4>
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #6b7280;">${ph.address}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; background: #f3f4f6; padding: 6px; border-radius: 6px; margin-bottom: 8px;">
            <span style="font-size: 11px; color: #374151;">${res.medicine.name}</span>
            <strong style="font-size: 13px; color: #0284c7;">₹${res.price}</strong>
          </div>
          <div style="font-size: 11px; color: #059669; font-weight: 600; margin-bottom: 8px;">
            ${res.availabilityStatus} (${res.stockQuantity} units)
          </div>
          <div style="display: flex; gap: 4px;">
            <a href="${googleMapsUrl}" target="_blank" style="flex: 1; text-align: center; background: #e5e7eb; color: #1f2937; padding: 5px; border-radius: 4px; text-decoration: none; font-size: 10px; font-weight: 600;">Directions</a>
          </div>
        </div>
      `;

      const marker = L.marker([ph.latitude, ph.longitude], { icon: phIcon }).bindPopup(popupHtml);
      layerGroup.addLayer(marker);
    });

    // Fit map bounds smoothly
    if (results.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    } else {
      map.setView([userLocation.latitude, userLocation.longitude], 12);
    }
  }, [userLocation, results]);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 flex items-center space-x-2">
          <span>🗺️ Pharmacy Map View</span>
          <span className="text-xs font-normal text-gray-500">
            ({results.length} markers displayed)
          </span>
        </h3>
        <span className="text-xs text-brand-600 font-medium">
          Click pin for store details & directions
        </span>
      </div>

      <div className="h-[380px] sm:h-[450px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </div>
  );
};
