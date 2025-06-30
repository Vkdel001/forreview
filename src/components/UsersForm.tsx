import React, { useState } from 'react';

interface User {
  firstName: string;
  lastName: string;
  middleName: string;
  title: string;
  dateOfBirth: string;
  muNicPassport: string;
  mobileNo: string;
  email: string;
  userRole: string;
  category: string;
  authoriserLimitAmount: string;
  currency: string;
  allowAccessToAllAccount: string;
}

interface UsersData {
  users: User[];
  specificInstructions: string;
}

interface UsersFormProps {
  onNext?: () => void;
  onBack?: () => void;
}

const UsersForm: React.FC<UsersFormProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<UsersData>({
    users: [
      {
        firstName: '',
        lastName: '',
        middleName: '',
        title: '',
        dateOfBirth: '',
        muNicPassport: '',
        mobileNo: '',
        email: '',
        userRole: '',
        category: '',
        authoriserLimitAmount: '',
        currency: '',
        allowAccessToAllAccount: ''
      },
      {
        firstName: '',
        lastName: '',
        middleName: '',
        title: '',
        dateOfBirth: '',
        muNicPassport: '',
        mobileNo: '',
        email: '',
        userRole: '',
        category: '',
        authoriserLimitAmount: '',
        currency: '',
        allowAccessToAllAccount: ''
      }
    ],
    specificInstructions: ''
  });

  const addUser = () => {
    setFormData(prev => ({
      ...prev,
      users: [...prev.users, {
        firstName: '',
        lastName: '',
        middleName: '',
        title: '',
        dateOfBirth: '',
        muNicPassport: '',
        mobileNo: '',
        email: '',
        userRole: '',
        category: '',
        authoriserLimitAmount: '',
        currency: '',
        allowAccessToAllAccount: ''
      }]
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

  const handleInputChange = (field: keyof UsersData, value: string) => {
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
            Please keep your scanned copies ready to upload as you apply.
          </p>
        </div>

        <form className="space-y-8">
          {/* Internet Banking Application Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-red-600 text-white px-6 py-3">
              <h2 className="text-lg font-semibold">INTERNET BANKING APPLICATION</h2>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Users Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-red-600">User(s)</h3>
                  <p className="text-sm text-gray-600 italic">Please fill in the details for the corporate administrator (maximum 3)</p>
                </div>
                <button
                  type="button"
                  onClick={addUser}
                  className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Add user
                </button>
              </div>

              {/* Users */}
              {formData.users.map((user, index) => (
                <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">User {index + 1}</h4>
                    <p className="text-sm text-gray-600 italic">Please input the full name as per MU NIC/Passport</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={user.firstName}
                        onChange={(e) => updateUser(index, 'firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Free text"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={user.lastName}
                        onChange={(e) => updateUser(index, 'lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Free text"
                      />
                    </div>

                    {/* MU NIC/Passport No. */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        MU NIC/Passport No.
                      </label>
                      <input
                        type="text"
                        value={user.muNicPassport}
                        onChange={(e) => updateUser(index, 'muNicPassport', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Free Text"
                      />
                    </div>

                    {/* Middle Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        value={user.middleName}
                        onChange={(e) => updateUser(index, 'middleName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Optional"
                      />
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <select
                        value={user.title}
                        onChange={(e) => updateUser(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="">Dropdown Mr/Miss/Mrs/autopopulate</option>
                        <option value="mr">Mr</option>
                        <option value="mrs">Mrs</option>
                        <option value="miss">Miss</option>
                        <option value="ms">Ms</option>
                        <option value="dr">Dr</option>
                      </select>
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={user.dateOfBirth}
                        onChange={(e) => updateUser(index, 'dateOfBirth', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Autopopulate if existing"
                      />
                    </div>

                    {/* Mobile No. */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile No.
                      </label>
                      <input
                        type="tel"
                        value={user.mobileNo}
                        onChange={(e) => updateUser(index, 'mobileNo', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="countrycode dropdown/autopopulate if existing"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email:
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e) => updateUser(index, 'email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Autopopulate if existing"
                      />
                    </div>

                    {/* User Role */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        User Role
                      </label>
                      <input
                        type="text"
                        value={user.userRole}
                        onChange={(e) => updateUser(index, 'userRole', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter user role"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        value={user.category}
                        onChange={(e) => updateUser(index, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter category"
                      />
                    </div>

                    {/* Authoriser Limit Amount */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Authoriser Limit Amount
                      </label>
                      <input
                        type="number"
                        value={user.authoriserLimitAmount}
                        onChange={(e) => updateUser(index, 'authoriserLimitAmount', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Numerical"
                      />
                    </div>

                    {/* Currency */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        value={user.currency}
                        onChange={(e) => updateUser(index, 'currency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="">dropdown</option>
                        <option value="MUR">MUR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>

                    {/* Allow access to all accounts */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Allow access to all accounts
                      </label>
                      <select
                        value={user.allowAccessToAllAccount}
                        onChange={(e) => updateUser(index, 'allowAccessToAllAccount', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="">Dropdown Yes/No</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              {/* Special Instructions */}
              <div className="space-y-4">
                <p className="text-sm text-gray-700">
                  If any of the corporate administrator(s) or user(s) is not be allowed access to all accounts, please indicate any specific instructions.
                </p>
                
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

export default UsersForm;