import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

const Brands: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const brands = [
    {
      id: '1',
      name: 'Nike',
      ownerName: 'John Anderson',
      phone: '+1 (555) 123-4567',
      email: 'john@nike.com'
    },
    {
      id: '2',
      name: 'Adidas',
      ownerName: 'Maria Garcia',
      phone: '+1 (555) 234-5678',
      email: 'maria@adidas.com'
    },
    {
      id: '3',
      name: 'Samsung',
      ownerName: 'David Kim',
      phone: '+1 (555) 345-6789',
      email: 'david@samsung.com'
    },
    {
      id: '4',
      name: 'Apple',
      ownerName: 'Sarah Johnson',
      phone: '+1 (555) 456-7890',
      email: 'sarah@apple.com'
    },
    {
      id: '5',
      name: 'Coca-Cola',
      ownerName: 'Michael Brown',
      phone: '+1 (555) 567-8901',
      email: 'michael@cocacola.com'
    }
  ];

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>Campaign Manager</span>
        <span className="mx-2">›</span>
        <span>Brands</span>
      </div>
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Brands</h1>
          <p className="text-gray-500">Manage your brand partnerships</p>
        </div>
        
        <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Brand</span>
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search brands..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBrands.map((brand) => (
                <tr key={brand.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {brand.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {brand.ownerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {brand.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {brand.email}
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

export default Brands;