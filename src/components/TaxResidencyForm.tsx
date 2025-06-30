import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface USOwner {
  name: string;
  address: string;
  taxIdentificationNumber: string;
}

interface TaxResidencyData {
  // FATCA Status Questions
  isIncorporatedInUS: string;
  isShareholderUSCitizen: string;
  hasUSResidenceOrMailing: string;
  hasUSPhoneNumber: string;
  hasStandingInstructions: string;
  receivesPayments: string;
  receivesInterestPayments: string;
  receivesGrossProceeds: string;

  // Tax Information
  countryOfTaxResidency: string;
  taxIdentificationNumber: string;
  noTinReason: string;
  secondOptionExplanation: string;
  entityFatcaStatus: string;

  // US Owners
  usOwners: USOwner[];
}

interface TaxResidencyFormProps {
  onNext?: () => void;
  onBack?: () => void;
}

const TaxResidencyForm: React.FC<TaxResidencyFormProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<TaxResidencyData>({
    isIncorporatedInUS: '',
    isShareholderUSCitizen: '',
    hasUSResidenceOrMailing: '',
    hasUSPhoneNumber: '',
    hasStandingInstructions: '',
    receivesPayments: '',
    receivesInterestPayments: '',
    receivesGrossProceeds: '',
    countryOfTaxResidency: '',
    taxIdentificationNumber: '',
    noTinReason: '',
    secondOptionExplanation: '',
    entityFatcaStatus: '',
    usOwners: [
      { name: '', address: '', taxIdentificationNumber: '' },
      { name: '', address: '', taxIdentificationNumber: '' }
    ]
  });

  const handleInputChange = (field: keyof TaxResidencyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addUSOwner = () => {
    setFormData(prev => ({
      ...prev,
      usOwners: [...prev.usOwners, { name: '', address: '', taxIdentificationNumber: '' }]
    }));
  };

  const removeUSOwner = (index: number) => {
    if (formData.usOwners.length > 1) {
      setFormData(prev => ({
        ...prev,
        usOwners: prev.usOwners.filter((_, i) => i !== index)
      }));
    }
  };

  const updateUSOwner = (index: number, field: keyof USOwner, value: string) => {
    setFormData(prev => ({
      ...prev,
      usOwners: prev.usOwners.map((owner, i) => 
        i === index ? { ...owner, [field]: value } : owner
      )
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-600">BANK</span>
              <span className="text-2xl font-bold text-red-600">ONE</span>
            </div>
            <div className="text-red-600 font-semibold text-lg tracking-wide">
              CORPORATE ACCOUNT OPENING
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <p className="text-gray-600 mb-2">
            Let's get started ! You're just steps away from your business account setup
          </p>
          <p className="text-gray-400 text-sm">
            Please keep your scanned copies ready to upload as you apply.
          </p>
        </div>

        <form className="space-y-8">
          {/* Tax Residency Information Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-red-600 text-white px-6 py-3">
              <h2 className="text-lg font-semibold">TAX RESIDENCY INFORMATION - FOREIGN ACCOUNT TAX COMPLIANCE ACT (FATCA) - CORPORATE ACCOUNT</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Indicia of US Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Indicia of US status</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Please confirm entity's FATCA status by selecting Yes or No:
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                    <label className="text-sm text-gray-700">
                      Is the entity incorporated in US?
                    </label>
                    <select
                      value={formData.isIncorporatedInUS}
                      onChange={(e) => handleInputChange('isIncorporatedInUS', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Dropdown Yes/No</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                    <label className="text-sm text-gray-700">
                      Is shareholder/ultimate beneficial owner/controlling person* of the entity a US citizen or resident? (20 percent ownership threshold is required for determining a substantial U.S owner)
                    </label>
                    <select
                      value={formData.isShareholderUSCitizen}
                      onChange={(e) => handleInputChange('isShareholderUSCitizen', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Dropdown Yes/No</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                    <label className="text-sm text-gray-700">
                      Does the entity have a current US residence or mailing address?
                    </label>
                    <select
                      value={formData.hasUSResidenceOrMailing}
                      onChange={(e) => handleInputChange('hasUSResidenceOrMailing', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Dropdown Yes/No</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                    <label className="text-sm text-gray-700">
                      Does the entity have current US telephone number?
                    </label>
                    <select
                      value={formData.hasUSPhoneNumber}
                      onChange={(e) => handleInputChange('hasUSPhoneNumber', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Dropdown Yes/No</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                    <label className="text-sm text-gray-700">
                      Does the entity have standing instructions to pay amounts from the account to an account maintained in the United States?
                    </label>
                    <select
                      value={formData.hasStandingInstructions}
                      onChange={(e) => handleInputChange('hasStandingInstructions', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Dropdown Yes/No</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                    <label className="text-sm text-gray-700">
                      Does entity receive any payment of interest, dividends, rents, salaries, wages, premiums,
                    </label>
                    <select
                      value={formData.receivesPayments}
                      onChange={(e) => handleInputChange('receivesPayments', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Dropdown Yes/No</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                    <label className="text-sm text-gray-700">
                      Does entity receive any payment of interest, dividends, rents, salaries, wages, premiums,
                    </label>
                    <select
                      value={formData.receivesInterestPayments}
                      onChange={(e) => handleInputChange('receivesInterestPayments', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Dropdown Yes/No</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                    <label className="text-sm text-gray-700">
                      Does entity receive any gross proceeds from the sale or other disposition of any property of a type which can produce interest or dividends from sources within the United States?
                    </label>
                    <select
                      value={formData.receivesGrossProceeds}
                      onChange={(e) => handleInputChange('receivesGrossProceeds', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Dropdown Yes/No</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tax Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country of tax residency
                  </label>
                  <input
                    type="text"
                    value={formData.countryOfTaxResidency}
                    onChange={(e) => handleInputChange('countryOfTaxResidency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Identification Number (TIN)
                  </label>
                  <input
                    type="text"
                    value={formData.taxIdentificationNumber}
                    onChange={(e) => handleInputChange('taxIdentificationNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter TIN"
                  />
                </div>
              </div>

              {/* Conditional Text Areas */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    If no TIN available, please state why*
                  </label>
                  <textarea
                    value={formData.noTinReason}
                    onChange={(e) => handleInputChange('noTinReason', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    rows={3}
                    placeholder="Please explain why TIN is not available"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    If you have selected the second option, kindly explain why
                  </label>
                  <textarea
                    value={formData.secondOptionExplanation}
                    onChange={(e) => handleInputChange('secondOptionExplanation', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    rows={4}
                    placeholder="Please provide explanation"
                  />
                </div>
              </div>

              {/* Entity FATCA Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entity FATCA Status
                </label>
                <select
                  value={formData.entityFatcaStatus}
                  onChange={(e) => handleInputChange('entityFatcaStatus', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Dropdown</option>
                  <option value="us-person">US Person</option>
                  <option value="non-us-person">Non-US Person</option>
                  <option value="passive-nffe">Passive NFFE</option>
                  <option value="active-nffe">Active NFFE</option>
                </select>
              </div>
            </div>
          </div>

          {/* US Owners Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-red-600 text-white px-6 py-3">
              <h2 className="text-lg font-semibold">Substantial U.S owners (20%)/controlling persons that are specified as U.S persons</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">US Owners Information</h4>
                <button
                  type="button"
                  onClick={addUSOwner}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Add Owner</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Name</th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Address</th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Tax Identification Number (TIN)</th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.usOwners.map((owner, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-2 py-1">
                          <input
                            type="text"
                            value={owner.name}
                            onChange={(e) => updateUSOwner(index, 'name', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                            placeholder="Enter name"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          <input
                            type="text"
                            value={owner.address}
                            onChange={(e) => updateUSOwner(index, 'address', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                            placeholder="Enter address"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          <input
                            type="text"
                            value={owner.taxIdentificationNumber}
                            onChange={(e) => updateUSOwner(index, 'taxIdentificationNumber', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                            placeholder="Enter TIN"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-1 text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <button
                              type="button"
                              onClick={addUSOwner}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeUSOwner(index)}
                              className="text-red-600 hover:text-red-700"
                              disabled={formData.usOwners.length <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={onNext}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaxResidencyForm;