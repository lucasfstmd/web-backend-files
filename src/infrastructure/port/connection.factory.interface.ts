export interface IConnectionFactory {
    createConnection(uri: string, options?: IDBOptions | IEventBusOptions): Promise<any>
}

export interface IDBOptions {
    sslValidate: boolean
    tlsCAFile: any
    tlsCertificateKeyFile: any
    tlsCertificateFile: any
    useNewUrlParser: boolean,
    useUnifiedTopology: boolean
}

export interface IEventBusOptions {
    retries?: number
    interval?: number
    sslOptions?: ISSL
}

export interface ISSL {
    cert?: Buffer
    key?: Buffer
    ca?: Buffer[]
}
