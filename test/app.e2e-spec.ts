import { ContactEntity } from '@app/core/database/contacts/contacts.entity';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { getConnection } from 'typeorm';
import { AddressEntity } from '../src/core/database/contacts/addresses.entity';
import { AppModule } from './../src/app.module';
import { CreateManyContactsDto } from '../src/modules/contacts/contacts.dto';
import { json, urlencoded } from 'express';

describe('App e2e', () => {
  let app: INestApplication;
  let contactId: string;
  jest.setTimeout(100000);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile()
      .then();

    app = moduleFixture.createNestApplication();
    app.use(json({ limit: '500mb' }));
    app.use(urlencoded({ extended: true, limit: '500mb' }));

    await app.init();
  });

  it('should init app', () => {
    expect(app).toBeTruthy();
  });

  describe('ContactsController', () => {
    const contact = {
      firstName: 'first',
      lastName: 'last',
      age: 55,
      email: 'email@example.com',
      phoneNumber: '+48500600700',
    };

    it('should create by /contacts (POST)', (done) => {
      request(app.getHttpServer())
        .post('/contacts/')
        .send(contact)
        .expect(201)
        .expect((response) => {
          const body = response.body;
          contactId = body.id;

          expect(body).toEqual({ ...contact, id: expect.any(String) });
        })
        .end(done);
    });

    const manyContacts: CreateManyContactsDto = {
      contacts: [],
    };

    for (let i = 0; i < 1000; i++) {
      manyContacts.contacts.push({
        firstName: 'first',
        lastName: 'last',
        age: 55,
        email: 'email@example.com',
        phoneNumber: '+48500600700',
      });
    }

    it('should create many by /contacts/many (POST)', (done) => {
      request(app.getHttpServer())
        .post('/contacts/many')
        .send(manyContacts)
        .expect(201)
        .end(done);
    });

    const invalidContact = {
      firstName: 'first',
      lastName: 'last',
      age: 55,
      email: 'email_example.com',
      phoneNumber: '',
    };

    it('should not create invalid contact by /contacts (POST)', (done) => {
      request(app.getHttpServer())
        .post('/contacts/')
        .send(invalidContact)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          const body = response.body;

          expect(body).toEqual({
            error: 'Bad Request',
            message: [
              'email must be an email',
              'phoneNumber must be a valid phone number',
            ],
            statusCode: 400,
          });
        })
        .end(done);
    });

    it('should get by /contacts/:id (GET)', (done) => {
      const id = contactId;
      request(app.getHttpServer())
        .get(`/contacts/${id}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toEqual({ ...contact, id });
        })
        .end(done);
    });
  });

  describe('AddressesController', () => {
    it('should create by /addresses (POST)', (done) => {
      const contactRepository = getConnection().getRepository(ContactEntity);

      const contact = new ContactEntity();
      contact.age = 22;
      contact.email = 'email.contact@example.com';
      contact.firstName = 'James';
      contact.lastName = 'Bond';
      contact.phoneNumber = '+849342353';

      contactRepository.insert(contact);

      const addresses = {
        contactId: contact.id,
        addresses: [
          {
            city: 'New York',
            address: '19 Times Square',
            postalCode: '24125',
          },
        ],
      };

      request(app.getHttpServer())
        .post('/addresses/many')
        .send(addresses)
        .expect(201)
        .expect((response) => {
          expect(response.body).toEqual(
            addresses.addresses.map((address) => {
              return {
                ...address,
                id: expect.any(String),
              };
            }),
          );
        })
        .end(done);
    });
  });

  afterAll(async () => {
    const addressRepository = getConnection().getRepository(AddressEntity);
    await addressRepository.delete({});
    const contactRepository = getConnection().getRepository(ContactEntity);
    await contactRepository.delete({});
    app.close();
  });
});
