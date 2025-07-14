import React, { useState, useRef, useEffect } from 'react';
import { Upload, Trash2, Plus, Minus, ChevronDown, ChevronUp, User, Calendar, Globe, Phone, Mail, CreditCard, FileText, Home, Building, Shield } from 'lucide-react';
import { 
  getCompanyTypes, 
  getDocumentsForCompanyType, 
  getProofOfIdentityOptions, 
  getCountries,
  getFileUploadSettings,
  getEntityTypes,
  getEntityTypeConfig,
  getDocumentCategoriesForEntityType,
  isValidCompanyType 
} from '../data/KYCrequirements.ts';

interface DocumentUpload {
  name: string;
  file?: File;
  uploaded: boolean;
  fileUrl?: string;
}

interface FileUpload {
  id: string;
  file: File;
  name: string;
}

interface UBOPerson {
  fullName: string;
  nationality: string;
  residentialAddress: string;
  nicPassport: string;
  controllingOwnershipInterest: string;
}

type ValidEntityType = 'Individual' | 'Corporate' | 'Trust';
type PersonType = 'Shareholder' | 'Director';

interface KYCPerson {
  id: string;
  type: PersonType | '';
  entityType: ValidEntityType | '';
  // Individual fields
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  residingCountry: string;
  proofOfIdentity: string;
  documentId: string;
  mobileNumber: string;
  email: string;
  identityDocuments: FileUpload[];
  addressProofDocuments: FileUpload[];
  // Corporate fields
  entityName: string;
  registrationNumber: string;
  countryOfRegistration: string;
  dateOfRegistration: string;
  registeredAddress: string;
  contactEmail: string;
  contactPhone: string;
  incorporationDocuments: FileUpload[];
  companyAddressProofDocuments: FileUpload[];
  corporateRegistersDocuments: FileUpload[];
  // Trust fields
  trustName: string;
  dateOfIncorporation: string;
  countryOfIncorporation: string;
  trusteeDetails: string;
  settlorDetails: string;
  protectorDetails: string;
  beneficiaryDetails: string;
  trustFormationDocuments: FileUpload[];
  partiesIdentityDocuments: FileUpload[];
  trusteeCorporateDocuments: FileUpload[];
  trusteeAddressProofDocuments: FileUpload[];
}

interface DocumentsUBOData {
  companyType: string;
  documents: DocumentUpload[];
  beneficialOwner: string;
  ultimateBeneficialOwner: string;
  sourceOfFunds: string;
  shareholdersSourceOfWealth: string;
  shareholdersNationalityCountry: string;
  confirmationChecked: boolean;
  uboPersons: UBOPerson[];
  kycPersons: KYCPerson[];
  selectedKYCType: PersonType | '';
  selectedEntityType: ValidEntityType | '';
}

interface DocumentsUBOFormProps {
  onNext?: () => void;
  onBack?: () => void;
}

const DocumentsUBOForm: React.FC<DocumentsUBOFormProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<DocumentsUBOData>({
    companyType: '',
    documents: [],
    beneficialOwner: '',
    ultimateBeneficialOwner: '',
    sourceOfFunds: '',
    shareholdersSourceOfWealth: '',
    shareholdersNationalityCountry: '',
    confirmationChecked: false,
    uboPersons: [],
    kycPersons: [],
    selectedKYCType: '',
    selectedEntityType: ''
  });
  const [error, setError] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<{ [index: number]: number }>({});

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const companyTypes = getCompanyTypes();
  const entityTypes = getEntityTypes();
  const proofOfIdentityOptions = getProofOfIdentityOptions();
  const countries = getCountries();
  const fileUploadSettings = getFileUploadSettings();
