import React, { useState } from 'react';
import { ChevronDown, FileText, DollarSign, Shield, Building, Users } from 'lucide-react';

interface AccountTypeDropdownProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

interface LandingPageProps {
  onApplyOnline?: () => void;
   onGoToKYCForm?: () => void; // ✅ new prop
}

const AccountTypeDropdown: React.FC<AccountTypeDropdownProps> = ({ 
  title, 
  isOpen, 
  onToggle, 
  children 
}) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-6 text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="text-gray-700 font-medium text-lg">{title}</span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      {isOpen && children && (
        <div className="px-6 pb-4 bg-gray-50">
          {children}
        </div>
      )}
    </div>
  );
};

//const LandingPage: React.FC<LandingPageProps> = ({ onApplyOnline }) => {
const LandingPage: React.FC<LandingPageProps> = ({ onApplyOnline, onGoToKYCForm }) => {

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const accountTypes = [
    {
      key: 'listedCompanies',
      title: 'Listed companies',
      requirements: [
        'Certificate of Incorporation',
        'Memorandum and Articles of Association',
        'Board Resolution',
        'Latest Annual Report',
        'Stock Exchange Listing Certificate'
      ]
    },
    {
      key: 'trust',
      title: 'Trust',
      requirements: [
        'Trust Deed',
        'Certificate of Registration',
        'Trustee Identification Documents',
        'Beneficiary Details',
        'Trust Bank Account Authorization'
      ]
    },
    {
      key: 'fund',
      title: 'Fund',
      requirements: [
        'Fund Registration Certificate',
        'Investment Management Agreement',
        'Fund Prospectus',
        'Custodian Agreement',
        'Regulatory Compliance Certificate'
      ]
    },
    {
      key: 'gbc',
      title: 'GBC',
      requirements: [
        'Global Business Company Certificate',
        'Registered Office Certificate',
        'Share Certificate',
        'Director and Shareholder Details',
        'Tax Residency Certificate'
      ]
    },
    {
      key: 'partnership',
      title: 'Partnership',
      requirements: [
        'Partnership Agreement',
        'Certificate of Registration',
        'Partner Identification Documents',
        'Business License',
        'Partnership Bank Account Resolution'
      ]
    }
  ];

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600">
              <span>Corporate</span>
              <span className="mx-2">{'>'}</span>
              <span className="text-gray-900 font-medium">Account Opening</span>
            </nav>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                Hello ! Open a business account with us
              </h1>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onApplyOnline}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Apply Online
                </button>
                <button className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200">
                  Resume Application
                </button>
                <button
                  onClick={onGoToKYCForm}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                Try KYC Mock Page
                </button>
              </div>

              {/* Tutorial Link */}
              <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200 text-left">
                Click here for a step by step tutorial
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              What is required for an Account Opening?
            </h2>

            {/* Account Types Dropdown */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {accountTypes.map((accountType) => (
                <AccountTypeDropdown
                  key={accountType.key}
                  title={accountType.title}
                  isOpen={openDropdown === accountType.key}
                  onToggle={() => toggleDropdown(accountType.key)}
                >
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 mb-2">Required Documents:</h4>
                    <ul className="space-y-2">
                      {accountType.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccountTypeDropdown>
              ))}
            </div>

            {/* Additional Requirements */}
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Common Requirements for All Account Types
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800 font-medium">KYC Checklist</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">Financial Statement</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Bank One for Your Corporate Banking?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Secure Banking</h4>
              <p className="text-gray-600">
                Advanced security measures to protect your corporate assets and transactions.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Building className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Corporate Solutions</h4>
              <p className="text-gray-600">
                Tailored banking solutions designed specifically for corporate entities.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Dedicated Support</h4>
              <p className="text-gray-600">
                Dedicated relationship managers for personalized corporate banking support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;