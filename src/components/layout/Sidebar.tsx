import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Megaphone, 
  Bell, 
  Clock 
} from 'lucide-react';
import { MenuItem } from '../../types';

interface SidebarProps {
  activeMenuItem: MenuItem;
  onMenuItemClick: (item: MenuItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeMenuItem, onMenuItemClick }) => {
  const menuItems = [
    { id: 'dashboard' as MenuItem, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'influencers' as MenuItem, label: 'Influencers', icon: Users },
    { id: 'brands' as MenuItem, label: 'Brands', icon: Building2 },
    { id: 'campaigns' as MenuItem, label: 'Campaigns', icon: Megaphone },
    { id: 'reminders' as MenuItem, label: 'Reminders', icon: Clock },
    { id: 'notifications' as MenuItem, label: 'Notifications', icon: Bell },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-50 border-r border-gray-200 z-40">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Megaphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Campaign Manager</h1>
            <p className="text-xs text-gray-500">Marketing Agency</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
            Navigation
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenuItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onMenuItemClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:bg-white hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;