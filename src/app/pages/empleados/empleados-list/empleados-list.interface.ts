export interface EmployeeListResponse {
  id:      number;
  uuid:    string;
  status:  number;
  user:    null;
  person:  PersonResponse;
  address: AddressResponse;
  job:     JobResponse;
}

export interface AddressResponse {
  streetNumber:     number;
  apartamentNumber: number;
  street:           string;
  neighborhood:     string;
  municipality:     string;
  state:            string;
  country:          string;
  postalCode:       string;
}

export interface JobResponse {
  id:          number;
  uuid:        string;
  dateIn:      Date;
  dateOut:     Date;
  jobPosition: JobPositionResponse;
}

export interface JobPositionResponse {
  jobPosition: string;
}

export interface PersonResponse {
  fullName:     string;
  fullNameLast: string;
  birthdate:    Date;
  avatar:       null;
}