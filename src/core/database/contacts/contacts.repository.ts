import { ICreateContact } from '@app/core/models/contact.model';
import { EntityRepository, Repository } from 'typeorm';
import { ContactEntity } from './contacts.entity';

@EntityRepository(ContactEntity)
export class ContactRepository extends Repository<ContactEntity> {
  public async getOne(contactId: string): Promise<ContactEntity | undefined> {
    return await this.findOne(contactId);
  }

  public async createOne(
    createContact: ICreateContact,
  ): Promise<ContactEntity> {
    const contact = new ContactEntity();

    contact.firstName = createContact.firstName;
    contact.lastName = createContact.lastName;
    contact.age = createContact.age;
    contact.email = createContact.email;
    contact.phoneNumber = createContact.phoneNumber;

    return await this.save(contact);
  }

  public async createMany(
    createContacts: ICreateContact[],
  ): Promise<ContactEntity[]> {
    let values = [];
    let counter = 0;

    const results = [];

    for (const createContact of createContacts) {
      const contact = new ContactEntity();

      const nowDate = new Date();
      contact.createdDate = nowDate;
      contact.updatedDate = nowDate;

      contact.firstName = createContact.firstName;
      contact.lastName = createContact.lastName;
      contact.age = createContact.age;
      contact.email = createContact.email;
      contact.phoneNumber = createContact.phoneNumber;

      values.push(contact);

      if (++counter > 1000) {
        // cause of postgresql driver bug, inserts have to be split
        // otherwise a message similar to:
        // QueryFailedError: bind message has X parameter formats but 0 parameters
        // will be thrown

        const insertResults = await this.save(values);
        results.push(...insertResults);

        values = [];
        counter = 0;
      }
    }

    return results;
  }
}
