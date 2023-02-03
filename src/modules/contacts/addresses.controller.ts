import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateManyAddressesDto, ResponseAddressDto } from './addresses.dto';
import { AddressesService } from './addresses.service';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post('many')
  createMany(
    @Body(ValidationPipe) createAddressesDto: CreateManyAddressesDto,
  ): Observable<ResponseAddressDto[]> {
    return this.addressesService.createMany(createAddressesDto);
  }
}
