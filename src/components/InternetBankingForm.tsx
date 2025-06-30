import React, { useState } from 'react';
import { Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';

interface CorporateAdmin {
  firstName: string;
  lastName: string;
  muNicPassport: string;
  title: string;
  dateOfBirth: string;
  userRole: string;
  authoriserLimitAmount: string;
  authoriserLimitCurrency: string;
  category: string;
  mobileNumber: string;
  emailAddress: string;
  allowAccessToAllAccount: string;
}

interface User {
  firstName: string;
  lastName: string;
  muNicPassport: string;
  title: string;
  dateOfBirth: string;
  userRole: string;
  authoriserLimitAmount: string;
  authoriserLimitCurrency: string;
  category: string;
  mobileNumber: string;
  emailAddress: string;
  allowAccessToAllAccount: string;
}

interface InternetBankingData {
  corporateAdmins: CorporateAdmin[];
  users: User[];
  specialInstructions: string;
}

interface InternetBankingFormProps {
  onNext?: () => void;
  onBack?: () => void;
}

const InternetBankingForm: React.FC<InternetBankingFormProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<InternetBankingData>({
    corporateAdmins: [
      {
        firstName: '',
        lastName: '',
        muNicPassport: '',
        title: '',
        dateOfBirth: '',
        userRole: '',
        authoriserLimitAmount: '',
        authoriserLimitCurrency: '',
        category: '',
        mobileNumber: '',
        emailAddress: '',
        allowAccessToAllAccount: ''
      },
      {
        firstName: '',
        lastName: '',
        muNicPassport: '',
        title: '',
        dateOfBirth: '',
        userRole: '',
        authoriserLimitAmount: '',
        authoriserLimitCurrency: '',
        category: '',
        mobileNumber: '',
        emailAddress: '',
        allowAccessToAllAccount: ''
      },
      {
        firstName: '',
        lastName: '',
        muNicPassport: '',
        title: '',
        dateOfBirth: '',
        userRole: '',
        authoriserLimitAmount: '',
        authoriserLimitCurrency: '',
        category: '',
        mobileNumber: '',
        emailAddress: '',
        allowAccessToAllAccount: ''
      }
    ],
    users: [
      {
        firstName: '',
        lastName: '',
        muNicPassport: '',
        title: '',
        dateOfBirth: '',
        userRole: '',
        authoriserLimitAmount: '',
        authoriserLimitCurrency: '',
        category: '',
        mobileNumber: '',
        emailAddress: '',
        allowAccessToAllAccount: ''
      },
      {
        firstName: '',
        lastName: '',
        muNicPassport: '',
        title: '',
        dateOfBirth: '',
        userRole: '',
        authoriserLimitAmount: '',
        authoriserLimitCurrency: '',
        category: '',
        mobileNumber: '',
        emailAddress: '',
        allowAccessToAllAccount: ''
      },
      {
        firstName: '',
        lastName: '',
        muNicPassport: '',
        title: '',
        dateOfBirth: '',
        userRole: '',
        authoriserLimitAmount: '',
        authoriserLimitCurrency: '',
        category: '',
        mobileNumber: '',
        emailAddress: '',
        allowAccessToAllAccount: ''
      }
    ],
    specialInstructions: ''
  });

  const updateCorporateAdmin = (index: number, field: keyof CorporateAdmin, value: string) => {
    setFormData(prev => ({
      ...prev,
      corporateAdmins: prev.corporateAdmins.map((admin, i) => 
        i === index ? { ...admin, [field]: value } : admin
      )
    }));
  };

  const updateUser = (index: number, field: keyof User, value: string) => {
    setFormData(prev => ({
      ...prev,
      users: prev.users.map((user, i) => 
        i === index ? { ...user, [field]: value } : user
      )
    }));
  };

  const addUser = () => {
    setFormData(prev => ({
      ...prev,
      users: [...prev.users, {
        firstName: '',
        lastName: '',
        muNicPassport: '',
        title: '',
        dateOfBirth: '',
        userRole: '',
        authoriserLimitAmount: '',
        authoriserLimitCurrency: '',
        category: '',
        mobileNumber: '',
        emailAddress: '',
        allowAccessToAllAccount: ''
      }]
    }));
  };

  const removeUser = (index: number) => {
    if (formData.users.length > 1) {
      setFormData(prev => ({
        ...prev,
        users: prev.users.filter((_, i) => i !== index)
      }));
    }
  };

  const handleInputChange = (field: keyof InternetBankingData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            Please keep your account terms and conditions for your apply
          </p>
        </div>

        <form className="space-y-8">
          {/* Internet Banking Application Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-red-600 text-white px-6 py-3">
              <h2 className="text-lg font-semibold">INTERNET BANKING APPLICATION</h2>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Corporate Administrators Section */}
              <div className="space-y-4">
                <div className="bg-gray-100 px-4 py-2 rounded">
                  <h3 className="text-sm font-medium text-gray-800">
                    Please define your corporate administrators (maximum of 3)
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-2 py-2 text-left font-medium min-w-[120px]">Field</th>
                        <th className="border border-gray-300 px-2 py-2 text-center font-medium min-w-[150px]">Corporate Admin 1</th>
                        <th className="border border-gray-300 px-2 py-2 text-center font-medium min-w-[150px]">Corporate Admin 2</th>
                        <th className="border border-gray-300 px-2 py-2 text-center font-medium min-w-[150px]">Corporate Admin 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">First name</td>
                        {formData.corporateAdmins.map((admin, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <input
                              type="text"
                              value={admin.firstName}
                              onChange={(e) => updateCorporateAdmin(index, 'firstName', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                              placeholder="Free Text"
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Last name</td>
                        {formData.corporateAdmins.map((admin, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <input
                              type="text"
                              value={admin.lastName}
                              onChange={(e) => updateCorporateAdmin(index, 'lastName', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                              placeholder="Free Text"
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">MU NIC/Passport Number</td>
                        {formData.corporateAdmins.map((admin, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <input
                              type="text"
                              value={admin.muNicPassport}
                              onChange={(e) => updateCorporateAdmin(index, 'muNicPassport', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                              placeholder="Free Text"
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Title</td>
                        {formData.corporateAdmins.map((admin, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <select
                              value={admin.title}
                              onChange={(e) => updateCorporateAdmin(index, 'title', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                            >
                              <option value="">Dropdown</option>
                              <option value="mr">Mr</option>
                              <option value="mrs">Mrs</option>
                              <option value="ms">Ms</option>
                              <option value="dr">Dr</option>
                            </select>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Date of birth</td>
                        {formData.corporateAdmins.map((admin, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <input
                              type="date"
                              value={admin.dateOfBirth}
                              onChange={(e) => updateCorporateAdmin(index, 'dateOfBirth', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">User Role</td>
                        {formData.corporateAdmins.map((admin, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <select
                              value={admin.userRole}
                              onChange={(e) => updateCorporateAdmin(index, 'userRole', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                            >
                              <option value="">Select</option>
                              <option value="admin">Administrator</option>
                              <option value="authorizer">Authorizer</option>
                              <option value="viewer">Viewer</option>
                            </select>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Authoriser's Limit Amount</td>
                        {formData.corporateAdmins.map((admin, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <input
                              type="number"
                              value={admin.authoriserLimitAmount}
                              onChange={(e) => updateCorporateAdmin(index, 'authoriserLimitAmount', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                              placeholder="Numerical"
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Authoriser Limit Currency</td>
                        {formData.corporateAdmins.map((admin, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <select
                              value={admin.authoriserLimitCurrency}
                              onChange={(e) => updateCorporateAdmin(index, 'authoriserLimitCurrency', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                            >
                              <option value="">Dropdown</option>
                              <option value="MUR">MUR</option>
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                            </select>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Category</td>
                        {formData.corporateAdmins.map((admin, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <select
                              value={admin.category}
                              onChange={(e) => updateCorporateAdmin(index, 'category', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                            >
                              <option value="">Select</option>
                              <option value="category1">Category 1</option>
                              <option value="category2">Category 2</option>
                              <option value="category3">Category 3</option>
                            </select>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Mobile Number</td>
                        {formData.corporateAdmins.map((admin, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <input
                              type="tel"
                              value={admin.mobileNumber}
                              onChange={(e) => updateCorporateAdmin(index, 'mobileNumber', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                              placeholder="Country code dropdown + Numerical"
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Email Address</td>
                        {formData.corporateAdmins.map((admin, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <input
                              type="email"
                              value={admin.emailAddress}
                              onChange={(e) => updateCorporateAdmin(index, 'emailAddress', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                              placeholder="Free Text"
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Allow Access to All Account</td>
                        {formData.corporateAdmins.map((admin, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <select
                              value={admin.allowAccessToAllAccount}
                              onChange={(e) => updateCorporateAdmin(index, 'allowAccessToAllAccount', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                            >
                              <option value="">Dropdown Yes/No</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Users Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded">
                  <h3 className="text-sm font-medium text-gray-800">
                    Please define your users
                  </h3>
                  <button
                    type="button"
                    onClick={addUser}
                    className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                  >
                    Add User
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-2 py-2 text-left font-medium min-w-[120px]">Field</th>
                        {formData.users.map((_, index) => (
                          <th key={index} className="border border-gray-300 px-2 py-2 text-center font-medium min-w-[150px]">
                            <div className="flex items-center justify-between">
                              <span>User {index + 1}</span>
                              {formData.users.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeUser(index)}
                                  className="text-red-600 hover:text-red-700 ml-2"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">First name</td>
                        {formData.users.map((user, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <input
                              type="text"
                              value={user.firstName}
                              onChange={(e) => updateUser(index, 'firstName', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                              placeholder="Free Text"
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Last name</td>
                        {formData.users.map((user, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <input
                              type="text"
                              value={user.lastName}
                              onChange={(e) => updateUser(index, 'lastName', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                              placeholder="Free Text"
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">MU NIC/Passport Number</td>
                        {formData.users.map((user, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <input
                              type="text"
                              value={user.muNicPassport}
                              onChange={(e) => updateUser(index, 'muNicPassport', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                              placeholder="Free Text"
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Title</td>
                        {formData.users.map((user, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <select
                              value={user.title}
                              onChange={(e) => updateUser(index, 'title', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                            >
                              <option value="">Dropdown</option>
                              <option value="mr">Mr</option>
                              <option value="mrs">Mrs</option>
                              <option value="ms">Ms</option>
                              <option value="dr">Dr</option>
                            </select>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Date of birth</td>
                        {formData.users.map((user, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <input
                              type="date"
                              value={user.dateOfBirth}
                              onChange={(e) => updateUser(index, 'dateOfBirth', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">User Role</td>
                        {formData.users.map((user, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <select
                              value={user.userRole}
                              onChange={(e) => updateUser(index, 'userRole', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                            >
                              <option value="">Select</option>
                              <option value="user">User</option>
                              <option value="authorizer">Authorizer</option>
                              <option value="viewer">Viewer</option>
                            </select>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Authoriser's Limit Amount</td>
                        {formData.users.map((user, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <input
                              type="number"
                              value={user.authoriserLimitAmount}
                              onChange={(e) => updateUser(index, 'authoriserLimitAmount', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                              placeholder="Numerical"
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Authoriser Limit Currency</td>
                        {formData.users.map((user, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <select
                              value={user.authoriserLimitCurrency}
                              onChange={(e) => updateUser(index, 'authoriserLimitCurrency', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                            >
                              <option value="">Dropdown</option>
                              <option value="MUR">MUR</option>
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                            </select>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Category</td>
                        {formData.users.map((user, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <select
                              value={user.category}
                              onChange={(e) => updateUser(index, 'category', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                            >
                              <option value="">Select</option>
                              <option value="category1">Category 1</option>
                              <option value="category2">Category 2</option>
                              <option value="category3">Category 3</option>
                            </select>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Mobile Number</td>
                        {formData.users.map((user, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <input
                              type="tel"
                              value={user.mobileNumber}
                              onChange={(e) => updateUser(index, 'mobileNumber', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                              placeholder="Country code dropdown + Numerical"
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Email Address</td>
                        {formData.users.map((user, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <input
                              type="email"
                              value={user.emailAddress}
                              onChange={(e) => updateUser(index, 'emailAddress', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                              placeholder="Free Text"
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">Allow Access to All Account</td>
                        {formData.users.map((user, index) => (
                          <td key={index} className="border border-gray-300 px-1 py-1">
                            <select
                              value={user.allowAccessToAllAccount}
                              onChange={(e) => updateUser(index, 'allowAccessToAllAccount', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                            >
                              <option value="">Dropdown Yes/No</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex justify-center space-x-4 py-4">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Special Instructions */}
              <div className="space-y-4">
                <div className="bg-gray-100 px-4 py-2 rounded">
                  <p className="text-sm text-gray-800">
                    If any of the corporate administrator(s) or user(s) is not be allowed access to all accounts, please indicate any specific instructions.
                  </p>
                </div>
                
                <textarea
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows={4}
                  placeholder="Enter special instructions here..."
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

export default InternetBankingForm;