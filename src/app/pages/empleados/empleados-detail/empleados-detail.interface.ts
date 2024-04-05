export interface EmployeeDetailRequest {
  person:          Person;
  address:         Address;
  job:             Job;
  contacts:        Contact[];
  identifications: Identification[];
  degrees:         Degree[];
}

export interface Address {
  streetNumber:     number;
  apartamentNumber: number;
  street:           string;
  neighborhood:     string;
  municipality:     string;
  state:            string;
  country:          string;
  postalCode:       string;
}

export interface Contact {
  value:     string;
  contactId: number;
}

export interface Degree {
  degreeId:    number;
  institution: string;
  dateStart:   Date;
  dateEnd:     Date;
  title:       null;
  cedula:      null;
  inCourse:    boolean;
}

export interface Identification {
  value:            string;
  expires:          null;
  identificationId: number;
}

export interface Job {
  dateIn:        Date;
  dateOut:       Date;
  jobPositionId: number;
}

export interface Person {
  name:           string;
  middleName:     null;
  lastName:       string;
  secondLastName: null;
  birthdate:      Date;
  avatar:         null;
  genderId:       number;
}
