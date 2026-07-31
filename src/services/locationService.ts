import { KeralaLocation } from '../types';
import { KERALA_LOCATIONS, DEFAULT_LOCATION } from '../data/keralaLocations';
import { calculateHaversineDistance } from '../utils/haversine';

export interface UserLocationState {
  isGPS: boolean;
  localityName: string;
  district: string;
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
}

/**
 * Get current browser GPS location with fallback to nearest Kerala locality
 */
export async function getCurrentGPSLocation(): Promise<UserLocationState> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        // Find nearest Kerala locality for friendly label
        const nearestLoc = findNearestKeralaLocality(lat, lng);

        resolve({
          isGPS: true,
          localityName: nearestLoc ? `${nearestLoc.name} (GPS)` : `Current Location (${lat.toFixed(4)}°, ${lng.toFixed(4)}°)`,
          district: nearestLoc ? nearestLoc.district : 'Ernakulam',
          latitude: lat,
          longitude: lng,
          accuracyMeters: Math.round(accuracy)
        });
      },
      (error) => {
        let msg = 'Failed to fetch GPS location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission was denied by user.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location position unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location request timed out.';
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000
      }
    );
  });
}

/**
 * Find the nearest Kerala locality from a lat/lng point
 */
export function findNearestKeralaLocality(lat: number, lng: number): KeralaLocation | null {
  let closest: KeralaLocation | null = null;
  let minDistance = Infinity;

  KERALA_LOCATIONS.forEach((loc) => {
    const dist = calculateHaversineDistance(lat, lng, loc.latitude, loc.longitude);
    if (dist < minDistance) {
      minDistance = dist;
      closest = loc;
    }
  });

  return closest;
}

/**
 * Convert selected KeralaLocation to UserLocationState
 */
export function createLocationFromKeralaLocation(loc: KeralaLocation): UserLocationState {
  return {
    isGPS: false,
    localityName: loc.name,
    district: loc.district,
    latitude: loc.latitude,
    longitude: loc.longitude
  };
}

export function getDefaultUserLocation(): UserLocationState {
  return createLocationFromKeralaLocation(DEFAULT_LOCATION);
}
