export interface FormData {
  businessCategory: string;
  entityName: string;
  brn: string;
  incorporationNo: string;
  incorporationDate: string;
  countryOfIncorporation: string;
  registeredAddress: string;
  country: string;
  isDifferentCorrespondenceAddress: boolean;
  correspondenceAddress: string;
  countriesOfOperation: string[];
  accountType: string;
  currency: string;
  initialDeposit: string;
  sourceOfFunds: string;
  purposeOfAccount: string;
  sourceOfAccumulatedWealth: string[];
  chequebookOrder: string;
  chequebookBooks: string;
  chequebookLeaves: string;
  chequebookCollection: string;
  swiftCopyDelivery: boolean;
  swiftDeliveryEmail: string;
  estatementEmail: string;
}
