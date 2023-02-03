import { Expose, Type } from 'class-transformer';
import { ArrayNotEmpty, IsString, ValidateNested } from 'class-validator';
import {
  ICreateAddress,
  ICreateManyAddresses,
} from '../../core/models/address.model';

export class CreateAddressDto implements ICreateAddress {
  @IsString() city: string;
  @IsString() address: string;
  @IsString() postalCode: string;
}

export class ResponseAddressDto {
  @Expose() id: string;
  @Expose() city: string;
  @Expose() address: string;
  @Expose() postalCode: string;
}

export class CreateManyAddressesDto implements ICreateManyAddresses {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses: CreateAddressDto[];

  contactId: string;
}
