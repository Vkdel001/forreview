import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface ApprovalMatrixRow {
  access: string;
  authorisationCombination: string;
  authorisationLimits: string;
  applyToAccounts: string;
}

interface GroupLinkCompany {
  nameOfEntity: string;
  customerIdentificationFile: string;
}

interface ApprovalMatrixData {
  hasApprovalMatrix: string;
  approvalMatrixRows: ApprovalMatrixRow[];
  groupLinkCompanies: GroupLinkCompany[];
  specificInstructions: string;
}

interface ApprovalMatrixFormProps {
  onNext?: () => void;
  onBack?: () => void;
}

const ApprovalMatrixForm: React.FC<ApprovalMatrixFormProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<ApprovalMatrixData>({
    hasApprovalMatrix: '',
    approvalMatrixRows: [
      {
        access: '',
        authorisationCombination: '',
        authorisationLimits: '',
        applyToAccounts: ''
      },
      {
        access: '',
        authorisationCombination: '',
        authorisationLimits: '',
        applyToAccounts: ''
      }
    ],
    groupLinkCompanies: [],
    specificInstructions: ''
  });

  const handleInputChange = (field: keyof ApprovalMatrixData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addApprovalMatrixRow = () => {
    setFormData(prev => ({
      ...prev,
      approvalMatrixRows: [...prev.approvalMatrixRows, {
        access: '',
        authorisationCombination: '',
        authorisationLimits: '',
        applyToAccounts: ''
      }]
    }));
  };

  const removeApprovalMatrixRow = (index: number) => {
    if (formData.approvalMatrixRows.length > 1) {
      setFormData(prev => ({
        ...prev,
        approvalMatrixRows: prev.approvalMatrixRows.filter((_, i) => i !== index)
      }));
    }
  };

  const updateApprovalMatrixRow = (index: number, field: keyof ApprovalMatrixRow, value: string) => {
    setFormData(prev => ({
      ...prev,
      approvalMatrixRows: prev.approvalMatrixRows.map((row, i) => 
        i === index ? { ...row, [field]: value } : row
      )
    }));
  };

  const addGroupLinkCompany = () => {
    setFormData(prev => ({
      ...prev,
      groupLinkCompanies: [...prev.groupLinkCompanies, {
        nameOfEntity: '',
        customerIdentificationFile: ''
      }]
    }));
  };

  const removeGroupLinkCompany = (index: number) => {
    setFormData(prev => ({
      ...prev,
      groupLinkCompanies: prev.groupLinkCompanies.filter((_, i) => i !== index)
    }));
  };

  const updateGroupLinkCompany = (index: number, field: keyof GroupLinkCompany, value: string) => {
    setFormData(prev => ({
      ...prev,
      groupLinkCompanies: prev.groupLinkCompanies.map((company, i) => 
        i === index ? { ...company, [field]: value } : company
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
            Please read your account terms and conditions
          </p>
        </div>

        <form className="space-y-8">
          {/* Approval Matrix Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-red-600 text-white px-6 py-3">
              <h2 className="text-lg font-semibold">APPROVAL MATRIX</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Approval Matrix Description */}
              <div className="space-y-4">
                <div className="text-sm text-gray-700 space-y-2">
                  <p className="font-medium">
                    (This section refers to complex approval matrix that must be set up at the Bank's level and not at the Corporate Administrator's level.)
                  </p>
                  <p>
                    Define the authorisation matrix in line with your approval process and authoriser limits. Group your authorisers into categories before assigning signing instructions held with the Bank; however, this must be supported by the provision of a duly presented board resolution and respective Know Your Customer (KYC) documents of all the authorisers to the Bank.
                  </p>
                  <p>
                    Should you have more complex requirements for approval matrix, please talk to us.
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">
                    Do you have an approval matrix?
                  </label>
                  <select
                    value={formData.hasApprovalMatrix}
                    onChange={(e) => handleInputChange('hasApprovalMatrix', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Dropdown Yes/No</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  <span className="text-blue-500 italic text-sm">
                    If user tick yes, below fields to be displayed
                  </span>
                </div>
              </div>

              {/* Approval Matrix Table */}
              {formData.hasApprovalMatrix === 'yes' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Approval Matrix Configuration</h4>
                    <button
                      type="button"
                      onClick={addApprovalMatrixRow}
                      className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="text-sm">Add Row</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Access</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Authorisation combination</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Authorisation limits</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Apply to all accounts or specific account/s below</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.approvalMatrixRows.map((row, index) => (
                          <tr key={index}>
                            <td className="border border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={row.access}
                                onChange={(e) => updateApprovalMatrixRow(index, 'access', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                                placeholder="Access type"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={row.authorisationCombination}
                                onChange={(e) => updateApprovalMatrixRow(index, 'authorisationCombination', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                                placeholder="Numerical"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={row.authorisationLimits}
                                onChange={(e) => updateApprovalMatrixRow(index, 'authorisationLimits', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                                placeholder="Numerical"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={row.applyToAccounts}
                                onChange={(e) => updateApprovalMatrixRow(index, 'applyToAccounts', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                                placeholder="Free Text"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-1 text-center">
                              <button
                                type="button"
                                onClick={() => removeApprovalMatrixRow(index)}
                                className="text-red-600 hover:text-red-700"
                                disabled={formData.approvalMatrixRows.length <= 1}
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
              )}
            </div>
          </div>

          {/* Group Link Companies Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-red-600 text-white px-6 py-3">
              <h2 className="text-lg font-semibold">GROUP LINK COMPANIES</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Group Link Companies</h4>
                <button
                  type="button"
                  onClick={addGroupLinkCompany}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Add Company</span>
                </button>
              </div>

              {formData.groupLinkCompanies.length > 0 ? (
                <div className="space-y-4">
                  {formData.groupLinkCompanies.map((company, index) => (
                    <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end p-4 border border-gray-200 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name of Entity
                        </label>
                        <input
                          type="text"
                          value={company.nameOfEntity}
                          onChange={(e) => updateGroupLinkCompany(index, 'nameOfEntity', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="Enter entity name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Customer Identification File (CIF):
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={company.customerIdentificationFile}
                            onChange={(e) => updateGroupLinkCompany(index, 'customerIdentificationFile', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            placeholder="Enter CIF"
                          />
                          <button
                            type="button"
                            onClick={() => removeGroupLinkCompany(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No group link companies added yet.</p>
                  <button
                    type="button"
                    onClick={addGroupLinkCompany}
                    className="mt-2 text-red-600 hover:text-red-700 font-medium"
                  >
                    Add the first company
                  </button>
                </div>
              )}

              {/* Specific Instructions */}
              <div className="space-y-4">
                <div className="bg-gray-100 px-4 py-2 rounded">
                  <p className="text-sm text-gray-800">
                    If any of the corporate administrator(s) or user(s) is not be allowed access to all accounts, please indicate any specific instructions.
                  </p>
                </div>
                
                <textarea
                  value={formData.specificInstructions}
                  onChange={(e) => handleInputChange('specificInstructions', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows={4}
                  placeholder="Enter specific instructions here..."
                />
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

export default ApprovalMatrixForm;