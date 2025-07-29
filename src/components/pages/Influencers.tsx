import React, { useState } from 'react';
import { Search, Plus, Filter, User } from 'lucide-react';
import { InfluencerProfile } from '../../types';

const Influencers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const influencers: InfluencerProfile[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      platform: 'Instagram',
      followers: 125000,
      engagementRate: 4.2,
      category: 'Fashion',
      location: 'New York, USA',
      email: 'sarah@example.com',
      phone: '+1 555-0123',
      status: 'active'
    },
    {
      id: '2',
      name: 'Mike Chen',
      profileImage: 'https://images.pexels.com/photos/428321/pexels-photo-428321.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      platform: 'YouTube',
      followers: 89000,
      engagementRate: 6.8,
      category: 'Tech',
      location: 'San Francisco, USA',
      email: 'mike@example.com',
      phone: '+1 555-0124',
      status: 'active'
    },
    {
      id: '3',
      name: 'Emma Davis',
      profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      platform: 'TikTok',
      followers: 234000,
      engagementRate: 8.1,
      category: 'Lifestyle',
      location: 'Los Angeles, USA',
      email: 'emma@example.com',
      phone: '+1 555-0125',
      status: 'active'
    },
    {
      id: '4',
      name: 'Alex Rodriguez',
      profileImage: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      platform: 'Instagram',
      followers: 167000,
      engagementRate: 5.3,
      category: 'Fitness',
      location: 'Miami, USA',
      email: 'alex@example.com',
      phone: '+1 555-0126',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInfluencers = influencers.filter(influencer =>
    influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    influencer.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Influencers</h1>
          <p className="text-gray-600">Manage your influencer network</p>
        </div>
        
        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg">
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Influencer</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search influencers by name or category..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">Filter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInfluencers.map((influencer) => (
          <div key={influencer.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={influencer.profileImage}
                  alt={influencer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{influencer.name}</h3>
                  <p className="text-sm text-gray-600">{influencer.category}</p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getStatusColor(influencer.status)}`}>
                    {influencer.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Platform</span>
                  <span className="text-sm font-medium text-gray-900">{influencer.platform}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Followers</span>
                  <span className="text-sm font-medium text-gray-900">{influencer.followers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Engagement</span>
                  <span className="text-sm font-medium text-gray-900">{influencer.engagementRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Location</span>
                  <span className="text-sm font-medium text-gray-900">{influencer.location}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-6">
                <button className="flex-1 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
                  View Profile
                </button>
                <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Influencers;