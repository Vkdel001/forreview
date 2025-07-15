// src/components/forms/AddressAndOperationForm.tsx
import React from 'react';

interface AddressAndOperationFormProps {
  formData: any;
  
  onChange: (field: string, value: any) => void;
}

const AddressAndOperationForm: React.FC<AddressAndOperationFormProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="differentAddress"
            checked={formData.isDifferentCorrespondenceAddress}
            onChange={(e) => onChange('isDifferentCorrespondenceAddress', e.target.checked)}
            className="rounded border-gray-300 text-red-600"
          />
          <label htmlFor="differentAddress" className="text-sm text-gray-700">
            Is your correspondence address different from mailing address? <span className="italic">(please tick)</span>
          </label>
        </div>

        {formData.isDifferentCorrespondenceAddress && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correspondence Address
            </label>
            <textarea
              value={formData.correspondenceAddress}
              onChange={(e) => onChange('correspondenceAddress', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
              placeholder="Enter correspondence address"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Countries of operation
        </label>
        <select
          multiple
          value={formData.countriesOfOperation}
          onChange={(e) =>
            onChange(
              'countriesOfOperation',
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="w-full px-3 py-2 border rounded-md"
          size={4}
        >
          <option value="mauritius">Mauritius</option>
          <option value="south-africa">South Africa</option>
          <option value="madagascar">Madagascar</option>
          <option value="reunion">Reunion</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Hold Ctrl/Cmd to select multiple countries
        </p>
      </div>
    </div>
  );
};

export default AddressAndOperationForm;
