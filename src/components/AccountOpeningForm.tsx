// src/components/AccountOpeningForm.tsx
import React, { useState } from 'react';
//import { ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import { createApplication } from '../lib/api'; // ✅ you need this file
import CustomerInfoForm from './forms/CustomerInfoForm';
import AccountDetailsForm from './forms/AccountDetailsForm';
import AddressAndOperationForm from './forms/AddressAndOperationForm';
import ChequebookAndDeliveryForm from './forms/ChequebookAndDeliveryForm';
import { FormData } from '../types/form.ts'; // adjust the path as needed


import {saveCustomerDetails} from '../lib/api.ts'


interface AccountOpeningFormProps {
  onNext?: () => void;
  onBack?: () => void;
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
    customerInfoSection: true,
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
    await new Promise(resolve => setTimeout(resolve, 1500));
    const dummyData = {
      entityName: 'Tech Solutions Mauritius Ltd',
      incorporationNo: 'C123456',
      incorporationDate: '2020-03-15',
      countryOfIncorporation: 'Mauritius',
      registeredAddress: '123 Business Park, Ebene, Mauritius',
      country: 'Mauritius'
    };
    setFormData(prev => ({ ...prev, ...dummyData }));
    setIsLoadingBRN(false);
  };

  const handleBRNChange = (value: string) => {
    setFormData(prev => ({ ...prev, brn: value }));
    if (value.length >= 6) {
      fetchCompanyDetails(value);
    }
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
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

 

  const handleNext = async () => {
    setSubmitError(null);
    setSubmitSuccess(null);
    setLoading(true);
    try {
      const token = localStorage.getItem('xano_token');
      if (!token) throw new Error('User not logged in');

      const appRes = await createApplication('company',formData.entityName, token);
      const applicationId = appRes.id;
      localStorage.setItem('application_id', applicationId.toString());

      await saveCustomerDetails(formData, applicationId);

      setSubmitSuccess("Details saved!");
      if (onNext) onNext();
    } catch (err: any) {
      setSubmitError(err.message);
    }
    setLoading(false);
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
          <CustomerInfoForm
             formData={formData}
             isOpen={sectionsOpen.customerInfoSection}
             isLoadingBRN={isLoadingBRN}
             onToggle={() => toggleSection('customerInfoSection')}
             onChange={handleInputChange}
             onBRNChange={handleBRNChange}
          />


          {/* Account and Services Details Section */}
      <AccountDetailsForm
  formData={formData}
  onChange={handleInputChange}
  isOpen={sectionsOpen.accountDetailsSection}
  onToggle={() => toggleSection('accountDetailsSection')}
  addWealth={addSourceOfWealth}
  removeWealth={removeSourceOfWealth}
  updateWealth={updateSourceOfWealth}
/>

<ChequebookAndDeliveryForm
  formData={formData}
  onChange={handleInputChange}
/>


<AddressAndOperationForm
  formData={formData}
  onChange={handleInputChange as (field: string, value: any) => void}
/>


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