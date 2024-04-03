import { Default } from './default'
import { IDBOptions } from '../infrastructure/port/connection.factory.interface'

/**
 * Interface for defining the parameters needed to connect to the Mongo database.
 * @property {string} uri Connection URI.
 * @property {IDBOptions} options Too many connection options.
 */
export interface IMongoConfig {
    readonly uri: string
    readonly options: IDBOptions
}

export abstract class ConfigMongoDB {
    /**
     * Retrieve the URI and options for connection to MongoDB.
     *
     * @return IMongoConfig Object with the mongodb database connection settings.
     */
    public static options(): IMongoConfig {
        return {
            uri: (process.env.NODE_ENV === 'test') ?
                (process.env.MONGODB_URI_TEST || Default.MONGODB_URI_TEST)
                : (process.env.MONGODB_URI || Default.MONGODB_URI),
            options: (process.env.MONGODB_ENABLE_TLS === 'true') ? {
                sslValidate: true,
                tlsCAFile: process.env.MONGODB_CA_PATH,
                tlsCertificateKeyFile: process.env.MONGODB_KEY_PATH,
                useNewUrlParser: true,
                useUnifiedTopology: true
            } as IDBOptions : undefined
        } as IMongoConfig
    }
}

