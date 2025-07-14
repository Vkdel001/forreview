import React from 'react';
import { Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { FormData } from '../../types/form.ts';

interface Props {
  formData: FormData;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (field: keyof FormData, value: any) => void;
  addWealth: () => void;
  removeWealth: (index: number) => void;
  updateWealth: (index: number, value: string) => void;
}

const AccountDetailsForm: React.FC<Props> = ({
  formData,
  isOpen,
  onToggle,
  onChange,
  addWealth,
  removeWealth,
  updateWealth,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full bg-red-600 text-white px-6 py-3 flex justify-between items-center focus:outline-none"
      >
        <h2 className="text-lg font-semibold">ACCOUNT AND SERVICES DETAILS</h2>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="p-6 space-y-6">
          {/* Table Row Inputs */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  {['Account Type', 'Currency', 'Initial Deposit', 'Source of Funds', 'Purpose'].map((header) => (
                    <th
                      key={header}
                      className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      value={formData.accountType}
                      onChange={(e) => onChange('accountType', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    >
                      <option value="">Select</option>
                      <option value="current">Current</option>
                      <option value="savings">Savings</option>
                      <option value="fixed">Fixed Deposit</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      value={formData.currency}
                      onChange={(e) => onChange('currency', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    >
                      <option value="">Select</option>
                      <option value="MUR">MUR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      value={formData.initialDeposit}
                      onChange={(e) => onChange('initialDeposit', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                      placeholder="Amount"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={formData.sourceOfFunds}
                      onChange={(e) => onChange('sourceOfFunds', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                      placeholder="Source"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={formData.purposeOfAccount}
                      onChange={(e) => onChange('purposeOfAccount', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                      placeholder="Purpose"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Source of Wealth */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">
                Source of accumulated wealth
              </label>
              <button
                type="button"
                onClick={addWealth}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add</span>
              </button>
            </div>

            {formData.sourceOfAccumulatedWealth.map((value, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updateWealth(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Source of wealth"
                />
                <button
                  type="button"
                  onClick={() => removeWealth(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}

            {formData.sourceOfAccumulatedWealth.length === 0 && (
              <button
                type="button"
                onClick={addWealth}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-red-300 hover:text-red-600 transition-colors"
              >
                Click to add source of accumulated wealth
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDetailsForm;
