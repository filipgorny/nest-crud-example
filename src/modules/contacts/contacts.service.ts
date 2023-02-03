import { ControllerService } from '@app/core/utilities/controller.service';
import { DatabaseService } from '@app/core/database/database.service';
import { IContact, ICreateContact } from '@app/core/models/contact.model';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseContactDto } from './contacts.dto';

@Injectable()
export class ContactsService extends ControllerService<
  ResponseContactDto,
  IContact
> {
  constructor(private readonly databaseService: DatabaseService) {
    super(ResponseContactDto);
  }

  public getOne(contactId: string): Observable<ResponseContactDto> {
    return this.databaseService
      .contactsGetOne(contactId)
      .pipe(map((contact) => this.dtoMapper(contact)));
  }

  public createOne(createDto: ICreateContact): Observable<ResponseContactDto> {
    return this.databaseService
      .contactsCreateOne(createDto)
      .pipe(map((contact) => this.dtoMapper(contact)));
  }

  public createMany(
    createDtos: ICreateContact[],
  ): Observable<ResponseContactDto[]> {
    return this.databaseService
      .contactsCreateMany(createDtos)
      .pipe(
        map((contacts) => contacts.map((contact) => this.dtoMapper(contact))),
      );
  }
}
