import React, { useState } from 'react';
import { Search, Plus, ExternalLink, MoreHorizontal, Check } from 'lucide-react';

const Campaigns: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const campaigns = [
    {
      id: '1',
      influencer: { name: 'mumbaicityexplore', username: '@mumbaicityexplore' },
      brand: { name: 'YFF (Borivali)' },
      shootDate: '1 Jul 2025',
      amount: 11000,
      notes: 'Collab Done',
      approved: true,
      postLink: 'https://instagram.com/p/example1',
      paidAmount: 11000,
      paidDate: '1 Jul 2025',
      status: 'Posted',
      type: 'Collab',
      paymentStatus: 'Paid'
    },
    {
      id: '2',
      influencer: { name: 'luxurious_tarunwadhwani', username: '@luxurious_tarunwadhwani' },
      brand: { name: 'YFF (Borivali)' },
      shootDate: '28 Jun 2025',
      amount: 11000,
      notes: 'Collab Done',
      approved: true,
      postLink: null,
      paidAmount: 11000,
      paidDate: '28 Jun 2025',
      status: 'Posted',
      type: 'Collab',
      paymentStatus: 'Paid'
    },
    {
      id: '3',
      influencer: { name: 'about_every_damnthing', username: '@about_every_damnthing' },
      brand: { name: 'YFF (New Marine)' },
      shootDate: '30 Jun 2025',
      amount: 18000,
      notes: 'Collab Done',
      approved: true,
      postLink: null,
      paidAmount: 18000,
      paidDate: '30 Jun 2025',
      status: 'Posted',
      type: 'Collab',
      paymentStatus: 'Paid'
    }
  ];

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>Campaign Manager</span>
        <span className="mx-2">›</span>
        <span>Campaigns</span>
      </div>
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-green-600 mb-2">Campaigns</h1>
          <p className="text-gray-500">Manage all your influencer campaigns</p>
        </div>
        
        <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200">
          <Plus className="w-5 h-5" />
          <span className="font-medium">New Campaign</span>
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search campaigns..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influencer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shoot Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post Link</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{campaign.influencer.name}</div>
                      <div className="text-sm text-gray-500">{campaign.influencer.username}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.brand.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.shootDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₹{campaign.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.notes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {campaign.approved ? (
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {campaign.postLink ? (
                      <a href={campaign.postLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                        <ExternalLink className="w-4 h-4" />
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">₹{campaign.paidAmount.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{campaign.paidDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {campaign.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {campaign.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;