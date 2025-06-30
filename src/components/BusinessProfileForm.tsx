import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';

interface BusinessProfileData {
  businessActivity: string;
  companyWebsite: string;
  numberOfEmployees: string;
  hasSubsidiaries: boolean;
  subsidiaries: Array<{
    name: string;
    countryOfIncorporation: string;
  }>;
  businessForecast: {
    currency: string;
    years: Array<{
      year: string;
      annualTurnover: string;
      tradingDividendOtherIncome: string;
      loanFromShareholderRelatedParty: string;
      consultancyFees: string;
      investment: string;
      loanFromShareholderRelatedPartyOutflow: string;
      netCash: string;
    }>;
  };
  monthlyTransactions: {
    currency: string;
    inflows: Array<{
      currency: string;
      number: string;
      value: string;
    }>;
    outflows: Array<{
      currency: string;
      number: string;
      value: string;
    }>;
  };
}

interface BusinessProfileFormProps {
  onNext?: () => void;
  onBack?: () => void;
}

const BusinessProfileForm: React.FC<BusinessProfileFormProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<BusinessProfileData>({
    businessActivity: '',
    companyWebsite: '',
    numberOfEmployees: '',
    hasSubsidiaries: false,
    subsidiaries: [],
    businessForecast: {
      currency: '',
      years: [
        { year: new Date().getFullYear().toString(), annualTurnover: '', tradingDividendOtherIncome: '', loanFromShareholderRelatedParty: '', consultancyFees: '', investment: '', loanFromShareholderRelatedPartyOutflow: '', netCash: '' },
        { year: (new Date().getFullYear() + 1).toString(), annualTurnover: '', tradingDividendOtherIncome: '', loanFromShareholderRelatedParty: '', consultancyFees: '', investment: '', loanFromShareholderRelatedPartyOutflow: '', netCash: '' },
        { year: (new Date().getFullYear() + 2).toString(), annualTurnover: '', tradingDividendOtherIncome: '', loanFromShareholderRelatedParty: '', consultancyFees: '', investment: '', loanFromShareholderRelatedPartyOutflow: '', netCash: '' }
      ]
    },
    monthlyTransactions: {
      currency: '',
      inflows: [],
      outflows: []
    }
  });

  const [sectionsOpen, setSectionsOpen] = useState({
    businessProfileSection: false,
  });

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSubsidiary = () => {
    setFormData(prev => ({
      ...prev,
      subsidiaries: [...prev.subsidiaries, { name: '', countryOfIncorporation: '' }]
    }));
  };

  const removeSubsidiary = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subsidiaries: prev.subsidiaries.filter((_, i) => i !== index)
    }));
  };

  const updateSubsidiary = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      subsidiaries: prev.subsidiaries.map((sub, i) => 
        i === index ? { ...sub, [field]: value } : sub
      )
    }));
  };

  const addInflowRow = () => {
    setFormData(prev => ({
      ...prev,
      monthlyTransactions: {
        ...prev.monthlyTransactions,
        inflows: [...prev.monthlyTransactions.inflows, { currency: '', number: '', value: '' }]
      }
    }));
  };

  const removeInflowRow = (index: number) => {
    setFormData(prev => ({
      ...prev,
      monthlyTransactions: {
        ...prev.monthlyTransactions,
        inflows: prev.monthlyTransactions.inflows.filter((_, i) => i !== index)
      }
    }));
  };

  const updateInflowRow = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      monthlyTransactions: {
        ...prev.monthlyTransactions,
        inflows: prev.monthlyTransactions.inflows.map((inflow, i) => 
          i === index ? { ...inflow, [field]: value } : inflow
        )
      }
    }));
  };

  const addOutflowRow = () => {
    setFormData(prev => ({
      ...prev,
      monthlyTransactions: {
        ...prev.monthlyTransactions,
        outflows: [...prev.monthlyTransactions.outflows, { currency: '', number: '', value: '' }]
      }
    }));
  };

  const removeOutflowRow = (index: number) => {
    setFormData(prev => ({
      ...prev,
      monthlyTransactions: {
        ...prev.monthlyTransactions,
        outflows: prev.monthlyTransactions.outflows.filter((_, i) => i !== index)
      }
    }));
  };

  const updateOutflowRow = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      monthlyTransactions: {
        ...prev.monthlyTransactions,
        outflows: prev.monthlyTransactions.outflows.map((outflow, i) => 
          i === index ? { ...outflow, [field]: value } : outflow
        )
      }
    }));
  };

  const updateForecastYear = (yearIndex: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      businessForecast: {
        ...prev.businessForecast,
        years: prev.businessForecast.years.map((year, i) => 
          i === yearIndex ? { ...year, [field]: value } : year
        )
      }
    }));
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

        <form className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('businessProfileSection')}
              className="w-full bg-red-600 text-white px-6 py-3 flex justify-between items-center focus:outline-none"
            >
              <h2 className="text-lg font-semibold">BUSINESS PROFILE</h2>
              {sectionsOpen.businessProfileSection ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            
            {sectionsOpen.businessProfileSection && (
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Activity
                    </label>
                    <textarea
                      value={formData.businessActivity}
                      onChange={(e) => handleInputChange('businessActivity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      rows={4}
                      placeholder="Free text (add a scroll bar)"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company website
                      </label>
                      <input
                        type="url"
                        value={formData.companyWebsite}
                        onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Free text"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of employees
                      </label>
                      <input
                        type="number"
                        value={formData.numberOfEmployees}
                        onChange={(e) => handleInputChange('numberOfEmployees', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Numerical"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">List of Subsidiaries</h3>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 mb-2">
                      Do you have any business subsidiaries? 
                      <span className="italic text-gray-500 ml-2">Please tick as appropriate</span>
                    </p>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="hasSubsidiaries"
                          checked={formData.hasSubsidiaries === true}
                          onChange={() => handleInputChange('hasSubsidiaries', true)}
                          className="mr-2 text-red-600 focus:ring-red-500"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="hasSubsidiaries"
                          checked={formData.hasSubsidiaries === false}
                          onChange={() => handleInputChange('hasSubsidiaries', false)}
                          className="mr-2 text-red-600 focus:ring-red-500"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  {formData.hasSubsidiaries && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="font-medium text-gray-700">Subsidiary</div>
                        <div className="font-medium text-gray-700">Country of Inc</div>
                      </div>
                      
                      {formData.subsidiaries.map((subsidiary, index) => (
                        <div key={index} className="grid grid-cols-2 gap-4 items-center">
                          <input
                            type="text"
                            value={subsidiary.name}
                            onChange={(e) => updateSubsidiary(index, 'name', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            placeholder="Subsidiary name"
                          />
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={subsidiary.countryOfIncorporation}
                              onChange={(e) => updateSubsidiary(index, 'countryOfIncorporation', e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                              placeholder="Country"
                            />
                            <button
                              type="button"
                              onClick={() => removeSubsidiary(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={addSubsidiary}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">Add Subsidiary</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Business forecast for 3 years - as per latest financial statement
                  </h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      value={formData.businessForecast.currency}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        businessForecast: { ...prev.businessForecast, currency: e.target.value }
                      }))}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">dropdown</option>
                      <option value="MUR">MUR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2 text-left font-medium">Inflow</th>
                          {formData.businessForecast.years.map((year, index) => (
                            <th key={index} className="border border-gray-300 px-3 py-2 text-center font-medium">
                              {year.year} (date picker)
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-medium">Annual turnover</td>
                          {formData.businessForecast.years.map((year, index) => (
                            <td key={index} className="border border-gray-300 px-2 py-1">
                              <input
                                type="number"
                                value={year.annualTurnover}
                                onChange={(e) => updateForecastYear(index, 'annualTurnover', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="Numerical"
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-medium">Trading / Dividend / Other income</td>
                          {formData.businessForecast.years.map((year, index) => (
                            <td key={index} className="border border-gray-300 px-2 py-1">
                              <input
                                type="number"
                                value={year.tradingDividendOtherIncome}
                                onChange={(e) => updateForecastYear(index, 'tradingDividendOtherIncome', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="Numerical"
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-medium">Loan from shareholder / Related party</td>
                          {formData.businessForecast.years.map((year, index) => (
                            <td key={index} className="border border-gray-300 px-2 py-1">
                              <input
                                type="number"
                                value={year.loanFromShareholderRelatedParty}
                                onChange={(e) => updateForecastYear(index, 'loanFromShareholderRelatedParty', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="Numerical"
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-medium">Consultancy fees</td>
                          {formData.businessForecast.years.map((year, index) => (
                            <td key={index} className="border border-gray-300 px-2 py-1">
                              <input
                                type="number"
                                value={year.consultancyFees}
                                onChange={(e) => updateForecastYear(index, 'consultancyFees', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="Numerical"
                              />
                            </td>
                          ))}
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 font-medium">Outflow</td>
                          <td className="border border-gray-300 px-3 py-2"></td>
                          <td className="border border-gray-300 px-3 py-2"></td>
                          <td className="border border-gray-300 px-3 py-2"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-medium">Expenses</td>
                          {formData.businessForecast.years.map((year, index) => (
                            <td key={index} className="border border-gray-300 px-2 py-1">
                              <input
                                type="number"
                                value={year.investment}
                                onChange={(e) => updateForecastYear(index, 'investment', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="Numerical"
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-medium">Investment</td>
                          {formData.businessForecast.years.map((year, index) => (
                            <td key={index} className="border border-gray-300 px-2 py-1">
                              <input
                                type="number"
                                value={year.investment}
                                onChange={(e) => updateForecastYear(index, 'investment', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="Numerical"
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-medium">Loan from shareholder / Related party</td>
                          {formData.businessForecast.years.map((year, index) => (
                            <td key={index} className="border border-gray-300 px-2 py-1">
                              <input
                                type="number"
                                value={year.loanFromShareholderRelatedPartyOutflow}
                                onChange={(e) => updateForecastYear(index, 'loanFromShareholderRelatedPartyOutflow', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="Numerical"
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-medium">Net Cash</td>
                          {formData.businessForecast.years.map((year, index) => (
                            <td key={index} className="border border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={year.netCash}
                                className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100"
                                placeholder="Autopopulate"
                                readOnly
                              />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Estimated Number & Value of Monthly Transaction - Value of monthly account turn over
                  </h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <div className="flex items-center space-x-4">
                      {['MUR', 'USD', 'EUR', 'GBP'].map((currency) => (
                        <label key={currency} className="flex items-center">
                          <input
                            type="radio"
                            name="monthlyCurrency"
                            value={currency}
                            checked={formData.monthlyTransactions.currency === currency}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              monthlyTransactions: { ...prev.monthlyTransactions, currency: e.target.value }
                            }))}
                            className="mr-2 text-red-600 focus:ring-red-500"
                          />
                          {currency}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Inflows</h4>
                        <button
                          type="button"
                          onClick={addInflowRow}
                          className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                        >
                          <Plus className="w-4 h-4" />
                          <span className="text-sm">Add</span>
                        </button>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 px-3 py-2 text-left">Currency</th>
                              <th className="border border-gray-300 px-3 py-2 text-left">Number</th>
                              <th className="border border-gray-300 px-3 py-2 text-left">Value</th>
                              <th className="border border-gray-300 px-3 py-2 text-left">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.monthlyTransactions.inflows.map((inflow, index) => (
                              <tr key={index}>
                                <td className="border border-gray-300 px-2 py-1">
                                  <input
                                    type="text"
                                    value={inflow.currency}
                                    onChange={(e) => updateInflowRow(index, 'currency', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                    placeholder="Numerical"
                                  />
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                  <input
                                    type="number"
                                    value={inflow.number}
                                    onChange={(e) => updateInflowRow(index, 'number', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                    placeholder="Numerical"
                                  />
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                  <input
                                    type="number"
                                    value={inflow.value}
                                    onChange={(e) => updateInflowRow(index, 'value', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                    placeholder="Numerical"
                                  />
                                </td>
                                <td className="border border-gray-300 px-2 py-1 text-center">
                                  <button
                                    type="button"
                                    onClick={() => removeInflowRow(index)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Outflows</h4>
                        <button
                          type="button"
                          onClick={addOutflowRow}
                          className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                        >
                          <Plus className="w-4 h-4" />
                          <span className="text-sm">Add</span>
                        </button>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 px-3 py-2 text-left">Currency</th>
                              <th className="border border-gray-300 px-3 py-2 text-left">Number</th>
                              <th className="border border-gray-300 px-3 py-2 text-left">Value</th>
                              <th className="border border-gray-300 px-3 py-2 text-left">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.monthlyTransactions.outflows.map((outflow, index) => (
                              <tr key={index}>
                                <td className="border border-gray-300 px-2 py-1">
                                  <input
                                    type="text"
                                    value={outflow.currency}
                                    onChange={(e) => updateOutflowRow(index, 'currency', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                    placeholder="Numerical"
                                  />
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                  <input
                                    type="number"
                                    value={outflow.number}
                                    onChange={(e) => updateOutflowRow(index, 'number', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                    placeholder="Numerical"
                                  />
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                  <input
                                    type="number"
                                    value={outflow.value}
                                    onChange={(e) => updateOutflowRow(index, 'value', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                    placeholder="Numerical"
                                  />
                                </td>
                                <td className="border border-gray-300 px-2 py-1 text-center">
                                  <button
                                    type="button"
                                    onClick={() => removeOutflowRow(index)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

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

export default BusinessProfileForm;