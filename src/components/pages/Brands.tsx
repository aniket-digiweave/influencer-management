import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { BrandData, googleSheetsService } from '../../services/googleSheets';
import Modal from '../ui/Modal';
import ConfirmDialog from '../ui/ConfirmDialog';
import DropdownMenu from '../ui/DropdownMenu';
import BrandForm from '../forms/BrandForm';
import { useEffect } from 'react';

const Brands: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<BrandData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);
      const data = await googleSheetsService.getBrands();
      setBrands(data);
    } catch (error) {
      console.error('Failed to load brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBrand = async (data: Omit<BrandData, 'id'>) => {
    try {
      setIsSubmitting(true);
      await googleSheetsService.addBrand(data);
      await loadBrands();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add brand:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditBrand = async (data: Omit<BrandData, 'id'>) => {
    if (!selectedBrand) return;
    
    try {
      setIsSubmitting(true);
      await googleSheetsService.updateBrand(selectedBrand.id, data);
      await loadBrands();
      setIsEditModalOpen(false);
      setSelectedBrand(null);
    } catch (error) {
      console.error('Failed to update brand:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBrand = async () => {
    if (!selectedBrand) return;
    
    try {
      setIsSubmitting(true);
      await googleSheetsService.deleteBrand(selectedBrand.id);
      await loadBrands();
      setIsDeleteDialogOpen(false);
      setSelectedBrand(null);
    } catch (error) {
      console.error('Failed to delete brand:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (brand: BrandData) => {
    setSelectedBrand(brand);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (brand: BrandData) => {
    setSelectedBrand(brand);
    setIsDeleteDialogOpen(true);
  };

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
          <span className="font-medium" onClick={() => setIsAddModalOpen(true)}>Add Brand</span>
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

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading brands...</div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
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
                      {brand.industry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {brand.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {brand.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <DropdownMenu
                        onEdit={() => openEditModal(brand)}
                        onDelete={() => openDeleteDialog(brand)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Brand Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Brand"
        size="lg"
      >
        <BrandForm
          onSubmit={handleAddBrand}
          onCancel={() => setIsAddModalOpen(false)}
          isLoading={isSubmitting}
          submitText="Add Brand"
        />
      </Modal>

      {/* Edit Brand Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Brand"
        size="lg"
      >
        {selectedBrand && (
          <BrandForm
            initialData={selectedBrand}
            onSubmit={handleEditBrand}
            onCancel={() => setIsEditModalOpen(false)}
            isLoading={isSubmitting}
            submitText="Update Brand"
          />
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteBrand}
        title="Delete Brand"
        message={`Are you sure you want to delete ${selectedBrand?.name}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default Brands;