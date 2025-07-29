import React, { useState } from 'react';
import { Search, Plus, ExternalLink, Check } from 'lucide-react';
import { CampaignData, InfluencerData, BrandData, googleSheetsService } from '../../services/googleSheets';
import Modal from '../ui/Modal';
import ConfirmDialog from '../ui/ConfirmDialog';
import DropdownMenu from '../ui/DropdownMenu';
import CampaignForm from '../forms/CampaignForm';
import { useEffect } from 'react';

const Campaigns: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [influencers, setInfluencers] = useState<InfluencerData[]>([]);
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [campaignsData, influencersData, brandsData] = await Promise.all([
        googleSheetsService.getCampaigns(),
        googleSheetsService.getInfluencers(),
        googleSheetsService.getBrands()
      ]);
      setCampaigns(campaignsData);
      setInfluencers(influencersData);
      setBrands(brandsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCampaign = async (data: Omit<CampaignData, 'id'>) => {
    try {
      setIsSubmitting(true);
      await googleSheetsService.addCampaign(data);
      await loadData();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add campaign:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCampaign = async (data: Omit<CampaignData, 'id'>) => {
    if (!selectedCampaign) return;
    
    try {
      setIsSubmitting(true);
      await googleSheetsService.updateCampaign(selectedCampaign.id, data);
      await loadData();
      setIsEditModalOpen(false);
      setSelectedCampaign(null);
    } catch (error) {
      console.error('Failed to update campaign:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCampaign = async () => {
    if (!selectedCampaign) return;
    
    try {
      setIsSubmitting(true);
      await googleSheetsService.deleteCampaign(selectedCampaign.id);
      await loadData();
      setIsDeleteDialogOpen(false);
      setSelectedCampaign(null);
    } catch (error) {
      console.error('Failed to delete campaign:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (campaign: CampaignData) => {
    setSelectedCampaign(campaign);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (campaign: CampaignData) => {
    setSelectedCampaign(campaign);
    setIsDeleteDialogOpen(true);
  };

  const getInfluencerName = (influencerId: string) => {
    const influencer = influencers.find(inf => inf.id === influencerId);
    return influencer ? { name: influencer.name, username: influencer.username } : { name: 'Unknown', username: '' };
  };

  const getBrandName = (brandId: string) => {
    const brand = brands.find(b => b.id === brandId);
    return brand ? brand.name : 'Unknown';
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    getInfluencerName(campaign.influencerId).name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getBrandName(campaign.brandId).toLowerCase().includes(searchTerm.toLowerCase())
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
          <span className="font-medium" onClick={() => setIsAddModalOpen(true)}>New Campaign</span>
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

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading campaigns...</div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influencer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
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
                {filteredCampaigns.map((campaign) => {
                  const influencer = getInfluencerName(campaign.influencerId);
                  const brand = getBrandName(campaign.brandId);
                  
                  return (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{influencer.name}</div>
                          <div className="text-sm text-gray-500">{influencer.username}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {brand}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(campaign.shootDate).toLocaleDateString()}
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
                          <span className="text-gray-400">
                            <ExternalLink className="w-4 h-4" />
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">₹{campaign.paidAmount.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">{campaign.paidDate ? new Date(campaign.paidDate).toLocaleDateString() : '-'}</div>
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
                        <DropdownMenu
                          onEdit={() => openEditModal(campaign)}
                          onDelete={() => openDeleteDialog(campaign)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Campaign Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Campaign"
        size="xl"
      >
        <CampaignForm
          onSubmit={handleAddCampaign}
          onCancel={() => setIsAddModalOpen(false)}
          isLoading={isSubmitting}
          submitText="Create Campaign"
        />
      </Modal>

      {/* Edit Campaign Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Campaign"
        size="xl"
      >
        {selectedCampaign && (
          <CampaignForm
            initialData={selectedCampaign}
            onSubmit={handleEditCampaign}
            onCancel={() => setIsEditModalOpen(false)}
            isLoading={isSubmitting}
            submitText="Update Campaign"
          />
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteCampaign}
        title="Delete Campaign"
        message={`Are you sure you want to delete this campaign? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default Campaigns;