import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BrandData } from '../../services/googleSheets';

const schema = yup.object({
  name: yup.string().required('Brand name is required'),
  ownerName: yup.string().required('Owner name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  industry: yup.string().required('Industry is required'),
  logo: yup.string().url('Must be a valid URL').required('Logo URL is required')
});

interface BrandFormProps {
  initialData?: Partial<BrandData>;
  onSubmit: (data: Omit<BrandData, 'id'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
  submitText?: string;
}

const BrandForm: React.FC<BrandFormProps> = ({
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
      ownerName: initialData?.ownerName || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      industry: initialData?.industry || '',
      logo: initialData?.logo || ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand Name *
          </label>
          <input
            {...register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter brand name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Owner Name *
          </label>
          <input
            {...register('ownerName')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter owner name"
          />
          {errors.ownerName && (
            <p className="text-red-500 text-sm mt-1">{errors.ownerName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+91 11 2345 6789"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry *
          </label>
          <input
            {...register('industry')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Food & Beverage, Technology, etc."
          />
          {errors.industry && (
            <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Logo URL *
        </label>
        <input
          {...register('logo')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com/logo.jpg"
        />
        {errors.logo && (
          <p className="text-red-500 text-sm mt-1">{errors.logo.message}</p>
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
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : submitText}
        </button>
      </div>
    </form>
  );
};

export default BrandForm;