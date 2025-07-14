// src/components/forms/ChequebookAndDeliveryForm.tsx
import React from 'react';
import { FormData } from '../../types/form';

interface Props {
  formData: FormData;
  onChange: (field: keyof FormData, value: any) => void;
}

const ChequebookAndDeliveryForm: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Order a chequebook?
        </label>
        <select
          value={formData.chequebookOrder}
          onChange={(e) => onChange('chequebookOrder', e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {formData.chequebookOrder === 'yes' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of books
            </label>
            <input
              type="number"
              value={formData.chequebookBooks}
              onChange={(e) => onChange('chequebookBooks', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Leaves per book
            </label>
            <input
              type="number"
              value={formData.chequebookLeaves}
              onChange={(e) => onChange('chequebookLeaves', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chequebook collection method
            </label>
            <select
              value={formData.chequebookCollection}
              onChange={(e) => onChange('chequebookCollection', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select</option>
              <option value="branch">Collect at branch</option>
              <option value="courier">Courier delivery</option>
            </select>
          </div>
        </>
      )}

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Receive SWIFT copy by email?
        </label>
        <input
          type="checkbox"
          checked={formData.swiftCopyDelivery}
          onChange={(e) => onChange('swiftCopyDelivery', e.target.checked)}
          className="mr-2"
        />
      </div>

      {formData.swiftCopyDelivery && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SWIFT delivery email
          </label>
          <input
            type="email"
            value={formData.swiftDeliveryEmail}
            onChange={(e) => onChange('swiftDeliveryEmail', e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          E-statement email
        </label>
        <input
          type="email"
          value={formData.estatementEmail}
          onChange={(e) => onChange('estatementEmail', e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
    </div>
  );
};

export default ChequebookAndDeliveryForm;
