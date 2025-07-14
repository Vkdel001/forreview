import { mapToXanoPayload } from '../utils/mapToXanoPayload';
import { FormData } from '../types/form'; // adjust the path as needed

const BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:l7_A1U96';

export async function createApplication(applicationType: string, companyName: string, token: string) {
  const res = await fetch(`${BASE_URL}/application`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ application_type: applicationType, company_name: companyName }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create application');
  }

  return res.json(); // Should return the new application
}

export async function saveCustomerDetails(data: FormData, applicationId: string): Promise<any> {
  const token = localStorage.getItem('xano_token');
  const payload = mapToXanoPayload(data, applicationId);
  const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:wd7kJ1J1/customer_details', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to save customer details');
  }

  return response.json();
}
