import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ContactsModule } from './modules/contacts/contacts.module';

@Module({
  imports: [CoreModule, ContactsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
