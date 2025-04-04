export type ApiError = {
  message: string;
  status?: number;
}
  
export type ApiResponse<T> = 
  | { data: T; error?: never }
  | { data?: never; error: ApiError };

export type CompanyContract = {
  no: string;
  issue_date: string;
}

export type CompanyPhoto = {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: string;
}

export type Company = {
  id: string;
  contactId: string;
  name: string;
  shortName: string;
  businessEntity: string;
  contract: CompanyContract;
  type: string[];
  status: "active";
  photos: CompanyPhoto[];
  createdAt: string;
  updatedAt: string;
}

export type CompanyUpdateData = {
  name?: string;
  shortName?: string;
  businessEntity?: string;
  contract?: {
    no?: string;
    issue_date?: string;
  };
  type?: string[];
};

export type Contact = {
  id: string;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type ContactUpdateData = {
  lastname?: string;
  firstname?: string;
  phone?: string;
  email?: string;
};

export type UploadedImage = {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: string;
}

export type Info = {
  label: string;
  value: string | string[];
}

export type CardVariant = 'company' | 'info';

export type CardProps = {
  title: string;
  buttonType: 'edit' | 'photo';
  photos?: CompanyPhoto[]
} & (CompanyProps | InfoProps);

type CompanyProps = {
  company: Company;
  info?: never;
}

type InfoProps = {
  info: Info[];
  company?: never;
}