import { IBase } from './base.model';

export interface IAddress extends IBase {
  city: string;
  address: string;
  postalCode: string;
}

export interface ICreateAddress {
  city: string;
  address: string;
  postalCode: string;
}

export interface ICreateManyAddresses {
  addresses: ICreateAddress[];
  contactId: string;
}