const [sectionsOpen, setSectionsOpen] = useState({
    kycSection: true,
    documentsSection: true,
    uboDetailsSection: true,
    uboDeclarationSection: true
  });
  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCompanyTypeChange = (type: string) => {
    if (!isValidCompanyType(type)) {
      setError(`Invalid company type: ${type}`);
      return;
    }
    const docNames = getDocumentsForCompanyType(type);
    const documents = docNames.map((name) => ({ name, uploaded: false }));
    setFormData(prev => ({ ...prev, companyType: type, documents }));
  };

 const handleDocumentUpload = async (index: number, file: File) => {
  // Validate file size
  const maxSizeInBytes = fileUploadSettings.maxFileSize * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    setError(`File size exceeds ${fileUploadSettings.maxFileSize}MB limit`);
    return;
  }

  // Validate file format
  if (!fileUploadSettings.allowedFormats.includes(file.type)) {
    setError('Invalid file format. Please upload images or PDF files only.');
    return;
  }

  // ADDED: Validate index
  if (index < 0 || index >= formData.documents.length) {
    setError(`Invalid document index: ${index}`);
    return;
  }

  // Update state with file metadata
  setFormData(prev => {
    const newDocuments = prev.documents.map((doc, i) =>
      i === index ? { ...doc, file, name: file.name, uploaded: true } : doc
    );
    // ADDED: Debug state update
    console.log('Updated formData.documents:', newDocuments);
    return { ...prev, documents: newDocuments };
  });

  // ADDED: Pass file directly to handleFileUpload to avoid race condition
  setUploading(true);
  setUploadProgress(prev => ({ ...prev, [index]: 0 }));
  await handleFileUpload(index, file); // MODIFIED: Pass file directly
  setUploading(false);
  setUploadProgress(prev => ({ ...prev, [index]: 100 }));
};

  
const handleFileUpload = async (index: number, file: File) => {
  const token = localStorage.getItem('xano_token');
  if (!token) {
    setError('Authentication token is missing');
    console.error('Missing xano_token in localStorage');
    return;
  }
  if (!file) {
    setError('No file provided for upload');
    console.error('File is undefined for index:', index);
    return;
  }
  console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
  const uploadData = new FormData();
  uploadData.append('file', file);
  try {
    const res = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:RnQdTyTK/uploads', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: uploadData
    });
    const result = await res.json();
    // MODIFIED: Use result.path instead of result.file.url
    if (res.ok && result.path) {
      setFormData(prev => {
        const newDocuments = prev.documents.map((doc, i) =>
          i === index ? { ...doc, fileUrl: result.path } : doc
        );
        console.log('File uploaded successfully:', result.path);
        return { ...prev, documents: newDocuments };
      });
    } else {
      setError('File upload failed. Please try again.');
      console.error('Upload response:', result);
    }
  } catch (error) {
    setError('Network error occurred during file upload.');
    console.error('Network error:', error);
  }
};

  const handleCompanyDocumentsUpload = async () => {
    const token = localStorage.getItem('xano_token');
    const appId = localStorage.getItem('application_id');

    if (!token || !appId) {
      setError('Missing authentication token or application ID');
      return false;
    }

    const validDocuments = formData.documents.filter(doc => doc.fileUrl);
    if (!validDocuments.length) {
      setError('No valid documents to upload');
      return false;
    }

    const payload = {
      application_id: Number(appId),
      documents: validDocuments.map(doc => ({
        document_type: doc.name,
        file_url: doc.fileUrl || ''
      }))
    };

    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:RnQdTyTK/upload_company_documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        return true;
      } else {
        const error = await response.json();
        setError(error.message || 'Failed to upload company documents');
        return false;
      }
    } catch (err) {
      setError('Network error occurred during document submission');
      return false;
    }
  };

  const handleDocumentRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.map((doc, i) =>
        i === index ? { ...doc, file: undefined, fileUrl: undefined, uploaded: false } : doc
      )
    }));
    setUploadProgress(prev => {
      const { [index]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleNext = async () => {
    setError('');
    setUploading(true);

    // Ensure all pending uploads are completed
    const pendingUploads = formData.documents
    .map((doc, index) => (doc.file && !doc.fileUrl ? { index, file: doc.file } : null))
    .filter((item): item is { index: number; file: File } => item !== null);

    await Promise.all(pendingUploads.map(({ index, file }) => handleFileUpload(index, file)));
    const success = await handleCompanyDocumentsUpload();
    setUploading(false);

    if (success) {
      onNext?.();
    }
  };

  const handleInputChange = (field: keyof DocumentsUBOData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const scrollToNewPerson = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollWidth,
        behavior: 'smooth'
      });
    }
  };

  const isValidEntityType = (entityType: string): entityType is ValidEntityType => {
    return entityType === 'Individual' || entityType === 'Corporate' || entityType === 'Trust';
  };

  const addKYCPerson = () => {
    if (!formData.selectedKYCType || !formData.selectedEntityType) return;
    
    const newPerson: KYCPerson = {
      id: Date.now().toString(),
      type: formData.selectedKYCType,
      entityType: formData.selectedEntityType,
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      nationality: '',
      residingCountry: '',
      proofOfIdentity: '',
      documentId: '',
      mobileNumber: '',
      email: '',
      identityDocuments: [],
      addressProofDocuments: [],
      entityName: '',
      registrationNumber: '',
      countryOfRegistration: '',
      dateOfRegistration: '',
      registeredAddress: '',
      contactEmail: '',
      contactPhone: '',
      incorporationDocuments: [],
      companyAddressProofDocuments: [],
      corporateRegistersDocuments: [],
      trustName: '',
      dateOfIncorporation: '',
      countryOfIncorporation: '',
      trusteeDetails: '',
      settlorDetails: '',
      protectorDetails: '',
      beneficiaryDetails: '',
      trustFormationDocuments: [],
      partiesIdentityDocuments: [],
      trusteeCorporateDocuments: [],
      trusteeAddressProofDocuments: []
    };
    
    setFormData(prev => ({
      ...prev,
      kycPersons: [...prev.kycPersons, newPerson]
    }));

    setTimeout(scrollToNewPerson, 100);
  };

  const removeKYCPerson = (id: string) => {
    setFormData(prev => ({
      ...prev,
      kycPersons: prev.kycPersons.filter(person => person.id !== id)
    }));
  };

  const updateKYCPerson = (id: string, field: keyof KYCPerson, value: string) => {
    setFormData(prev => ({
      ...prev,
      kycPersons: prev.kycPersons.map(person =>
        person.id === id ? { ...person, [field]: value } : person
      )
    }));
  };

  const validateFileUpload = (files: FileList): boolean => {
    if (files.length > fileUploadSettings.maxFilesPerField) {
      setError(`Maximum ${fileUploadSettings.maxFilesPerField} files allowed per field`);
      return false;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const maxSizeInBytes = fileUploadSettings.maxFileSize * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        setError(`File "${file.name}" exceeds ${fileUploadSettings.maxFileSize}MB limit`);
        return false;
      }
      if (!fileUploadSettings.allowedFormats.includes(file.type)) {
        setError(`File "${file.name}" has invalid format. Please upload images or PDF files only.`);
        return false;
      }
    }
    return true;
  };

  type DocumentFieldType = 
    | 'identityDocuments' 
    | 'addressProofDocuments' 
    | 'incorporationDocuments'
    | 'companyAddressProofDocuments'
    | 'corporateRegistersDocuments'
    | 'trustFormationDocuments'
    | 'partiesIdentityDocuments'
    | 'trusteeCorporateDocuments'
    | 'trusteeAddressProofDocuments';

  const addDocumentToPerson = (personId: string, documentType: DocumentFieldType, files: FileList) => {
    if (!validateFileUpload(files)) return;

    const newFiles: FileUpload[] = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random(),
      file,
      name: file.name
    }));

    setFormData(prev => ({
      ...prev,
      kycPersons: prev.kycPersons.map(person =>
        person.id === personId 
          ? { ...person, [documentType]: [...person[documentType], ...newFiles] }
          : person
      )
    }));
  };

  const removeDocumentFromPerson = (personId: string, documentType: DocumentFieldType, fileId: string) => {
    setFormData(prev => ({
      ...prev,
      kycPersons: prev.kycPersons.map(person =>
        person.id === personId 
          ? { ...person, [documentType]: person[documentType].filter(doc => doc.id !== fileId) }
          : person
      )
    }));
  };

  const getPersonNumber = (person: KYCPerson, index: number) => {
    const sameTypePersons = formData.kycPersons.filter(p => p.type === person.type && p.entityType === person.entityType);
    const personIndex = sameTypePersons.findIndex(p => p.id === person.id);
    return personIndex + 1;
  };

  const addUBOPerson = () => {
    setFormData(prev => ({
      ...prev,
      uboPersons: [...prev.uboPersons, {
        fullName: '',
        nationality: '',
        residentialAddress: '',
        nicPassport: '',
        controllingOwnershipInterest: ''
      }]
    }));
  };

  const removeUBOPerson = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uboPersons: prev.uboPersons.filter((_, i) => i !== index)
    }));
  };

  const updateUBOPerson = (index: number, field: keyof UBOPerson, value: string) => {
    setFormData(prev => ({
      ...prev,
      uboPersons: prev.uboPersons.map((person, i) =>
        i === index ? { ...person, [field]: value } : person
      )
    }));
  };

  const renderGranularDocumentUpload = (person: KYCPerson, documentType: DocumentFieldType, label: string, description: string, icon: React.ReactNode) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
          {icon}
          <span>{label} *</span>
        </label>
        <div className="bg-blue-50 p-2 rounded-md mb-3">
          <p className="text-xs text-blue-700">{description}</p>
        </div>
        <div className="space-y-2">
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              accept={fileUploadSettings.allowedFormats.join(',')}
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  addDocumentToPerson(person.id, documentType, e.target.files);
                }
              }}
            />
            <div className="flex items-center justify-center w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-red-400 hover:bg-red-50 transition-all duration-200">
              <Upload className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-sm text-gray-600">Upload Documents</span>
            </div>
          </label>
          {person[documentType].map((doc) => (
            <div key={doc.id} className="flex items-center justify-between bg-white p-2 rounded border">
              <span className="text-sm text-gray-700 truncate flex-1">{doc.name}</span>
              <button
                type="button"
                onClick={() => removeDocumentFromPerson(person.id, documentType, doc.id)}
                className="ml-2 text-red-600 hover:text-red-800 p-1"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderIndividualFields = (person: KYCPerson) => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
        <input
          type="text"
          value={person.firstName}
          onChange={(e) => updateKYCPerson(person.id, 'firstName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          placeholder="Enter first name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
        <input
          type="text"
          value={person.lastName}
          onChange={(e) => updateKYCPerson(person.id, 'lastName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          placeholder="Enter last name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>Date of Birth *</span>
        </label>
        <input
          type="date"
          value={person.dateOfBirth}
          onChange={(e) => updateKYCPerson(person.id, 'dateOfBirth', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
          <Globe className="w-4 h-4" />
          <span>Nationality *</span>
        </label>
        <select
          value={person.nationality}
          onChange={(e) => updateKYCPerson(person.id, 'nationality', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
        >
          <option value="">Select Nationality</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Residing Country *</label>
        <select
          value={person.residingCountry}
          onChange={(e) => updateKYCPerson(person.id, 'residingCountry', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
        >
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
          <CreditCard className="w-4 h-4" />
          <span>Proof of Identity *</span>
        </label>
        <select
          value={person.proofOfIdentity}
          onChange={(e) => updateKYCPerson(person.id, 'proofOfIdentity', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
        >
          <option value="">Select Document Type</option>
          {proofOfIdentityOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Document ID *</label>
        <input
          type="text"
          value={person.documentId}
          onChange={(e) => updateKYCPerson(person.id, 'documentId', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          placeholder="Enter document ID"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
          <Phone className="w-4 h-4" />
          <span>Mobile Number *</span>
        </label>
        <input
          type="tel"
          value={person.mobileNumber}
          onChange={(e) => updateKYCPerson(person.id, 'mobileNumber', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          placeholder="Enter mobile number"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
          <Mail className="w-4 h-4" />
          <span>Email Address *</span>
        </label>
        <input
          type="email"
          value={person.email}
          onChange={(e) => updateKYCPerson(person.id, 'email', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          placeholder="Enter email address"
        />
      </div>
      {renderGranularDocumentUpload(
        person, 
        'identityDocuments', 
        'Identity Documents', 
        'Valid government-issued identification documents (Passport, NIC, etc.)',
        <FileText className="w-4 h-4" />
      )}
      {renderGranularDocumentUpload(
        person, 
        'addressProofDocuments', 
        'Proof of Address', 
        'Proof of residential address (less than 3 months old)',
        <Home className="w-4 h-4" />
      )}
    </>
  );

  const renderCorporateFields = (person: KYCPerson) => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
          <Building className="w-4 h-4" />
          <span>Name of the Entity *</span>
        </label>
        <input
          type="text"
          value={person.entityName}
          onChange={(e) => updateKYCPerson(person.id, 'entityName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          placeholder="Enter entity name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number *</label>
        <input
          type="text"
          value={person.registrationNumber}
          onChange={(e) => updateKYCPerson(person.id, 'registrationNumber', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          placeholder="Enter registration number"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
          <Globe className="w-4 h-4" />
          <span>Country of Registration *</span>
        </label>
        <select
          value={person.countryOfRegistration}
          onChange={(e) => updateKYCPerson(person.id, 'countryOfRegistration', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
        >
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>Date of Registration *</span>
        </label>
        <input
          type="date"
          value={person.dateOfRegistration}
          onChange={(e) => updateKYCPerson(person.id, 'dateOfRegistration', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
          <Home className="w-4 h-4" />
          <span>Registered Address *</span>
        </label>
        <textarea
          value={person.registeredAddress}
          onChange={(e) => updateKYCPerson(person.id, 'registeredAddress', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          placeholder="Enter registered address"
          rows={2}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
          <Mail className="w-4 h-4" />
          <span>Contact Email *</span>
        </label>
        <input
          type="email"
          value={person.contactEmail}
          onChange={(e) => updateKYCPerson(person.id, 'contactEmail', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          placeholder="Enter contact email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
          <Phone className="w-4 h-4" />
          <span>Contact Phone *</span>
        </label>
        <input
          type="tel"
          value={person.contactPhone}
          onChange={(e) => updateKYCPerson(person.id, 'contactPhone', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          placeholder="Enter contact phone"
        />
      </div>
      {renderGranularDocumentUpload(
        person, 
        'incorporationDocuments', 
        'Incorporation Documents', 
        'Certificate of Incorporation or E-Certificate of Incorporation, Certificate of change of name (if applicable)',
        <Building className="w-4 h-4" />
      )}
      {renderGranularDocumentUpload(
        person, 
        'companyAddressProofDocuments', 
        'Company Address Proof', 
        'Proof of Company\'s registered address',
        <Home className="w-4 h-4" />
      )}
      {renderGranularDocumentUpload(
        person, 
        'corporateRegistersDocuments', 
        'Corporate Registers', 
        'Register of Directors and Register of Shareholders',
        <FileText className="w-4 h-4" />
      )}
    </>
  );

  const renderTrustFields = (person: KYCPerson) => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
          <Shield className="w-4 h-4" />
          <span>Name of Trust *</span>
        </label>
        <input
          type="text"
          value={person.trustName}
          onChange={(e) => updateKYCPerson(person.id, 'trustName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          placeholder="Enter trust name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>Date of Incorporation *</span>
        </label>
        <input
          type="date"
          value={person.dateOfIncorporation}
          onChange={(e) => updateKYCPerson(person.id, 'dateOfIncorporation', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
          <Globe className="w-4 h-4" />
          <span>Country of Incorporation *</span>
        </label>
        <select
          value={person.countryOfIncorporation}
          onChange={(e) => updateKYCPerson(person.id, 'countryOfIncorporation', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
        >
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Trustee Details *</label>
        <textarea
          value={person.trusteeDetails}
          onChange={(e) => updateKYCPerson(person.id, 'trusteeDetails', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          placeholder="Enter trustee details"
          rows={2}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Settlor Details *</label>
        <textarea
          value={person.settlorDetails}
          onChange={(e) => updateKYCPerson(person.id, 'settlorDetails', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          placeholder="Enter settlor details"
          rows={2}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Protector Details</label>
        <textarea
          value={person.protectorDetails}
          onChange={(e) => updateKYCPerson(person.id, 'protectorDetails', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          placeholder="Enter protector details (if applicable)"
          rows={2}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Beneficiary Details *</label>
        <textarea
          value={person.beneficiaryDetails}
          onChange={(e) => updateKYCPerson(person.id, 'beneficiaryDetails', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          placeholder="Enter beneficiary details"
          rows={2}
        />
      </div>
      {renderGranularDocumentUpload(
        person, 
        'trustFormationDocuments', 
        'Trust Formation Documents', 
        'Declaration of Trust or Trust deed',
        <Shield className="w-4 h-4" />
      )}
      {renderGranularDocumentUpload(
        person, 
        'partiesIdentityDocuments', 
        'Parties Identity Documents', 
        'Identity documents and proof of address of the Settlor, Enforcer, Protector & Beneficiaries',
        <User className="w-4 h-4" />
      )}
      {renderGranularDocumentUpload(
        person, 
        'trusteeCorporateDocuments', 
        'Trustee Corporate Documents', 
        'Certificate of Incorporation of Trustee, Register of Directors, Register of Shareholders',
        <Building className="w-4 h-4" />
      )}
      {renderGranularDocumentUpload(
        person, 
        'trusteeAddressProofDocuments', 
        'Trustee Address Proof', 
        'Proof of Registered Address of the Trustee',
        <Home className="w-4 h-4" />
      )}
    </>
  );

  const renderKYCPersonCard = (person: KYCPerson) => {
    const personNumber = getPersonNumber(person, 0);
    const entityConfig = getEntityTypeConfig(person.entityType);
    
    return (
      <div key={person.id} className="bg-gray-50 rounded-lg p-4 relative w-96 flex-shrink-0">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
            {person.entityType === 'Individual' && <User className="w-5 h-5 text-red-600" />}
            {person.entityType === 'Corporate' && <Building className="w-5 h-5 text-blue-600" />}
            {person.entityType === 'Trust' && <Shield className="w-5 h-5 text-green-600" />}
            <span>{person.type} {personNumber}</span>
            <span className="text-sm text-gray-500">({person.entityType})</span>
          </h3>
          <button
            type="button"
            onClick={() => removeKYCPerson(person.id)}
            className="text-red-600 hover:text-red-800 p-1 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div className="grid gap-4 grid-cols-1">
          {person.entityType === 'Individual' && renderIndividualFields(person)}
          {person.entityType === 'Corporate' && renderCorporateFields(person)}
          {person.entityType === 'Trust' && renderTrustFields(person)}
        </div>
      </div>
    );
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
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
            <button
              className="ml-4 text-red-900 underline"
              onClick={() => setError('')}
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Company Type</label>
          <select
            value={formData.companyType}
            onChange={(e) => handleCompanyTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          >
            <option value="">-- Select Company Type --</option>
            {companyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <button
            type="button"
            onClick={() => toggleSection('kycSection')}
            className="w-full bg-red-600 text-white px-6 py-3 flex justify-between items-center focus:outline-none hover:bg-red-700 transition-colors duration-200"
          >
            <h2 className="text-lg font-semibold">KYC INFORMATION</h2>
            {sectionsOpen.kycSection ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {sectionsOpen.kycSection && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Person Type
                  </label>
                  <select
                    value={formData.selectedKYCType}
                    onChange={(e) => handleInputChange('selectedKYCType', e.target.value as PersonType | '')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  >
                    <option value="">-- Select Type --</option>
                    <option value="Shareholder">Shareholders</option>
                    <option value="Director">Directors</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Entity Type
                  </label>
                  <select
                    value={formData.selectedEntityType}
                    onChange={(e) => handleInputChange('selectedEntityType', e.target.value as ValidEntityType | '')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  >
                    <option value="">-- Select Entity Type --</option>
                    <option value="Individual">Individual</option>
                    <option value="Corporate">Corporate Entity</option>
                    <option value="Trust">Trust Entity</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  {formData.selectedKYCType && formData.selectedEntityType ? 
                    `Add KYC information for ${formData.selectedEntityType} ${formData.selectedKYCType.toLowerCase()}s` : 
                    'Select both person type and entity type to add KYC information'
                  }
                </p>
                <button
                  type="button"
                  onClick={addKYCPerson}
                  disabled={!formData.selectedKYCType || !formData.selectedEntityType}
                  className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-colors duration-200 ${
                    formData.selectedKYCType && formData.selectedEntityType
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add {formData.selectedEntityType} {formData.selectedKYCType}</span>
                </button>
              </div>
              {formData.kycPersons.length > 0 ? (
                <div className="mb-4">
                  <h4 className="text-md font-semibold text-gray-800 mb-4">All KYC Persons</h4>
                  <div 
                    ref={scrollContainerRef}
                    className="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  >
                    {formData.kycPersons.map((person) => renderKYCPersonCard(person))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>
                    {formData.selectedKYCType && formData.selectedEntityType ? 
                      `No ${formData.selectedEntityType.toLowerCase()} ${formData.selectedKYCType.toLowerCase()}s added yet. Click "Add ${formData.selectedEntityType} ${formData.selectedKYCType}" to get started.` :
                      'Select both person type and entity type above to add KYC information.'
                    }
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {formData.companyType && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <button
              type="button"
              onClick={() => toggleSection('documentsSection')}
              className="w-full bg-red-600 text-white px-6 py-3 flex justify-between items-center focus:outline-none hover:bg-red-700 transition-colors duration-200"
            >
              <h2 className="text-lg font-semibold">DOCUMENTS</h2>
              {sectionsOpen.documentsSection ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {sectionsOpen.documentsSection && (
              <div className="p-6 space-y-4">
                {formData.documents.map((document, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors duration-200">
                    <div className="flex-1 text-sm font-medium text-gray-700">{document.name}</div>
                    <div className="flex space-x-2 items-center">
                      {uploading && uploadProgress[index] !== undefined && (
                        <div className="text-sm text-gray-500">
                          {uploadProgress[index] < 100 ? `Uploading... ${uploadProgress[index]}%` : 'Uploaded'}
                        </div>
                      )}
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          accept={fileUploadSettings.allowedFormats.join(',')}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleDocumentUpload(index, file);
                          }}
                          disabled={uploading}
                        />
                        <div className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-all duration-200">
                          <Upload className="w-5 h-5" />
                        </div>
                      </label>
                      {document.uploaded && (
                        <button
                          type="button"
                          onClick={() => handleDocumentRemove(index)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-all duration-200"
                          disabled={uploading}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <button
            type="button"
            onClick={() => toggleSection('uboDetailsSection')}
            className="w-full bg-red-600 text-white px-6 py-3 flex justify-between items-center focus:outline-none hover:bg-red-700 transition-colors duration-200"
          >
            <h2 className="text-lg font-semibold">UBO DETAILS</h2>
            {sectionsOpen.uboDetailsSection ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {sectionsOpen.uboDetailsSection && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Beneficial Owner</label>
                  <textarea
                    value={formData.beneficialOwner}
                    onChange={(e) => handleInputChange('beneficialOwner', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    rows={3}
                    placeholder="Enter details"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ultimate Beneficial Owner</label>
                  <textarea
                    value={formData.ultimateBeneficialOwner}
                    onChange={(e) => handleInputChange('ultimateBeneficialOwner', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    rows={3}
                    placeholder="Enter details"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <button
            type="button"
            onClick={() => toggleSection('uboDeclarationSection')}
            className="w-full bg-red-600 text-white px-6 py-3 flex justify-between items-center focus:outline-none hover:bg-red-700 transition-colors duration-200"
          >
            <h2 className="text-lg font-semibold">DECLARATION OF ULTIMATE BENEFICIAL OWNERSHIP (UBO)</h2>
            {sectionsOpen.uboDeclarationSection ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {sectionsOpen.uboDeclarationSection && (
            <div className="p-6">
              <p className="text-sm text-gray-700 mb-4">
                I/We confirm that the information provided above is accurate and complete to the best of my/our knowledge.
              </p>
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="confirmation"
                  checked={formData.confirmationChecked}
                  onChange={(e) => handleInputChange('confirmationChecked', e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="confirmation" className="text-sm text-gray-700 leading-relaxed">
                  I/We confirm that the person(s) listed above is/are the Ultimate Beneficial Owner(s) or Senior Managing Officials of the company.
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            disabled={uploading}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsUBOForm;