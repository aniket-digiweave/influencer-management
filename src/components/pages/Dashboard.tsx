import React from 'react';
import { Plus } from 'lucide-react';
import DashboardStats from '../dashboard/DashboardStats';
import PendingDraftsSection from '../dashboard/PendingDraftsSection';
import PendingPaymentsSection from '../dashboard/PendingPaymentsSection';
import RecentPostsSection from '../dashboard/RecentPostsSection';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>Campaign Manager</span>
        <span className="mx-2">›</span>
        <span>Dashboard</span>
      </div>
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-purple-600 mb-2">Dashboard</h1>
          <p className="text-gray-500">Overview of your influencer campaigns</p>
        </div>
        
        <button className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200">
            <Plus className="w-5 h-5" />
            <span className="font-medium">Quick Actions</span>
          </button>
      </div>

      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <PendingDraftsSection />
        <PendingPaymentsSection />
        <RecentPostsSection />
      </div>
      
      <div className="mt-8 bg-gray-800 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-2">Recent Activity</h3>
        <p className="text-gray-400 text-sm">Track all campaign activities and updates</p>
      </div>
    </div>
  );
};

export default Dashboard;