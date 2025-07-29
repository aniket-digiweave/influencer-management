import React, { useState } from 'react';

const Notifications: React.FC = () => {
  const [unreadCount] = useState(2);
  
  const notifications = [
    {
      id: '1',
      type: 'payment',
      title: 'New Payment Request',
      message: 'Sarah Johnson submitted payment request for Nike campaign',
      read: false,
      createdAt: '2 hours ago',
      icon: '$'
    },
    {
      id: '2',
      type: 'draft',
      title: 'Draft Submitted',
      message: 'Alex Rodriguez submitted draft for Samsung campaign',
      read: false,
      createdAt: '4 hours ago',
      icon: '✉'
    },
    {
      id: '3',
      type: 'overdue',
      title: 'Campaign Overdue',
      message: 'Emma Davis campaign for Puma is 3 days overdue',
      read: true,
      createdAt: '1 day ago',
      icon: '⚠'
    },
    {
      id: '4',
      type: 'payment',
      title: 'Payment Request Approved',
      message: 'Mike Chen\'s payment for Adidas campaign has been approved',
      read: true,
      createdAt: '2 days ago',
      icon: '$'
    },
    {
      id: '5',
      type: 'campaign',
      title: 'New Campaign Created',
      message: 'Lisa Wang assigned to new Coca-Cola campaign',
      read: true,
      createdAt: '3 days ago',
      icon: '📢'
    }
  ];

  const markAllAsRead = () => {
    // This would update the notifications in a real app
    console.log('Mark all as read');
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>Campaign Manager</span>
        <span className="mx-2">›</span>
        <span>Notifications</span>
      </div>
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-purple-600 mb-2">Notifications</h1>
          <p className="text-gray-500">Stay updated with campaign activities and payment requests</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {unreadCount > 0 && (
            <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
              {unreadCount} unread
            </span>
          )}
          <button 
            onClick={markAllAsRead}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Notifications</h3>
          <p className="text-sm text-gray-600">Latest updates from your campaigns</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <div key={notification.id} className={`p-6 flex items-start space-x-4 ${!notification.read ? 'bg-blue-50' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                notification.type === 'payment' ? 'bg-green-100 text-green-600' :
                notification.type === 'draft' ? 'bg-blue-100 text-blue-600' :
                notification.type === 'overdue' ? 'bg-red-100 text-red-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {notification.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{notification.createdAt}</span>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Requests</h3>
          <div className="text-3xl font-bold text-green-600 mb-2">3</div>
          <p className="text-sm text-gray-600">Pending review</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Draft Submissions</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
          <p className="text-sm text-gray-600">Awaiting approval</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Overdue Campaigns</h3>
          <div className="text-3xl font-bold text-red-600 mb-2">2</div>
          <p className="text-sm text-gray-600">Need attention</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;