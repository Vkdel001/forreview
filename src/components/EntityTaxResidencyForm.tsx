import React, { useState } from 'react';
import { Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';

interface TaxResidenceEntry {
  countryOfTaxResidence: string;
  tin: string;
  noTinReason: string;
  reasonBExplanation: string;
}

interface EntityTaxResidencyData {
  isTaxResidentInMauritius: string;
  isTaxResidentInOtherCountry: string;
  entityCrsStatus: string;
  isFinancialInstitutionInvestmentEntity: string;
  isInvestmentEntityInNonParticipatingJurisdiction: string;
  isOtherInvestmentEntity: string;
  isFinancialInstitutionDepository: string;
  isActiveNfeRegularlyTraded: string;
  establishedSecuritiesMarketName: string;
  relatedEntityName: string;
  isActiveNfeGovernmentEntity: string;
  isActiveNfeInternationalOrganisation: string;
  isActiveNfeOtherThanStartupOrNonProfit: string;
  isPassiveNfe: string;
  controllingPersonName: string;
  taxResidenceEntries: TaxResidenceEntry[];
}

interface EntityTaxResidencyFormProps {
  onNext?: () => void;
  onBack?: () => void;
}

const EntityTaxResidencyForm: React.FC<EntityTaxResidencyFormProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<EntityTaxResidencyData>({
    isTaxResidentInMauritius: '',
    isTaxResidentInOtherCountry: '',
    entityCrsStatus: '',
    isFinancialInstitutionInvestmentEntity: '',
    isInvestmentEntityInNonParticipatingJurisdiction: '',
    isOtherInvestmentEntity: '',
    isFinancialInstitutionDepository: '',
    isActiveNfeRegularlyTraded: '',
    establishedSecuritiesMarketName: '',
    relatedEntityName: '',
    isActiveNfeGovernmentEntity: '',
    isActiveNfeInternationalOrganisation: '',
    isActiveNfeOtherThanStartupOrNonProfit: '',
    isPassiveNfe: '',
    controllingPersonName: '',
    taxResidenceEntries: [
      { countryOfTaxResidence: '', tin: '', noTinReason: '', reasonBExplanation: '' },
      { countryOfTaxResidence: '', tin: '', noTinReason: '', reasonBExplanation: '' }
    ]
  });

  const [isIncorporatedInUSA, setIsIncorporatedInUSA] = useState('');
  const [sectionsOpen, setSectionsOpen] = useState({
    crsSection: false,
    taxResidenceSection: false,
  });

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleInputChange = (field: keyof EntityTaxResidencyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTaxResidenceEntry = () => {
    setFormData(prev => ({
      ...prev,
      taxResidenceEntries: [...prev.taxResidenceEntries, { countryOfTaxResidence: '', tin: '', noTinReason: '', reasonBExplanation: '' }]
    }));
  };

  const removeTaxResidenceEntry = (index: number) => {
    if (formData.taxResidenceEntries.length > 1) {
      setFormData(prev => ({
        ...prev,
        taxResidenceEntries: prev.taxResidenceEntries.filter((_, i) => i !== index)
      }));
    }
  };

  const updateTaxResidenceEntry = (index: number, field: keyof TaxResidenceEntry, value: string) => {
    setFormData(prev => ({
      ...prev,
      taxResidenceEntries: prev.taxResidenceEntries.map((entry, i) => 
        i === index ? { ...entry, [field]: value } : entry
      )
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
            Please keep your scanned copies ready to upload as you apply.
          </p>
        </div>

        <form className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Is the company incorporated in USA?
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isIncorporatedInUSA"
                  value="yes"
                  checked={isIncorporatedInUSA === 'yes'}
                  onChange={(e) => setIsIncorporatedInUSA(e.target.value)}
                  className="mr-2 text-red-600 focus:ring-red-500"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isIncorporatedInUSA"
                  value="no"
                  checked={isIncorporatedInUSA === 'no'}
                  onChange={(e) => setIsIncorporatedInUSA(e.target.value)}
                  className="mr-2 text-red-600 focus:ring-red-500"
                />
                No
              </label>
            </div>
          </div>

          {isIncorporatedInUSA === 'yes' && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => toggleSection('crsSection')}
                className="w-full bg-red-600 text-white px-6 py-3 flex justify-between items-center focus:outline-none"
              >
                <h2 className="text-lg font-semibold">ENTITY TAX RESIDENCY SELF-CERTIFICATION (CRS)</h2>
                {sectionsOpen.crsSection ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              
              {sectionsOpen.crsSection && (
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-sm font-medium text-gray-700">A</div>
                      <div className="col-span-7 text-sm text-gray-700">
                        Is the Entity a tax resident in Mauritius?
                      </div>
                      <div className="col-span-4">
                        <select
                          value={formData.isTaxResidentInMauritius}
                          onChange={(e) => handleInputChange('isTaxResidentInMauritius', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Dropdown Yes/No</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-sm font-medium text-gray-700">B</div>
                      <div className="col-span-7 text-sm text-gray-700">
                        Is the Entity a tax resident in any other country?
                      </div>
                      <div className="col-span-4">
                        <select
                          value={formData.isTaxResidentInOtherCountry}
                          onChange={(e) => handleInputChange('isTaxResidentInOtherCountry', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Dropdown Yes/No</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Entity CRS Status</h4>
                    
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-sm font-medium text-gray-700">a</div>
                      <div className="col-span-7 text-sm text-gray-700">
                        Financial Institution - Investment Entity
                      </div>
                      <div className="col-span-4">
                        <select
                          value={formData.isFinancialInstitutionInvestmentEntity}
                          onChange={(e) => handleInputChange('isFinancialInstitutionInvestmentEntity', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Dropdown Yes/No</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-sm font-medium text-gray-700">i</div>
                      <div className="col-span-7 text-sm text-gray-700">
                        An Investment Entity located in a Non-Participating Jurisdiction and managed by another Financial Institution
                      </div>
                      <div className="col-span-4">
                        <select
                          value={formData.isInvestmentEntityInNonParticipatingJurisdiction}
                          onChange={(e) => handleInputChange('isInvestmentEntityInNonParticipatingJurisdiction', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Dropdown Yes/No</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-sm font-medium text-gray-700">ii</div>
                      <div className="col-span-7 text-sm text-gray-700">
                        Other Investment Entity
                      </div>
                      <div className="col-span-4">
                        <select
                          value={formData.isOtherInvestmentEntity}
                          onChange={(e) => handleInputChange('isOtherInvestmentEntity', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Dropdown Yes/No</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-sm font-medium text-gray-700">b</div>
                      <div className="col-span-7 text-sm text-gray-700">
                        Financial Institution - Depository Institution, Custodial Institution or Specified Insurance Company
                      </div>
                      <div className="col-span-4">
                        <select
                          value={formData.isFinancialInstitutionDepository}
                          onChange={(e) => handleInputChange('isFinancialInstitutionDepository', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Dropdown Yes/No</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-sm font-medium text-gray-700">c</div>
                      <div className="col-span-7 text-sm text-gray-700">
                        Active NFE - a corporation the stock of which is regularly traded on an established securities market or a corporation which is a related entity of such a corporation
                      </div>
                      <div className="col-span-4">
                        <select
                          value={formData.isActiveNfeRegularlyTraded}
                          onChange={(e) => handleInputChange('isActiveNfeRegularlyTraded', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Dropdown Yes/No</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-8 text-sm text-gray-700">
                        Name of the established securities market on which the corporation is regularly traded:
                      </div>
                      <div className="col-span-4">
                        <input
                          type="text"
                          value={formData.establishedSecuritiesMarketName}
                          onChange={(e) => handleInputChange('establishedSecuritiesMarketName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="Free text"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-8 text-sm text-gray-700">
                        If you are a Related Entity of a regularly traded corporation, please provide the name of the regularly traded corporation that the Entity in (c) is a Related Entity of
                      </div>
                      <div className="col-span-4">
                        <input
                          type="text"
                          value={formData.relatedEntityName}
                          onChange={(e) => handleInputChange('relatedEntityName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="Free text"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-sm font-medium text-gray-700">d</div>
                      <div className="col-span-7 text-sm text-gray-700">
                        Active NFE - a Government Entity or Central Bank
                      </div>
                      <div className="col-span-4">
                        <select
                          value={formData.isActiveNfeGovernmentEntity}
                          onChange={(e) => handleInputChange('isActiveNfeGovernmentEntity', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Dropdown Yes/No</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-sm font-medium text-gray-700">e</div>
                      <div className="col-span-7 text-sm text-gray-700">
                        Active NFE - an International Organisation
                      </div>
                      <div className="col-span-4">
                        <select
                          value={formData.isActiveNfeInternationalOrganisation}
                          onChange={(e) => handleInputChange('isActiveNfeInternationalOrganisation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Dropdown Yes/No</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-sm font-medium text-gray-700">f</div>
                      <div className="col-span-7 text-sm text-gray-700">
                        Active NFE - other than (example a start-up NFE or a non-profit NFE)
                      </div>
                      <div className="col-span-4">
                        <select
                          value={formData.isActiveNfeOtherThanStartupOrNonProfit}
                          onChange={(e) => handleInputChange('isActiveNfeOtherThanStartupOrNonProfit', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Dropdown Yes/No</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-sm font-medium text-gray-700">g</div>
                      <div className="col-span-7 text-sm text-gray-700">
                        Passive NFE (Note: if ticking this box please also complete Part (h) below)
                      </div>
                      <div className="col-span-4">
                        <select
                          value={formData.isPassiveNfe}
                          onChange={(e) => handleInputChange('isPassiveNfe', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Dropdown Yes/No</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-sm font-medium text-gray-700">h</div>
                      <div className="col-span-7 text-sm text-gray-700">
                        Name of controlling person:
                      </div>
                      <div className="col-span-4">
                        <select
                          value={formData.controllingPersonName}
                          onChange={(e) => handleInputChange('controllingPersonName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Dropdown Yes/No</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('taxResidenceSection')}
              className="w-full bg-gray-400 text-white px-6 py-3 flex justify-between items-center focus:outline-none"
            >
              <h2 className="text-lg font-semibold">COUNTRY/JURISDICTION OF TAX RESIDENCE AND TIN</h2>
              {sectionsOpen.taxResidenceSection ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            
            {sectionsOpen.taxResidenceSection && (
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Tax Residence Information</h4>
                  <button
                    type="button"
                    onClick={addTaxResidenceEntry}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Add Entry</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Country of Tax Residence</th>
                        <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">TIN</th>
                        <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">If no TIN available, enter reason dropdown A/B/C</th>
                        <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">If you have selected Reason B, explain why</th>
                        <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.taxResidenceEntries.map((entry, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-2 py-1">
                            <input
                              type="text"
                              value={entry.countryOfTaxResidence}
                              onChange={(e) => updateTaxResidenceEntry(index, 'countryOfTaxResidence', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                              placeholder="Enter country"
                            />
                          </td>
                          <td className="border border-gray-300 px-2 py-1">
                            <input
                              type="text"
                              value={entry.tin}
                              onChange={(e) => updateTaxResidenceEntry(index, 'tin', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                              placeholder="Enter TIN"
                            />
                          </td>
                          <td className="border border-gray-300 px-2 py-1">
                            <input
                              type="text"
                              value={entry.noTinReason}
                              onChange={(e) => updateTaxResidenceEntry(index, 'noTinReason', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                              placeholder="dropdown A/B/C"
                            />
                          </td>
                          <td className="border border-gray-300 px-2 py-1">
                            <input
                              type="text"
                              value={entry.reasonBExplanation}
                              onChange={(e) => updateTaxResidenceEntry(index, 'reasonBExplanation', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                              placeholder="Explanation"
                            />
                          </td>
                          <td className="border border-gray-300 px-2 py-1 text-center">
                            <div className="flex items-center justify-center space-x-1">
                              <button
                                type="button"
                                onClick={addTaxResidenceEntry}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeTaxResidenceEntry(index)}
                                className="text-red-600 hover:text-red-700"
                                disabled={formData.taxResidenceEntries.length <= 1}
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntityTaxResidencyForm;