import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CampaignData, InfluencerData, BrandData, googleSheetsService } from '../../services/googleSheets';

const schema = yup.object({
  influencerId: yup.string().required('Influencer is required'),
  brandId: yup.string().required('Brand is required'),
  name: yup.string().required('Campaign name is required'),
  amount: yup.number().positive('Amount must be positive').required('Amount is required'),
  shootDate: yup.string().required('Shoot date is required'),
  notes: yup.string(),
  approved: yup.boolean(),
  postLink: yup.string().url('Must be a valid URL'),
  paidAmount: yup.number().min(0).required('Paid amount is required'),
  paidDate: yup.string(),
  status: yup.string().required('Status is required'),
  type: yup.string().required('Type is required'),
  paymentStatus: yup.string().required('Payment status is required')
});

interface CampaignFormProps {
  initialData?: Partial<CampaignData>;
  onSubmit: (data: Omit<CampaignData, 'id'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
  submitText?: string;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  submitText = 'Save'
}) => {
  const [influencers, setInfluencers] = useState<InfluencerData[]>([]);
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      influencerId: initialData?.influencerId || '',
      brandId: initialData?.brandId || '',
      name: initialData?.name || '',
      amount: initialData?.amount || 0,
      shootDate: initialData?.shootDate || '',
      notes: initialData?.notes || '',
      approved: initialData?.approved || false,
      postLink: initialData?.postLink || '',
      paidAmount: initialData?.paidAmount || 0,
      paidDate: initialData?.paidDate || '',
      status: initialData?.status || 'draft',
      type: initialData?.type || 'collab',
      paymentStatus: initialData?.paymentStatus || 'pending'
    }
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [influencersData, brandsData] = await Promise.all([
          googleSheetsService.getInfluencers(),
          googleSheetsService.getBrands()
        ]);
        setInfluencers(influencersData);
        setBrands(brandsData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  if (loadingData) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Influencer *
          </label>
          <select
            {...register('influencerId')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select an influencer</option>
            {influencers.map((influencer) => (
              <option key={influencer.id} value={influencer.id}>
                {influencer.name} ({influencer.username})
              </option>
            ))}
          </select>
          {errors.influencerId && (
            <p className="text-red-500 text-sm mt-1">{errors.influencerId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand *
          </label>
          <select
            {...register('brandId')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select a brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          {errors.brandId && (
            <p className="text-red-500 text-sm mt-1">{errors.brandId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Name *
          </label>
          <input
            {...register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter campaign name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (₹) *
          </label>
          <input
            {...register('amount', { valueAsNumber: true })}
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="11000"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shoot Date *
          </label>
          <input
            {...register('shootDate')}
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {errors.shootDate && (
            <p className="text-red-500 text-sm mt-1">{errors.shootDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Paid Amount (₹) *
          </label>
          <input
            {...register('paidAmount', { valueAsNumber: true })}
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="0"
          />
          {errors.paidAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.paidAmount.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Paid Date
          </label>
          <input
            {...register('paidDate')}
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {errors.paidDate && (
            <p className="text-red-500 text-sm mt-1">{errors.paidDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status *
          </label>
          <select
            {...register('status')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="draft">Draft</option>
            <option value="posted">Posted</option>
            <option value="scheduled">Scheduled</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type *
          </label>
          <select
            {...register('type')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="collab">Collab</option>
            <option value="paid">Paid</option>
            <option value="sponsored">Sponsored</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Status *
          </label>
          <select
            {...register('paymentStatus')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
          {errors.paymentStatus && (
            <p className="text-red-500 text-sm mt-1">{errors.paymentStatus.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Post Link
        </label>
        <input
          {...register('postLink')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="https://instagram.com/p/example"
        />
        {errors.postLink && (
          <p className="text-red-500 text-sm mt-1">{errors.postLink.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Campaign notes..."
        />
        {errors.notes && (
          <p className="text-red-500 text-sm mt-1">{errors.notes.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          {...register('approved')}
          type="checkbox"
          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">
          Approved
        </label>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : submitText}
        </button>
      </div>
    </form>
  );
};

export default CampaignForm;