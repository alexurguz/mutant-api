export default abstract class Respository<T> {
    constructor(protected dataSource: T) {}

    abstract exec(...args: any[]): Promise<any>;
}
