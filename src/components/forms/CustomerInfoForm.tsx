// src/components/forms/CustomerInfoForm.tsx
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FormData } from '../../types/form.ts';

interface Props {
  formData: FormData;
  isOpen: boolean;
  isLoadingBRN: boolean;
  onToggle: () => void;
  onChange: (field: keyof FormData, value: any) => void;
  onBRNChange: (value: string) => void;
}

const CustomerInfoForm: React.FC<Props> = ({
  formData,
  isOpen,
  isLoadingBRN,
  onToggle,
  onChange,
  onBRNChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full bg-red-600 text-white px-6 py-3 flex justify-between items-center focus:outline-none"
      >
        <h2 className="text-lg font-semibold">CUSTOMER INFORMATION</h2>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Business Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business category</label>
              <select
                value={formData.businessCategory}
                onChange={(e) => onChange('businessCategory', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500"
              >
                <option value="">Select category</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
              </select>
            </div>

            {/* Entity Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Entity name</label>
              <input
                type="text"
                value={formData.entityName}
                onChange={(e) => onChange('entityName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500"
              />
            </div>

            {/* BRN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">BRN</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.brn}
                  onChange={(e) => onBRNChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500"
                  placeholder="Enter BRN"
                />
                {isLoadingBRN && (
                  <div className="absolute right-3 top-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Auto-Populated Read-Only Fields */}
            {[
              { label: 'Incorporation No.', key: 'incorporationNo' },
              { label: 'Incorporation Date', key: 'incorporationDate', type: 'date' },
              { label: 'Country of Incorporation', key: 'countryOfIncorporation' },
              { label: 'Registered Address', key: 'registeredAddress', type: 'textarea' },
              { label: 'Country', key: 'country' },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                {type === 'textarea' ? (
                  <textarea
                    value={formData[key as keyof FormData] as string}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-red-500"
                    rows={3}
                  />
                ) : (
                  <input
                    type={type || 'text'}
                    value={formData[key as keyof FormData] as string}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-red-500"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerInfoForm;
