import { ApiResponse } from '../utils/types';
import { Company, CompanyPhoto, CompanyUpdateData, Contact, ContactUpdateData } from '../utils/types';

const API_BASE_URL = 'https://test-task-api.allfuneral.com/';

const getAuthHeader = () => ({
  'Authorization': `Bearer ${localStorage.getItem('authToken')}`
});

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      return {
        error: {
          message: errorData.message || response.statusText,
          status: response.status
        }
      };
    } catch {
      return {
        error: {
          message: response.statusText,
          status: response.status
        }
      };
    }
  }
  return { data: await response.json() };
};

const handleError = <T>(error: Error): ApiResponse<T> => ({
  error: {
    message: error.message,
    status: 500
  }
});

export const getCompany = async (companyId: string) => {
  return fetch(`${API_BASE_URL}companies/${companyId}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    }
  })
    .then(response => handleResponse<Company>(response))
    .catch(error => handleError<Company>(error));
};

export const updateCompany = async (companyId: string, data: CompanyUpdateData) => {
  return fetch(`${API_BASE_URL}companies/${companyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(data)
  })
    .then(response => handleResponse<Company>(response))
    .catch(error => handleError<Company>(error));
};

export const deleteCompany = async (companyId: string) => {
  return fetch(`${API_BASE_URL}companies/${companyId}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  })
    .then(response => handleResponse<void>(response))
    .catch(error => handleError<void>(error));
};

export const uploadCompanyImage = async (companyId: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return fetch(`${API_BASE_URL}companies/${companyId}/image`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: formData
  })
    .then(response => handleResponse<CompanyPhoto>(response))
    .catch(error => handleError<CompanyPhoto>(error));
};

export const deleteCompanyImage = async (companyId: string, imageName: string) => {
  const encodedImageName = encodeURIComponent(imageName);
  return fetch(`${API_BASE_URL}companies/${companyId}/image/${encodedImageName}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  })
    .then(response => handleResponse<void>(response))
    .catch(error => handleError<void>(error));
};

export const getContact = async (contactId: string) => {
  return fetch(`${API_BASE_URL}contacts/${contactId}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    }
  })
    .then(response => handleResponse<Contact>(response))
    .catch(error => handleError<Contact>(error));
};

export const updateContact = async (contactId: string, data: ContactUpdateData) => {
  return fetch(`${API_BASE_URL}contacts/${contactId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(data)
  })
    .then(response => handleResponse<Contact>(response))
    .catch(error => handleError<Contact>(error));
};

export const login = async (username: string) => {
  const encodedUsername = encodeURIComponent(username);
  return fetch(`${API_BASE_URL}auth?user=${encodedUsername}`)
    .then(response => {
      if (!response.ok) {
        return handleResponse<string>(response);
      }
      const token = response.headers.get('Authorization')?.split(' ')[1];
      if (!token) throw new Error('Token not received');
      
      localStorage.setItem('authToken', token);
      return { data: token };
    })
    .catch(error => handleError<string>(error));
};