import { injectable } from 'inversify'
import { IConnectionFactory, IDBOptions } from '../port/connection.factory.interface'
import { MongoClient } from 'mongodb'

@injectable()
export class ConnectionFactoryMongodb implements IConnectionFactory {
    /**
     * Create instance of MongoDB.
     *
     * @param uri This specification defines an URI scheme.
     * For more details see: {@link https://docs.mongodb.com/manual/reference/connection-string/}
     * @param options {IDBOptions} Connection setup Options.
     * @return Promise<Connection>
     */
    public createConnection(uri: string, options?: IDBOptions): Promise<MongoClient> {
        return new Promise<MongoClient>((resolve, reject) => {
            return new MongoClient(uri, options)
                .connect()
                .then((result) => resolve(result))
                .catch((err) => reject(err))
        })
    }
}
