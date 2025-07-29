export type MenuItem = 'dashboard' | 'influencers' | 'brands' | 'campaigns' | 'reminders' | 'notifications';

export interface InfluencerProfile {
  id: string;
  name: string;
  profileImage: string;
  platform: string;
  followers: number;
  engagementRate: number;
  category: string;
  location: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface Brand {
  id: string;
  name: string;
  owner_name?: string;
  email?: string;
  phone?: string;
  industry: string;
  logo?: string;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  influencer_id: string;
  brand_id: string;
  name?: string;
  amount: number;
  shoot_date?: string;
  notes?: string;
  approved: boolean;
  post_link?: string;
  paid_amount: number;
  paid_date?: string;
  status: string;
  type: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
  influencer?: InfluencerProfile;
  brand?: Brand;
}

export interface PendingDraft {
  id: string;
  influencerName: string;
  brandName: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

export interface PendingPayment {
  id: string;
  influencerName: string;
  brandName: string;
  amount: number;
  status: 'overdue' | 'due' | 'upcoming';
}

export interface RecentPost {
  id: string;
  influencerName: string;
  brandName: string;
  status: 'live' | 'scheduled';
  engagement: string;
}