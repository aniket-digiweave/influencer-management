import { GoogleSpreadsheet } from 'google-spreadsheet';

// Google Sheets configuration
const SHEET_ID = '1F5sipZNGIKWF3cq3Bb9BxzCURC73eVb5I3xi0-jvn_w';
const SLOT_7_SHEET_NAME = 'Slot 7'; // Adjust this based on actual sheet name

// Types for our data
export interface InfluencerData {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  platform: string;
  followers: number;
  engagementRate: number;
  category: string;
  location: string;
  status: string;
  profileImage: string;
}

export interface BrandData {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  industry: string;
  logo: string;
}

export interface CampaignData {
  id: string;
  influencerId: string;
  brandId: string;
  name: string;
  amount: number;
  shootDate: string;
  notes: string;
  approved: boolean;
  postLink: string;
  paidAmount: number;
  paidDate: string;
  status: string;
  type: string;
  paymentStatus: string;
}

class GoogleSheetsService {
  private doc: GoogleSpreadsheet | null = null;

  async initialize() {
    try {
      // For demo purposes, we'll use mock data
      // In production, you'd set up proper Google Sheets API credentials
      console.log('Google Sheets service initialized');
      return true;
    } catch (error) {
      console.error('Failed to initialize Google Sheets:', error);
      return false;
    }
  }

  // Mock data for demonstration
  private mockInfluencers: InfluencerData[] = [
    {
      id: '1',
      name: 'mumbaicityexplore',
      username: '@mumbaicityexplore',
      email: 'mumbai@example.com',
      phone: '+91 98765 43210',
      platform: 'Instagram',
      followers: 125000,
      engagementRate: 4.2,
      category: 'Travel',
      location: 'Mumbai, India',
      status: 'active',
      profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '2',
      name: 'luxurious_tarunwadhwani',
      username: '@luxurious_tarunwadhwani',
      email: 'tarun@example.com',
      phone: '+91 98765 43211',
      platform: 'Instagram',
      followers: 89000,
      engagementRate: 6.8,
      category: 'Luxury',
      location: 'Delhi, India',
      status: 'active',
      profileImage: 'https://images.pexels.com/photos/428321/pexels-photo-428321.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '3',
      name: 'about_every_damnthing',
      username: '@about_every_damnthing',
      email: 'everything@example.com',
      phone: '+91 98765 43212',
      platform: 'Instagram',
      followers: 234000,
      engagementRate: 8.1,
      category: 'Lifestyle',
      location: 'Bangalore, India',
      status: 'active',
      profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  private mockBrands: BrandData[] = [
    {
      id: '1',
      name: 'YFF (Borivali)',
      ownerName: 'Rajesh Kumar',
      email: 'rajesh@yff.com',
      phone: '+91 11 2345 6789',
      industry: 'Food & Beverage',
      logo: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '2',
      name: 'YFF (New Marine)',
      ownerName: 'Priya Sharma',
      email: 'priya@yff.com',
      phone: '+91 11 2345 6790',
      industry: 'Food & Beverage',
      logo: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  private mockCampaigns: CampaignData[] = [
    {
      id: '1',
      influencerId: '1',
      brandId: '1',
      name: 'Summer Food Festival',
      amount: 11000,
      shootDate: '2024-07-01',
      notes: 'Collab Done',
      approved: true,
      postLink: 'https://instagram.com/p/example1',
      paidAmount: 11000,
      paidDate: '2024-07-01',
      status: 'Posted',
      type: 'Collab',
      paymentStatus: 'Paid'
    },
    {
      id: '2',
      influencerId: '2',
      brandId: '1',
      name: 'Luxury Dining Experience',
      amount: 11000,
      shootDate: '2024-06-28',
      notes: 'Collab Done',
      approved: true,
      postLink: '',
      paidAmount: 11000,
      paidDate: '2024-06-28',
      status: 'Posted',
      type: 'Collab',
      paymentStatus: 'Paid'
    },
    {
      id: '3',
      influencerId: '3',
      brandId: '2',
      name: 'Marine Location Review',
      amount: 18000,
      shootDate: '2024-06-30',
      notes: 'Collab Done',
      approved: true,
      postLink: '',
      paidAmount: 18000,
      paidDate: '2024-06-30',
      status: 'Posted',
      type: 'Collab',
      paymentStatus: 'Paid'
    }
  ];

  async getInfluencers(): Promise<InfluencerData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.mockInfluencers];
  }

  async getBrands(): Promise<BrandData[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.mockBrands];
  }

  async getCampaigns(): Promise<CampaignData[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.mockCampaigns];
  }

  async addInfluencer(data: Omit<InfluencerData, 'id'>): Promise<InfluencerData> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newInfluencer: InfluencerData = {
      ...data,
      id: Date.now().toString()
    };
    this.mockInfluencers.push(newInfluencer);
    return newInfluencer;
  }

  async updateInfluencer(id: string, data: Partial<InfluencerData>): Promise<InfluencerData> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = this.mockInfluencers.findIndex(inf => inf.id === id);
    if (index === -1) throw new Error('Influencer not found');
    
    this.mockInfluencers[index] = { ...this.mockInfluencers[index], ...data };
    return this.mockInfluencers[index];
  }

  async deleteInfluencer(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = this.mockInfluencers.findIndex(inf => inf.id === id);
    if (index === -1) throw new Error('Influencer not found');
    
    this.mockInfluencers.splice(index, 1);
  }

  async addBrand(data: Omit<BrandData, 'id'>): Promise<BrandData> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newBrand: BrandData = {
      ...data,
      id: Date.now().toString()
    };
    this.mockBrands.push(newBrand);
    return newBrand;
  }

  async updateBrand(id: string, data: Partial<BrandData>): Promise<BrandData> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = this.mockBrands.findIndex(brand => brand.id === id);
    if (index === -1) throw new Error('Brand not found');
    
    this.mockBrands[index] = { ...this.mockBrands[index], ...data };
    return this.mockBrands[index];
  }

  async deleteBrand(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = this.mockBrands.findIndex(brand => brand.id === id);
    if (index === -1) throw new Error('Brand not found');
    
    this.mockBrands.splice(index, 1);
  }

  async addCampaign(data: Omit<CampaignData, 'id'>): Promise<CampaignData> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newCampaign: CampaignData = {
      ...data,
      id: Date.now().toString()
    };
    this.mockCampaigns.push(newCampaign);
    return newCampaign;
  }

  async updateCampaign(id: string, data: Partial<CampaignData>): Promise<CampaignData> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = this.mockCampaigns.findIndex(campaign => campaign.id === id);
    if (index === -1) throw new Error('Campaign not found');
    
    this.mockCampaigns[index] = { ...this.mockCampaigns[index], ...data };
    return this.mockCampaigns[index];
  }

  async deleteCampaign(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = this.mockCampaigns.findIndex(campaign => campaign.id === id);
    if (index === -1) throw new Error('Campaign not found');
    
    this.mockCampaigns.splice(index, 1);
  }
}

export const googleSheetsService = new GoogleSheetsService();