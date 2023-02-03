import { IBase as ICommonBase } from '@app/core/models/base.model';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class CommonBaseEntity implements ICommonBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;
}
