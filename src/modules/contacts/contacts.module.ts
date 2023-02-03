import { DatabaseModule } from '@app/core/database/database.module';
import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactsController, AddressesController],
  providers: [ContactsService, AddressesService],
})
export class ContactsModule {}
