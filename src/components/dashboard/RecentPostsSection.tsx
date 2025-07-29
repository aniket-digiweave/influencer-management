import React from 'react';
import { Eye } from 'lucide-react';

const RecentPostsSection: React.FC = () => {
  const recentPosts = [
    {
      id: '1',
      influencerName: 'Alex Rodriguez',
      brandName: 'Samsung',
      code: 'INF002',
      status: 'Live'
    },
    {
      id: '2',
      influencerName: 'Lisa Wang',
      brandName: 'Apple',
      code: 'INF005',
      status: 'Live'
    },
    {
      id: '3',
      influencerName: 'David Wilson',
      brandName: 'Netflix',
      code: 'INF006',
      status: 'Live'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-white bg-purple-500 rounded-lg p-4 flex items-center">
          <span className="mr-2">•</span>
          Recent Posts
        </h3>
        <p className="text-sm text-gray-600 mt-2">Latest campaign posts and engagement</p>
      </div>
      
      <div className="p-6 space-y-4">
        {recentPosts.map((post) => (
          <div key={post.id} className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{post.influencerName}</h4>
              <p className="text-sm text-gray-600">{post.brandName}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded bg-purple-100 text-purple-800">
                  <Eye className="w-3 h-3" />
                  <span>{post.status}</span>
                </span>
                <span className="text-xs text-gray-500">{post.code}</span>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors duration-200">
              View Post
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPostsSection;