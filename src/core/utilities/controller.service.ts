import { plainToClass } from 'class-transformer';

type IClassType<T> = new () => T;

export abstract class ControllerService<T, P> {
  constructor(private readonly dtoClass: IClassType<T>) {}

  protected dtoMapper(dto: P) {
    return plainToClass(this.dtoClass, dto, {
      strategy: 'excludeAll',
    });
  }
}
