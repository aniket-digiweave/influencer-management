import React from 'react';
import { Calendar, TrendingUp } from 'lucide-react';

const DashboardStats: React.FC = () => {
  const stats = {
    upcomingCampaigns: 3,
    liveCampaigns: 2,
    totalAmountSpent: 770000
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <Calendar className="w-8 h-8" />
        </div>
        <h3 className="text-sm font-medium mb-2">Upcoming Campaigns</h3>
        <div className="text-4xl font-bold mb-2">{stats.upcomingCampaigns}</div>
        <p className="text-sm opacity-80">Not yet live</p>
      </div>

      <div className="bg-green-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <TrendingUp className="w-8 h-8" />
        </div>
        <h3 className="text-sm font-medium mb-2">Live Campaigns</h3>
        <div className="text-4xl font-bold mb-2">{stats.liveCampaigns}</div>
        <p className="text-sm opacity-80">Currently active</p>
      </div>

      <div className="bg-purple-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold">₹</span>
        </div>
        <h3 className="text-sm font-medium mb-2">Total Amount Spent</h3>
        <div className="text-4xl font-bold mb-2">₹{stats.totalAmountSpent.toLocaleString()}</div>
        <p className="text-sm opacity-80">Paid campaigns</p>
      </div>
    </div>
  );
};

export default DashboardStats;