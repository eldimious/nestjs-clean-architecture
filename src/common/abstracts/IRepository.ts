export abstract class IRepository<T, R> {
  abstract create(item: R): Promise<T>;
}