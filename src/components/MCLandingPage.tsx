import React, { useState } from 'react';
import { ChevronDown, FileText, DollarSign } from 'lucide-react';

interface AccountTypeDropdownProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

const AccountTypeDropdown: React.FC<AccountTypeDropdownProps> = ({
  title,
  isOpen,
  onToggle,
  children,
}) => (
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
    {isOpen && children && <div className="px-6 pb-4 bg-gray-50">{children}</div>}
  </div>
);

interface Ticket {
  id: number;
  date: string;
  details: string;
  status: string;
  history: { date: string; action: string }[];
  requestType?: string; // Added to store request type
  attachment?: File | null; // Added to store attachment
}

const MCLandingPage: React.FC<{ onApplyOnline?: () => void }> = ({ onApplyOnline }) => {
  const [activeTab, setActiveTab] = useState<'service' | 'application' | 'companies'>('service');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('');

  // New Service Request modal states
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [newRequestCompany, setNewRequestCompany] = useState('');
  const [newRequestDetails, setNewRequestDetails] = useState('');
  const [newRequestType, setNewRequestType] = useState(''); // Added for request type
  const [newRequestAttachment, setNewRequestAttachment] = useState<File | null>(null); // Added for attachment

  // Manage service tickets in state so we can add new ones
  const [serviceTickets, setServiceTickets] = useState<Ticket[]>([
    {
      id: 1,
      date: '2025-06-20',
      details: 'Requested change in signatory list',
      status: 'Pending',
      history: [
        { date: '2025-06-20 09:12', action: 'Request submitted' },
        { date: '2025-06-21 11:34', action: 'Under review by compliance' },
      ],
    },
    {
      id: 2,
      date: '2025-06-18',
      details: 'Updated registered address',
      status: 'Approved',
      history: [
        { date: '2025-06-18 08:30', action: 'Request submitted' },
        { date: '2025-06-19 10:00', action: 'Reviewed and approved' },
      ],
    },
  ]);

  const managedCompanies = [
    { name: 'ABC Fund Ltd', accountNo: '0012356789', date: '2024-05-10', status: 'Active' },
    { name: 'XYZ Trust Ltd', accountNo: '', date: '', status: 'Work in Progress' },
    { name: 'Global Capital GBC', accountNo: '9988776655', date: '2023-12-18', status: 'Active' },
  ];

  const accountTypes = [
    {
      key: 'listedCompanies',
      title: 'Listed companies',
      requirements: [
        'Certificate of Incorporation',
        'Memorandum and Articles of Association',
        'Board Resolution',
        'Latest Annual Report',
        'Stock Exchange Listing Certificate',
      ],
    },
    {
      key: 'trust',
      title: 'Trust',
      requirements: [
        'Trust Deed',
        'Certificate of Registration',
        'Trustee Identification Documents',
        'Beneficiary Details',
        'Trust Bank Account Authorization',
      ],
    },
    {
      key: 'fund',
      title: 'Fund',
      requirements: [
        'Fund Registration Certificate',
        'Investment Management Agreement',
        'Fund Prospectus',
        'Custodian Agreement',
        'Regulatory Compliance Certificate',
      ],
    },
    {
      key: 'gbc',
      title: 'GBC',
      requirements: [
        'Global Business Company Certificate',
        'Registered Office Certificate',
        'Share Certificate',
        'Director and Shareholder Details',
        'Tax Residency Certificate',
      ],
    },
    {
      key: 'partnership',
      title: 'Partnership',
      requirements: [
        'Partnership Agreement',
        'Certificate of Registration',
        'Partner Identification Documents',
        'Business License',
        'Partnership Bank Account Resolution',
      ],
    },
  ];

  // Request types for dropdown
  const requestTypes = [
    'Check Book',
    'Change Signatory',
    'Transfer Request',
    'KYC Update',
  ];

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const openModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
    setAdditionalInfo('');
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTicket(null);
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
              MANAGEMENT COMPANY PORTAL
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-6 border-b border-gray-300 mb-6">
          <button
            className={`pb-2 border-b-2 text-lg font-semibold ${
              activeTab === 'service'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-600 hover:text-red-600'
            }`}
            onClick={() => setActiveTab('service')}
          >
            Service Requests
          </button>
          <button
            className={`pb-2 border-b-2 text-lg font-semibold ${
              activeTab === 'application'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-600 hover:text-red-600'
            }`}
            onClick={() => setActiveTab('application')}
          >
            New Application
          </button>
          <button
            className={`pb-2 border-b-2 text-lg font-semibold ${
              activeTab === 'companies'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-600 hover:text-red-600'
            }`}
            onClick={() => setActiveTab('companies')}
          >
            Managed Companies
          </button>
        </div>

        {/* Service Requests */}
        {activeTab === 'service' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Service Tickets</h2>
            <table className="w-full table-auto text-left text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Details</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {serviceTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    onClick={() => openModal(ticket)}
                    className="hover:bg-gray-50 cursor-pointer border-b"
                  >
                    <td className="px-4 py-2">{ticket.date}</td>
                    <td className="px-4 py-2">{ticket.details}</td>
                    <td className="px-4 py-2">{ticket.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => setShowNewRequestModal(true)}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            >
              New Service Request
            </button>
          </div>
        )}

        {/* New Application */}
        {activeTab === 'application' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <nav className="text-sm text-gray-600">
                <span>Corporate</span>
                <span className="mx-2">{'>'}</span>
                <span className="text-gray-900 font-medium">Account Opening</span>
              </nav>
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  Hello Management Company! Open a business account with us
                </h1>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={onApplyOnline}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Apply Online
                  </button>
                  <button className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-4 px-8 rounded-lg transition duration-200">
                    Resume Application
                  </button>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200 text-left">
                  Click here for a step by step tutorial
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">What is required for an Account Opening?</h2>
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
                        {accountType.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccountTypeDropdown>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Requirements</h3>
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
        )}

        {/* Managed Companies */}
        {activeTab === 'companies' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Managed Companies</h2>
            <table className="w-full table-auto text-left text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Company Name</th>
                  <th className="px-4 py-2">Account Number</th>
                  <th className="px-4 py-2">Date of Account Opening</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {managedCompanies.map((company, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{company.name}</td>
                    <td className="px-4 py-2">{company.status === 'Work in Progress' ? '-' : company.accountNo}</td>
                    <td className="px-4 py-2">{company.status === 'Work in Progress' ? '-' : company.date}</td>
                    <td className="px-4 py-2">{company.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for Ticket Details */}
        {showModal && selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold mb-2">Ticket Details</h3>
              <p><strong>Date:</strong> {selectedTicket.date}</p>
              <p><strong>Details:</strong> {selectedTicket.details}</p>
              <p><strong>Status:</strong> {selectedTicket.status}</p>

              <div>
                <label htmlFor="additionalInfo" className="block font-medium mb-1">
                  Provide Additional Information:
                </label>
                <textarea
                  id="additionalInfo"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter more details here..."
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Workflow History</h4>
                <ul className="list-disc list-inside text-sm max-h-40 overflow-y-auto">
                  {selectedTicket.history.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.date}:</strong> {item.action}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert('Additional info submitted: ' + additionalInfo);
                    closeModal();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  disabled={additionalInfo.trim() === ''}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for New Service Request */}
        {showNewRequestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold mb-2">Create New Service Request</h3>

              <div>
                <label className="block font-medium mb-1">Request Type:</label>
                <select
                  value={newRequestType}
                  onChange={(e) => setNewRequestType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="" disabled>
                    Select request type
                  </option>
                  {requestTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Company Name:</label>
                <input
                  type="text"
                  value={newRequestCompany}
                  onChange={(e) => setNewRequestCompany(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Request Details:</label>
                <textarea
                  value={newRequestDetails}
                  onChange={(e) => setNewRequestDetails(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  rows={4}
                  placeholder="Enter details of the service request"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Attachment:</label>
                <input
                  type="file"
                  onChange={(e) => setNewRequestAttachment(e.target.files ? e.target.files[0] : null)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => {
                    setShowNewRequestModal(false);
                    setNewRequestCompany('');
                    setNewRequestDetails('');
                    setNewRequestType('');
                    setNewRequestAttachment(null);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    if (newRequestType.trim() && newRequestCompany.trim() && newRequestDetails.trim()) {
                      const newTicket: Ticket = {
                        id: serviceTickets.length + 1,
                        date: new Date().toISOString().split('T')[0],
                        details: newRequestDetails,
                        status: 'Pending',
                        history: [{ date: new Date().toISOString(), action: 'Request submitted' }],
                        requestType: newRequestType,
                        attachment: newRequestAttachment,
                      };
                      setServiceTickets((prev) => [...prev, newTicket]);

                      setShowNewRequestModal(false);
                      setNewRequestCompany('');
                      setNewRequestDetails('');
                      setNewRequestType('');
                      setNewRequestAttachment(null);
                    } else {
                      alert('Please fill all required fields.');
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MCLandingPage;