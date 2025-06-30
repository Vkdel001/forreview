export interface CompanyTypeRequirement {
  name: string;
  documents: string[];
  description?: string;
}

export interface DocumentCategory {
  name: string;
  description: string;
  required: boolean;
}

export interface EntityTypeRequirement {
  name: string;
  fields: string[];
  documents: string[];
  documentCategories: DocumentCategory[];
  description: string;
}

export interface KYCConfiguration {
  companyTypes: Record<string, CompanyTypeRequirement>;
  entityTypes: Record<string, EntityTypeRequirement>;
  proofOfIdentityOptions: string[];
  countries: string[];
  fileUploadSettings: {
    maxFileSize: number; // in MB
    allowedFormats: string[];
    maxFilesPerField: number;
  };
}

export const kycConfiguration: KYCConfiguration = {
  companyTypes: {
    'GBC Authorized Foreign': {
      name: 'GBC Authorized Foreign',
      documents: [
        'Certificate of Incorporation',
        'FSC License',
        'Register of Directors',
        'Register of Shareholders'
      ],
      description: 'Global Business Company with foreign authorization'
    },
    'Trust': {
      name: 'Trust',
      documents: [
        'Trust Deed',
        'Settlor ID',
        'Trustee ID',
        'Beneficiary Register'
      ],
      description: 'Trust entity requiring specific documentation'
    },
    'Association': {
      name: 'Association',
      documents: [
        'Constitution Document',
        'Resolution to Open Account',
        'Certificate of Registration'
      ],
      description: 'Association or non-profit organization'
    },
    'Private Company': {
      name: 'Private Company',
      documents: [
        'Certificate of Incorporation',
        'Memorandum of Association',
        'Articles of Association',
        'Register of Directors',
        'Register of Shareholders',
        'Board Resolution'
      ],
      description: 'Private limited company'
    },
    'Partnership': {
      name: 'Partnership',
      documents: [
        'Partnership Agreement',
        'Certificate of Registration',
        'Partners Register',
        'Resolution to Open Account'
      ],
      description: 'Partnership business entity'
    },
    'Sole Proprietorship': {
      name: 'Sole Proprietorship',
      documents: [
        'Business Registration Certificate',
        'Trade License',
        'Owner ID Document'
      ],
      description: 'Individual business ownership'
    }
  },

  entityTypes: {
    'Individual': {
      name: 'Individual',
      fields: [
        'firstName',
        'lastName', 
        'dateOfBirth',
        'nationality',
        'residingCountry',
        'proofOfIdentity',
        'documentId',
        'mobileNumber',
        'email'
      ],
      documents: [
        'Identity Documents (Passport/NIC)',
        'Proof of Address (Less than 3 months)'
      ],
      documentCategories: [
        {
          name: 'Identity Documents',
          description: 'Valid government-issued identification documents',
          required: true
        },
        {
          name: 'Address Proof Documents',
          description: 'Proof of residential address (less than 3 months old)',
          required: true
        }
      ],
      description: 'Natural person as director or shareholder'
    },
    'Corporate': {
      name: 'Corporate Entity',
      fields: [
        'entityName',
        'registrationNumber',
        'countryOfRegistration',
        'dateOfRegistration',
        'registeredAddress',
        'contactEmail',
        'contactPhone'
      ],
      documents: [
        'Certificate of Incorporation or E-Certificate of Incorporation',
        'Certificate of change of name (if applicable)',
        'Proof of Company\'s registered address',
        'Register of Directors',
        'Register of Shareholders'
      ],
      documentCategories: [
        {
          name: 'Incorporation Documents',
          description: 'Certificate of Incorporation or E-Certificate of Incorporation, Certificate of change of name (if applicable)',
          required: true
        },
        {
          name: 'Company Address Proof',
          description: 'Proof of Company\'s registered address',
          required: true
        },
        {
          name: 'Corporate Registers',
          description: 'Register of Directors and Register of Shareholders',
          required: true
        }
      ],
      description: 'Corporate entity as director or shareholder'
    },
    'Trust': {
      name: 'Trust Entity',
      fields: [
        'trustName',
        'dateOfIncorporation',
        'countryOfIncorporation',
        'trusteeDetails',
        'settlorDetails',
        'protectorDetails',
        'beneficiaryDetails'
      ],
      documents: [
        'Declaration of Trust or Trust deed',
        'Identity documents and proof of address of the Settlor, Enforcer, Protector & Beneficiaries',
        'Certificate of Incorporation of Trustee',
        'Register of Directors of the Trustee',
        'Register of Shareholders of the Trustee',
        'Proof of Registered Address of the Trustee'
      ],
      documentCategories: [
        {
          name: 'Trust Formation Documents',
          description: 'Declaration of Trust or Trust deed',
          required: true
        },
        {
          name: 'Parties Identity Documents',
          description: 'Identity documents and proof of address of the Settlor, Enforcer, Protector & Beneficiaries',
          required: true
        },
        {
          name: 'Trustee Corporate Documents',
          description: 'Certificate of Incorporation of Trustee, Register of Directors, Register of Shareholders',
          required: true
        },
        {
          name: 'Trustee Address Proof',
          description: 'Proof of Registered Address of the Trustee',
          required: true
        }
      ],
      description: 'Trust entity as director or shareholder'
    }
  },
  
  proofOfIdentityOptions: [
    'NIC',
    'Passport',
    'Driver License',
    'National ID Card',
    'Voter ID'
  ],
  
  countries: [
    'Mauritius',
    'India',
    'United Kingdom',
    'United States',
    'Canada',
    'Australia',
    'South Africa',
    'France',
    'Germany',
    'Singapore',
    'Hong Kong',
    'UAE',
    'Switzerland',
    'Netherlands',
    'Belgium',
    'Luxembourg',
    'Ireland',
    'New Zealand',
    'Japan',
    'China',
    'Brazil',
    'Argentina',
    'Mexico',
    'Chile',
    'Colombia',
    'Peru',
    'Kenya',
    'Nigeria',
    'Ghana',
    'Egypt',
    'Morocco',
    'Tunisia',
    'Seychelles',
    'Madagascar',
    'Botswana',
    'Namibia',
    'Zambia',
    'Zimbabwe'
  ],
  
  fileUploadSettings: {
    maxFileSize: 10, // 10MB
    allowedFormats: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
    maxFilesPerField: 5
  }
};

