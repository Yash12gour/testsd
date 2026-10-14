export type WorkspaceCategory = 'all' | 'solo' | 'team' | 'flexible';

export interface WorkspaceItem {
  id: string;
  title: string;
  category: 'solo' | 'team' | 'flexible';
  shortDesc: string;
  fullDesc: string;
  price: string;
  period: string;
  capacity: string;
  sqft?: string;
  availability: string;
  features: string[];
  imageUrl: string;
  badge?: string;
  accentCol?: string;
  isPopular?: boolean;
}

export interface AmenityItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
}

export interface LocationItem {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  city: string;
  postalCode: string;
  hours: string;
  phone: string;
  transit: string;
  landmarks: string[];
  features: string[];
  availableDesks?: number;
  imageUrl: string;
  mapCoords?: { x: number; y: number }; // percentage on custom stylized map
  mapUrl?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  metric?: string;
  avatarUrl?: string;
  personImage?: string;
  bgImage?: string;
  spaceType?: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  attendees: number;
  host: string;
  description: string;
}

export interface TourBookingData {
  locationId: string;
  workspaceType: string;
  date: string;
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  teamSize: string;
  notes?: string;
}
