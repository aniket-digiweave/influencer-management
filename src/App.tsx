import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/pages/Dashboard';
import Influencers from './components/pages/Influencers';
import Brands from './components/pages/Brands';
import Campaigns from './components/pages/Campaigns';
import Notifications from './components/pages/Notifications';
import { MenuItem } from './types';

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItem>('dashboard');

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'dashboard':
        return <Dashboard />;
      case 'influencers':
        return <Influencers />;
      case 'brands':
        return <Brands />;
      case 'campaigns':
        return <Campaigns />;
      case 'notifications':
        return <Notifications />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar 
        activeMenuItem={activeMenuItem} 
        onMenuItemClick={setActiveMenuItem} 
      />
      <main className="flex-1 ml-64">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;