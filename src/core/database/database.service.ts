import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAddress } from '../models/address.model';
import { IContact, ICreateContact } from '../models/contact.model';
import { AddressRepository } from './contacts/addresses.repository';
import { ContactRepository } from './contacts/contacts.repository';
import { CreateManyAddressesDto } from '../../modules/contacts/addresses.dto';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(ContactRepository)
    private readonly contactRepository: ContactRepository,
    @InjectRepository(AddressRepository)
    private readonly addressRepository: AddressRepository,
  ) {}

  public contactsGetOne(contactId: string): Observable<IContact> {
    return from(this.contactRepository.getOne(contactId)).pipe(
      map((contact) => {
        if (!contact)
          throw new NotFoundException(
            `Could not find contact by id ${contactId}`,
          );
        return contact;
      }),
    );
  }
  public contactsCreateOne(createDto: ICreateContact): Observable<IContact> {
    return from(this.contactRepository.createOne(createDto));
  }

  public contactsCreateMany(
    createDtos: ICreateContact[],
  ): Observable<IContact[]> {
    return from(this.contactRepository.createMany(createDtos));
  }

  public addressesCreateMany(
    createDtos: CreateManyAddressesDto,
  ): Observable<IAddress[]> {
    return from(
      this.addressRepository.createMany(
        createDtos.addresses.map((address) => {
          return { ...address, contactId: createDtos.contactId };
        }),
      ),
    );
  }
}
