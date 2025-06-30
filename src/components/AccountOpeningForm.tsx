import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';

interface FormData {
  businessCategory: string;
  entityName: string;
  brn: string;
  incorporationNo: string;
  incorporationDate: string;
  countryOfIncorporation: string;
  registeredAddress: string;
  country: string;
  isDifferentCorrespondenceAddress: boolean;
  correspondenceAddress: string;
  countriesOfOperation: string[];
  accountType: string;
  currency: string;
  initialDeposit: string;
  sourceOfFunds: string;
  purposeOfAccount: string;
  sourceOfAccumulatedWealth: string[];
  chequebookOrder: string;
  chequebookBooks: string;
  chequebookLeaves: string;
  chequebookCollection: string;
  swiftCopyDelivery: boolean;
  swiftDeliveryEmail: string;
  estatementEmail: string;
}

interface AccountOpeningFormProps {
  onNext?: () => void;
  onBack?: () => void;
}

// --- Map FormData to snake_case for Xano ---
function mapToXanoPayload(data: FormData) {
  return {
    business_category: data.businessCategory,
    entity_name: data.entityName,
    brn: data.brn,
    incorporation_no: data.incorporationNo,
    incorporation_date: data.incorporationDate,
    country_of_incorporation: data.countryOfIncorporation,
    registered_address: data.registeredAddress,
    country: data.country,
    is_different_correspondence_address: data.isDifferentCorrespondenceAddress,
    correspondence_address: data.correspondenceAddress,
    countries_of_operation: data.countriesOfOperation,
    account_type: data.accountType,
    currency: data.currency,
    initial_deposit: data.initialDeposit,
    source_of_funds: data.sourceOfFunds,
    purpose_of_account: data.purposeOfAccount,
    source_of_accumulated_wealth: data.sourceOfAccumulatedWealth,
    chequebook_order: data.chequebookOrder,
    chequebook_books: data.chequebookBooks,
    chequebook_leaves: data.chequebookLeaves,
    chequebook_collection: data.chequebookCollection,
    swift_copy_delivery: data.swiftCopyDelivery,
    swift_delivery_email: data.swiftDeliveryEmail,
    estatement_email: data.estatementEmail
  };
}

