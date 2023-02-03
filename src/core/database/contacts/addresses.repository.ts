import { EntityRepository, Repository } from 'typeorm';
import { ICreateAddress } from '../../models/address.model';
import { AddressEntity } from './addresses.entity';

@EntityRepository(AddressEntity)
export class AddressRepository extends Repository<AddressEntity> {
  public async createMany(
    createAddresses: ICreateAddress[],
  ): Promise<AddressEntity[]> {
    const addresses: AddressEntity[] = [];

    for (const createAddress of createAddresses) {
      const address = new AddressEntity();
      address.address = createAddress.address;
      address.postalCode = createAddress.postalCode;
      address.city = createAddress.city;

      addresses.push(address);
    }

    return this.save(addresses);
  }
}
