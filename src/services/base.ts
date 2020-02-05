import { getRepository, Repository, DeepPartial, ObjectType } from "typeorm";
import { BaseEntity } from "db/entity/BaseEntity";

interface Service<E> {
  one: (id: string) => Promise<E>;
  all: () => Promise<E[]>;
  save: (entity: DeepPartial<E>) => Promise<E>;
  delete: (id: string) => Promise<E>;
}

export class BaseService<T extends BaseEntity> implements Service<T> {

  public repository: Repository<T>;

  constructor(entity: ObjectType<T>) {
    this.repository = getRepository(entity)
  }

  async all() {
    return this.repository.find({ where: { isDeleted: false } });
  }

  async one(id: string) {
    return this.repository.findOne(id);
  }

  async save(entity: DeepPartial<T>) {
    return this.repository.save(entity);
  }

  async delete(id: string): Promise<T> {
    let removedEntity = await this.repository.findOne(id);
    (removedEntity as unknown as BaseEntity).delete();
    // @ts-ignore
    return await this.repository.save(removedEntity);
  }

}