const AccountOpeningForm: React.FC<AccountOpeningFormProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    businessCategory: '',
    entityName: '',
    brn: '',
    incorporationNo: '',
    incorporationDate: '',
    countryOfIncorporation: '',
    registeredAddress: '',
    country: '',
    isDifferentCorrespondenceAddress: false,
    correspondenceAddress: '',
    countriesOfOperation: [],
    accountType: '',
    currency: '',
    initialDeposit: '',
    sourceOfFunds: '',
    purposeOfAccount: '',
    sourceOfAccumulatedWealth: [],
    chequebookOrder: '',
    chequebookBooks: '',
    chequebookLeaves: '',
    chequebookCollection: '',
    swiftCopyDelivery: false,
    swiftDeliveryEmail: '',
    estatementEmail: ''
  });

  const [isLoadingBRN, setIsLoadingBRN] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState({
    customerInfoSection: false,
    accountDetailsSection: false,
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const fetchCompanyDetails = async (brn: string) => {
    if (!brn || brn.length < 6) return;
    setIsLoadingBRN(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    const dummyData = {
      entityName: 'Tech Solutions Mauritius Ltd',
      incorporationNo: 'C123456',
      incorporationDate: '2020-03-15',
      countryOfIncorporation: 'Mauritius',
      registeredAddress: '123 Business Park, Ebene, Mauritius',
      country: 'Mauritius'
    };
    setFormData(prev => ({
      ...prev,
      ...dummyData
    }));
    setIsLoadingBRN(false);
  };

  const handleBRNChange = (value: string) => {
    setFormData(prev => ({ ...prev, brn: value }));
    if (value.length >= 6) {
      fetchCompanyDetails(value);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSourceOfWealth = () => {
    setFormData(prev => ({
      ...prev,
      sourceOfAccumulatedWealth: [...prev.sourceOfAccumulatedWealth, '']
    }));
  };

  const removeSourceOfWealth = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sourceOfAccumulatedWealth: prev.sourceOfAccumulatedWealth.filter((_, i) => i !== index)
    }));
  };

  const updateSourceOfWealth = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      sourceOfAccumulatedWealth: prev.sourceOfAccumulatedWealth.map((item, i) =>
        i === index ? value : item
      )
    }));
  };

  // --- Xano Integration ---
  async function saveCustomerDetails(data: FormData) {
    const token = localStorage.getItem('xano_token');
    const payload = mapToXanoPayload(data);
    const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:wd7kJ1J1/customer_details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to save customer details');
    }
    return response.json();
  }

  const handleNext = async () => {
    setSubmitError(null);
    setSubmitSuccess(null);
    setLoading(true);
    try {
      await saveCustomerDetails(formData);
      setSubmitSuccess("Details saved!");
      setLoading(false);
      if (onNext) onNext();
    } catch (err: any) {
      setSubmitError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
        <div className="mb-8">
          <p className="text-gray-600 mb-2">
            Let's get started ! You're just steps away from your business account setup
          </p>
          <p className="text-gray-400 text-sm">
            Please read your account terms and conditions
          </p>
        </div>

        <form className="space-y-8" onSubmit={e => e.preventDefault()}>
          {/* Customer Information Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('customerInfoSection')}
              className="w-full bg-red-600 text-white px-6 py-3 flex justify-between items-center focus:outline-none"
            >
              <h2 className="text-lg font-semibold">CUSTOMER INFORMATION</h2>
              {sectionsOpen.customerInfoSection ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {sectionsOpen.customerInfoSection && (
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business category
                    </label>
                    <select
                      value={formData.businessCategory}
                      onChange={(e) => handleInputChange('businessCategory', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select category</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Entity name
                    </label>
                    <input
                      type="text"
                      value={formData.entityName}
                      onChange={(e) => handleInputChange('entityName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter entity name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      BRN
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.brn}
                        onChange={(e) => handleBRNChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter BRN to auto-populate"
                      />
                      {isLoadingBRN && (
                        <div className="absolute right-3 top-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Incorporation No.
                    </label>
                    <input
                      type="text"
                      value={formData.incorporationNo}
                      onChange={(e) => handleInputChange('incorporationNo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50"
                      placeholder="Auto-populated"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Incorporation date
                    </label>
                    <input
                      type="date"
                      value={formData.incorporationDate}
                      onChange={(e) => handleInputChange('incorporationDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country of Incorporation
                    </label>
                    <input
                      type="text"
                      value={formData.countryOfIncorporation}
                      onChange={(e) => handleInputChange('countryOfIncorporation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50"
                      placeholder="Auto-populated"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registered Address
                    </label>
                    <textarea
                      value={formData.registeredAddress}
                      onChange={(e) => handleInputChange('registeredAddress', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50"
                      rows={3}
                      placeholder="Auto-populated"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50"
                      placeholder="Auto-populated"
                      readOnly
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="differentAddress"
                      checked={formData.isDifferentCorrespondenceAddress}
                      onChange={(e) => handleInputChange('isDifferentCorrespondenceAddress', e.target.checked)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
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
                        onChange={(e) => handleInputChange('correspondenceAddress', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                    onChange={(e) => handleInputChange('countriesOfOperation', Array.from(e.target.selectedOptions, option => option.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    size={4}
                  >
                    <option value="mauritius">Mauritius</option>
                    <option value="south-africa">South Africa</option>
                    <option value="madagascar">Madagascar</option>
                    <option value="reunion">Reunion</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple countries</p>
                </div>
              </div>
            )}
          </div>

          {/* Account and Services Details Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('accountDetailsSection')}
              className="w-full bg-red-600 text-white px-6 py-3 flex justify-between items-center focus:outline-none"
            >
              <h2 className="text-lg font-semibold">ACCOUNT AND SERVICES DETAILS</h2>
              {sectionsOpen.accountDetailsSection ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {sectionsOpen.accountDetailsSection && (
              <div className="p-6 space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Account Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Currency</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Initial Deposit</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Source of Funds for initial deposit</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Purpose of account Opening</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          <select
                            value={formData.accountType}
                            onChange={(e) => handleInputChange('accountType', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                          >
                            <option value="">Select</option>
                            <option value="current">Current Account</option>
                            <option value="savings">Savings Account</option>
                            <option value="fixed">Fixed Deposit</option>
                          </select>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <select
                            value={formData.currency}
                            onChange={(e) => handleInputChange('currency', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
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
                            onChange={(e) => handleInputChange('initialDeposit', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                            placeholder="Amount"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            value={formData.sourceOfFunds}
                            onChange={(e) => handleInputChange('sourceOfFunds', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                            placeholder="Source"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            value={formData.purposeOfAccount}
                            onChange={(e) => handleInputChange('purposeOfAccount', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                            placeholder="Purpose"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Source of accumulated wealth
                    </label>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={addSourceOfWealth}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">Add</span>
                      </button>
                    </div>
                  </div>

                  {formData.sourceOfAccumulatedWealth.map((source, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={source}
                        onChange={(e) => updateSourceOfWealth(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter source of wealth"
                      />
                      <button
                        type="button"
                        onClick={() => removeSourceOfWealth(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {formData.sourceOfAccumulatedWealth.length === 0 && (
                    <button
                      type="button"
                      onClick={addSourceOfWealth}
                      className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-red-300 hover:text-red-600 transition-colors"
                    >
                      Click to add source of accumulated wealth
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chequebook order
                    </label>
                    <input
                      type="number"
                      value={formData.chequebookOrder}
                      onChange={(e) => handleInputChange('chequebookOrder', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Number"
                    />
                  </div>

                  <div>
                    <span className="text-sm text-gray-700">books of</span>
                  </div>

                  <div>
                    <input
                      type="number"
                      value={formData.chequebookLeaves}
                      onChange={(e) => handleInputChange('chequebookLeaves', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Leaves"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      leaves to be collected at
                    </label>
                    <select
                      value={formData.chequebookCollection}
                      onChange={(e) => handleInputChange('chequebookCollection', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select branch</option>
                      <option value="port-louis">Port Louis</option>
                      <option value="ebene">Ebene</option>
                      <option value="quatre-bornes">Quatre Bornes</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="swiftCopy"
                      checked={formData.swiftCopyDelivery}
                      onChange={(e) => handleInputChange('swiftCopyDelivery', e.target.checked)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <label htmlFor="swiftCopy" className="text-sm text-gray-700">
                      Swift Copy Delivery <span className="italic">(Please tick as appropriate)</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Swift delivery email:
                      </label>
                      <input
                        type="email"
                        value={formData.swiftDeliveryEmail}
                        onChange={(e) => handleInputChange('swiftDeliveryEmail', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-statement email:
                      </label>
                      <input
                        type="email"
                        value={formData.estatementEmail}
                        onChange={(e) => handleInputChange('estatementEmail', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Error/success messages */}
          {submitError && <div className="text-red-600 mb-2">{submitError}</div>}
          {submitSuccess && <div className="text-green-600 mb-2">{submitSuccess}</div>}

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
              onClick={handleNext}
              className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountOpeningForm;