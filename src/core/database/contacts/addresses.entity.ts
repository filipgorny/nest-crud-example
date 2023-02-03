import { Column, Entity, ManyToOne } from 'typeorm';
import { IAddress } from '../../models/address.model';
import { CommonBaseEntity } from '../common/common.baseEntity';
import { ContactEntity } from './contacts.entity';

@Entity()
export class AddressEntity extends CommonBaseEntity implements IAddress {
  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  postalCode: string;

  @ManyToOne(() => ContactEntity, (contact) => contact.addresses, {
    onDelete: 'CASCADE',
  })
  contact: ContactEntity;
}
