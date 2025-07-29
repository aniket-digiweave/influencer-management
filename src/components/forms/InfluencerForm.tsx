import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InfluencerData } from '../../services/googleSheets';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  platform: yup.string().required('Platform is required'),
  followers: yup.number().positive('Must be positive').required('Followers count is required'),
  engagementRate: yup.number().min(0).max(100).required('Engagement rate is required'),
  category: yup.string().required('Category is required'),
  location: yup.string().required('Location is required'),
  status: yup.string().required('Status is required'),
  profileImage: yup.string().url('Must be a valid URL').required('Profile image URL is required')
});

interface InfluencerFormProps {
  initialData?: Partial<InfluencerData>;
  onSubmit: (data: Omit<InfluencerData, 'id'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
  submitText?: string;
}

const InfluencerForm: React.FC<InfluencerFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  submitText = 'Save'
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: initialData?.name || '',
      username: initialData?.username || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      platform: initialData?.platform || 'Instagram',
      followers: initialData?.followers || 0,
      engagementRate: initialData?.engagementRate || 0,
      category: initialData?.category || '',
      location: initialData?.location || '',
      status: initialData?.status || 'active',
      profileImage: initialData?.profileImage || ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            {...register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter influencer name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username *
          </label>
          <input
            {...register('username')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="@username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="email@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <input
            {...register('phone')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="+91 98765 43210"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Platform *
          </label>
          <select
            {...register('platform')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>
            <option value="TikTok">TikTok</option>
            <option value="Twitter">Twitter</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
          {errors.platform && (
            <p className="text-red-500 text-sm mt-1">{errors.platform.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Followers *
          </label>
          <input
            {...register('followers', { valueAsNumber: true })}
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="125000"
          />
          {errors.followers && (
            <p className="text-red-500 text-sm mt-1">{errors.followers.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Engagement Rate (%) *
          </label>
          <input
            {...register('engagementRate', { valueAsNumber: true })}
            type="number"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="4.2"
          />
          {errors.engagementRate && (
            <p className="text-red-500 text-sm mt-1">{errors.engagementRate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <input
            {...register('category')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Fashion, Tech, Lifestyle, etc."
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <input
            {...register('location')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Mumbai, India"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status *
          </label>
          <select
            {...register('status')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Profile Image URL *
        </label>
        <input
          {...register('profileImage')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
        {errors.profileImage && (
          <p className="text-red-500 text-sm mt-1">{errors.profileImage.message}</p>
        )}
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
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : submitText}
        </button>
      </div>
    </form>
  );
};

export default InfluencerForm;