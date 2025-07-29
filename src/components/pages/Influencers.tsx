import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { InfluencerData, googleSheetsService } from '../../services/googleSheets';
import Modal from '../ui/Modal';
import ConfirmDialog from '../ui/ConfirmDialog';
import DropdownMenu from '../ui/DropdownMenu';
import InfluencerForm from '../forms/InfluencerForm';
import { useEffect } from 'react';

const Influencers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [influencers, setInfluencers] = useState<InfluencerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<InfluencerData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    loadInfluencers();
  }, []);

  const loadInfluencers = async () => {
    try {
      setLoading(true);
      const data = await googleSheetsService.getInfluencers();
      setInfluencers(data);
    } catch (error) {
      console.error('Failed to load influencers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddInfluencer = async (data: Omit<InfluencerData, 'id'>) => {
    try {
      setIsSubmitting(true);
      await googleSheetsService.addInfluencer(data);
      await loadInfluencers();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add influencer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditInfluencer = async (data: Omit<InfluencerData, 'id'>) => {
    if (!selectedInfluencer) return;
    
    try {
      setIsSubmitting(true);
      await googleSheetsService.updateInfluencer(selectedInfluencer.id, data);
      await loadInfluencers();
      setIsEditModalOpen(false);
      setSelectedInfluencer(null);
    } catch (error) {
      console.error('Failed to update influencer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteInfluencer = async () => {
    if (!selectedInfluencer) return;
    
    try {
      setIsSubmitting(true);
      await googleSheetsService.deleteInfluencer(selectedInfluencer.id);
      await loadInfluencers();
      setIsDeleteDialogOpen(false);
      setSelectedInfluencer(null);
    } catch (error) {
      console.error('Failed to delete influencer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (influencer: InfluencerData) => {
    setSelectedInfluencer(influencer);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (influencer: InfluencerData) => {
    setSelectedInfluencer(influencer);
    setIsDeleteDialogOpen(true);
  };

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
          <span className="font-medium" onClick={() => setIsAddModalOpen(true)}>Add Influencer</span>
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

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading influencers...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInfluencers.map((influencer) => (
            <div key={influencer.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={influencer.profileImage}
                      alt={influencer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{influencer.name}</h3>
                      <p className="text-sm text-gray-600">{influencer.username}</p>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getStatusColor(influencer.status)}`}>
                        {influencer.status}
                      </span>
                    </div>
                  </div>
                  <DropdownMenu
                    onEdit={() => openEditModal(influencer)}
                    onDelete={() => openDeleteDialog(influencer)}
                  />
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
                    <span className="text-sm text-gray-600">Category</span>
                    <span className="text-sm font-medium text-gray-900">{influencer.category}</span>
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
      )}

      {/* Add Influencer Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Influencer"
        size="lg"
      >
        <InfluencerForm
          onSubmit={handleAddInfluencer}
          onCancel={() => setIsAddModalOpen(false)}
          isLoading={isSubmitting}
          submitText="Add Influencer"
        />
      </Modal>

      {/* Edit Influencer Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Influencer"
        size="lg"
      >
        {selectedInfluencer && (
          <InfluencerForm
            initialData={selectedInfluencer}
            onSubmit={handleEditInfluencer}
            onCancel={() => setIsEditModalOpen(false)}
            isLoading={isSubmitting}
            submitText="Update Influencer"
          />
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteInfluencer}
        title="Delete Influencer"
        message={`Are you sure you want to delete ${selectedInfluencer?.name}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default Influencers;