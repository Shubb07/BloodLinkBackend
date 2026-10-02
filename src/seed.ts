export type BloodType = 'O−' | 'O+' | 'A−' | 'A+' | 'B−' | 'B+' | 'AB−' | 'AB+';
export const bloodTypes: BloodType[] = ['O−', 'O+', 'A−', 'A+', 'B−', 'B+', 'AB−', 'AB+'];

export interface InventoryEntry {
  units: number;
  max: number;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  needs: Partial<Record<BloodType, 'critical' | 'low' | 'ok'>>;
}

export interface Donor {
  id: string;
  name: string;
  type: BloodType;
  city: string;
  daysSinceDonation: number;
  available: boolean;
}

export type Urgency = 'critical' | 'high' | 'standard';

export interface BloodRequest {
  id: string;
  patient: string;
  type: BloodType;
  hospital: string;
  urgency: Urgency;
  units: number;
  createdAt: string;
}

export interface Alert {
  id: string;
  level: 'critical' | 'warning' | 'info';
  icon: string;
  title: string;
  text: string;
  hospital: string | null;
  createdAt: string;
}

export interface AppState {
  inventory: Record<BloodType, InventoryEntry>;
  hospitals: Hospital[];
  donors: Donor[];
  requests: BloodRequest[];
  alerts: Alert[];
}

export const seedState: AppState = {
  inventory: {
    'O−': { units: 2, max: 120 },
    'O+': { units: 89, max: 200 },
    'A−': { units: 18, max: 100 },
    'A+': { units: 134, max: 200 },
    'B−': { units: 7, max: 80 },
    'B+': { units: 61, max: 160 },
    'AB−': { units: 14, max: 60 },
    'AB+': { units: 43, max: 120 },
  },
  hospitals: [
    {
      id: 'h1',
      name: 'Bengaluru City Hospital',
      address: '45 MG Road, Bengaluru',
      phone: '+91 80 4012 3400',
      needs: { 'O−': 'critical', 'B−': 'critical', 'AB+': 'low', 'A+': 'ok', 'O+': 'ok' },
    },
    {
      id: 'h2',
      name: 'Whitefield Multispeciality Hospital',
      address: '12 ITPL Main Road, Whitefield, Bengaluru',
      phone: '+91 80 4023 7800',
      needs: { 'AB+': 'critical', 'A−': 'low', 'B+': 'ok', 'O−': 'low' },
    },
    {
      id: 'h3',
      name: 'Koramangala Emergency Care',
      address: '88 80 Feet Road, Koramangala, Bengaluru',
      phone: '+91 80 4034 1122',
      needs: { 'B−': 'critical', 'O−': 'low', 'A+': 'ok', 'AB−': 'low' },
    },
    {
      id: 'h4',
      name: "St. Mary's Hospital",
      address: '45 Sarjapur Road, Jayanagar, Bengaluru',
      phone: '+91 80 4045 3300',
      needs: { 'O+': 'ok', 'A+': 'ok', 'B+': 'low', 'AB+': 'ok' },
    },
    {
      id: 'h5',
      name: 'HSR Layout Medical Centre',
      address: '9 27th Main Road, HSR Layout, Bengaluru',
      phone: '+91 80 4056 9900',
      needs: { 'O−': 'critical', 'O+': 'low', 'A−': 'ok', 'AB−': 'ok' },
    },
    {
      id: 'h6',
      name: 'Electronic City Community Hospital',
      address: '300 Hosa Road, Electronic City, Bengaluru',
      phone: '+91 80 4067 4455',
      needs: { 'A+': 'ok', 'B+': 'ok', 'O+': 'ok', 'AB+': 'low' },
    },
  ],
  donors: [
    { id: 'd1', name: 'Ananya Rao', type: 'O−', city: 'Indiranagar', daysSinceDonation: 0, available: true },
    { id: 'd2', name: 'Arjun Mehta', type: 'A+', city: 'Jayanagar', daysSinceDonation: 12, available: true },
    { id: 'd3', name: 'Priya Nair', type: 'B+', city: 'Koramangala', daysSinceDonation: 45, available: true },
    { id: 'd4', name: 'Rohan Kulkarni', type: 'AB+', city: 'Whitefield', daysSinceDonation: 55, available: false },
    { id: 'd5', name: 'Sneha Reddy', type: 'O+', city: 'HSR Layout', daysSinceDonation: 3, available: true },
    { id: 'd6', name: 'Vikram Shetty', type: 'B−', city: 'Electronic City', daysSinceDonation: 8, available: true },
    { id: 'd7', name: 'Fatima Sheikh', type: 'A−', city: 'Shivajinagar', daysSinceDonation: 30, available: false },
    { id: 'd8', name: 'Karthik Iyer', type: 'O−', city: 'Malleshwaram', daysSinceDonation: 0, available: true },
  ],
  requests: [
    { id: 'r1', patient: 'Patient #8841', type: 'O−', hospital: 'Bengaluru City', urgency: 'critical', units: 2, createdAt: new Date(Date.now() - 8 * 60_000).toISOString() },
    { id: 'r2', patient: 'Patient #9204', type: 'AB+', hospital: 'Whitefield Multispeciality', urgency: 'critical', units: 4, createdAt: new Date(Date.now() - 22 * 60_000).toISOString() },
    { id: 'r3', patient: 'Patient #7719', type: 'B−', hospital: 'Koramangala ER', urgency: 'high', units: 1, createdAt: new Date(Date.now() - 60 * 60_000).toISOString() },
    { id: 'r4', patient: 'Patient #8003', type: 'A+', hospital: "St. Mary's", urgency: 'standard', units: 3, createdAt: new Date(Date.now() - 2 * 3_600_000).toISOString() },
    { id: 'r5', patient: 'Patient #9910', type: 'O+', hospital: 'HSR Layout Medical', urgency: 'standard', units: 2, createdAt: new Date(Date.now() - 3 * 3_600_000).toISOString() },
  ],
  alerts: [
    {
      id: 'a1',
      level: 'critical',
      icon: '🚨',
      title: 'Critical shortage: O− at Bengaluru City Hospital',
      text: 'Only 2 units remain. O− is needed for emergency trauma patients. O− donors within 10 km have been notified.',
      hospital: 'Bengaluru City Hospital',
      createdAt: new Date(Date.now() - 8 * 60_000).toISOString(),
    },
    {
      id: 'a2',
      level: 'critical',
      icon: '🚨',
      title: 'Urgent: AB+ needed at Whitefield Multispeciality',
      text: 'Scheduled surgeries require 4 units of AB+ within 6 hours. Current stock critically low.',
      hospital: 'Whitefield Multispeciality Hospital',
      createdAt: new Date(Date.now() - 22 * 60_000).toISOString(),
    },
    {
      id: 'a3',
      level: 'warning',
      icon: '⚠️',
      title: 'Low B− supply — Koramangala Emergency Care',
      text: 'B− stock has dropped to 7 units city-wide. Routine surgeries may be affected if supplies are not replenished within 48 hours.',
      hospital: 'Koramangala Emergency Care',
      createdAt: new Date(Date.now() - 3_600_000).toISOString(),
    },
  ],
};