// Helper functions for easy access
export const getCompanyTypes = (): string[] => {
  return Object.keys(kycConfiguration.companyTypes);
};

export const getEntityTypes = (): string[] => {
  return Object.keys(kycConfiguration.entityTypes);
};

export const getEntityTypeConfig = (entityType: string): EntityTypeRequirement | null => {
  return kycConfiguration.entityTypes[entityType] || null;
};

export const getDocumentsForCompanyType = (companyType: string): string[] => {
  return kycConfiguration.companyTypes[companyType]?.documents || [];
};

export const getCompanyTypeDescription = (companyType: string): string => {
  return kycConfiguration.companyTypes[companyType]?.description || '';
};

export const getProofOfIdentityOptions = (): string[] => {
  return kycConfiguration.proofOfIdentityOptions;
};

export const getCountries = (): string[] => {
  return kycConfiguration.countries;
};

export const getFileUploadSettings = () => {
  return kycConfiguration.fileUploadSettings;
};

// New helper functions for entity-specific documents
export const getDocumentsForEntityType = (entityType: string): string[] => {
  return kycConfiguration.entityTypes[entityType]?.documents || [];
};

export const getDocumentCategoriesForEntityType = (entityType: string): DocumentCategory[] => {
  return kycConfiguration.entityTypes[entityType]?.documentCategories || [];
};

export const getFieldsForEntityType = (entityType: string): string[] => {
  return kycConfiguration.entityTypes[entityType]?.fields || [];
};

export const getEntityTypeDescription = (entityType: string): string => {
  return kycConfiguration.entityTypes[entityType]?.description || '';
};

// Validation helpers
export const isValidCompanyType = (companyType: string): boolean => {
  return companyType in kycConfiguration.companyTypes;
};

export const isValidEntityType = (entityType: string): boolean => {
  return entityType in kycConfiguration.entityTypes;
};

export const isValidCountry = (country: string): boolean => {
  return kycConfiguration.countries.includes(country);
};

export const isValidProofOfIdentity = (proofType: string): boolean => {
  return kycConfiguration.proofOfIdentityOptions.includes(proofType);
};