import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreateContactDto,
  CreateManyContactsDto,
  ResponseContactDto,
} from './contacts.dto';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post('many')
  createMany(
    @Body(ValidationPipe) createContactDtos: CreateManyContactsDto,
  ): Observable<ResponseContactDto[]> {
    return this.contactsService.createMany(createContactDtos.contacts);
  }

  @Get(':contactId')
  getOne(
    @Param('contactId') contactId: string,
  ): Observable<ResponseContactDto> {
    return this.contactsService.getOne(contactId);
  }

  @Post()
  createOne(
    @Body(ValidationPipe) createContactDto: CreateContactDto,
  ): Observable<ResponseContactDto> {
    return this.contactsService.createOne(createContactDto);
  }
}
