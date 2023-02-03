import { ControllerService } from '@app/core/utilities/controller.service';
import { DatabaseService } from '@app/core/database/database.service';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAddress } from '../../core/models/address.model';
import { ResponseAddressDto, CreateManyAddressesDto } from './addresses.dto';

@Injectable()
export class AddressesService extends ControllerService<
  ResponseAddressDto,
  IAddress
> {
  constructor(private readonly databaseService: DatabaseService) {
    super(ResponseAddressDto);
  }

  public createMany(
    createDtos: CreateManyAddressesDto,
  ): Observable<ResponseAddressDto[]> {
    return this.databaseService
      .addressesCreateMany(createDtos)
      .pipe(
        map((addresses) => addresses.map((address) => this.dtoMapper(address))),
      );
  }
}
