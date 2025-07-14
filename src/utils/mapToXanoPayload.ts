import { FormData } from '../types/form';
export function mapToXanoPayload(data: FormData, applicationId: string) {
  return {
    application_id: applicationId,
    business_category: data.businessCategory,
    entity_name: data.entityName,
    brn: data.brn,
    incorporation_no: data.incorporationNo,
    incorporation_date: data.incorporationDate,
    country_of_incorporation: data.countryOfIncorporation,
    registered_address: data.registeredAddress,
    country: data.country,
    is_different_correspondence_address: data.isDifferentCorrespondenceAddress,
    correspondence_address: data.correspondenceAddress,
    countries_of_operation: data.countriesOfOperation,
    account_type: data.accountType,
    currency: data.currency,
    initial_deposit: data.initialDeposit,
    source_of_funds: data.sourceOfFunds,
    purpose_of_account: data.purposeOfAccount,
    source_of_accumulated_wealth: data.sourceOfAccumulatedWealth,
    chequebook_order: data.chequebookOrder,
    chequebook_books: data.chequebookBooks,
    chequebook_leaves: data.chequebookLeaves,
    chequebook_collection: data.chequebookCollection,
    swift_copy_delivery: data.swiftCopyDelivery,
    swift_delivery_email: data.swiftDeliveryEmail,
    estatement_email: data.estatementEmail
  };
}