import { KeralaLocation } from '../types';

export const KERALA_LOCATIONS: KeralaLocation[] = [
  { id: 'kochi', name: 'Kochi (Cochin)', district: 'Ernakulam', latitude: 9.9312, longitude: 76.2673 },
  { id: 'kaloor', name: 'Kaloor, Kochi', district: 'Ernakulam', latitude: 9.9981, longitude: 76.2999 },
  { id: 'edapally', name: 'Edappally, Kochi', district: 'Ernakulam', latitude: 10.0261, longitude: 76.3125 },
  { id: 'kakkanad', name: 'Kakkanad, Kochi', district: 'Ernakulam', latitude: 10.0159, longitude: 76.3419 },
  { id: 'vytilla', name: 'Vyttila, Kochi', district: 'Ernakulam', latitude: 9.9658, longitude: 76.3195 },
  { id: 'alappuzha', name: 'Alappuzha (Alleppey)', district: 'Alappuzha', latitude: 9.4981, longitude: 76.3388 },
  { id: 'kayamkulam', name: 'Kayamkulam', district: 'Alappuzha', latitude: 9.1724, longitude: 76.4999 },
  { id: 'chengannur', name: 'Chengannur', district: 'Alappuzha', latitude: 9.3175, longitude: 76.6127 },
  { id: 'cherthala', name: 'Cherthala', district: 'Alappuzha', latitude: 9.6845, longitude: 76.3323 },
  { id: 'trivandrum', name: 'Thiruvananthapuram (Trivandrum)', district: 'Thiruvananthapuram', latitude: 8.5241, longitude: 76.9366 },
  { id: 'kazhakoottam', name: 'Kazhakkoottam, Trivandrum', district: 'Thiruvananthapuram', latitude: 8.5686, longitude: 76.8731 },
  { id: 'thrissur', name: 'Thrissur', district: 'Thrissur', latitude: 10.5276, longitude: 76.2144 },
  { id: 'kozhikode', name: 'Kozhikode (Calicut)', district: 'Kozhikode', latitude: 11.2588, longitude: 75.7804 },
  { id: 'kollam', name: 'Kollam (Quilon)', district: 'Kollam', latitude: 8.8932, longitude: 76.6141 },
  { id: 'kottayam', name: 'Kottayam', district: 'Kottayam', latitude: 9.5916, longitude: 76.5222 },
  { id: 'kannur', name: 'Kannur', district: 'Kannur', latitude: 11.8745, longitude: 75.3704 },
  { id: 'palakkad', name: 'Palakkad', district: 'Palakkad', latitude: 10.7867, longitude: 76.6548 },
  { id: 'malappuram', name: 'Malappuram', district: 'Malappuram', latitude: 11.0732, longitude: 76.0740 },
  { id: 'manjeri', name: 'Manjeri', district: 'Malappuram', latitude: 11.1202, longitude: 76.1226 },
  { id: 'tirur', name: 'Tirur', district: 'Malappuram', latitude: 10.9147, longitude: 75.9234 },
  { id: 'thiruvalla', name: 'Thiruvalla', district: 'Pathanamthitta', latitude: 9.3834, longitude: 76.5741 },
  { id: 'pathanamthitta', name: 'Pathanamthitta', district: 'Pathanamthitta', latitude: 9.2648, longitude: 76.7870 },
  { id: 'idukki', name: 'Thodupuzha, Idukki', district: 'Idukki', latitude: 9.8942, longitude: 76.7176 },
  { id: 'wayanad', name: 'Kalpetta, Wayanad', district: 'Wayanad', latitude: 11.6103, longitude: 76.0827 },
  { id: 'kasaragod', name: 'Kasaragod', district: 'Kasaragod', latitude: 12.5102, longitude: 74.9852 }
];

export const DEFAULT_LOCATION = KERALA_LOCATIONS[1]; // Kaloor, Kochi
