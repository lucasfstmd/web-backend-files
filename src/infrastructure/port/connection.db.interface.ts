import { IDisposable } from './disposable.interface'
import { EventEmitter } from 'events'
import { IDBOptions } from './connection.factory.interface'
import { Db } from 'mongodb'

export interface IConnectionDB extends IDisposable {
    connection: any
    eventConnection: EventEmitter
    db: Db | undefined


    tryConnect(uri: string, options?: IDBOptions): Promise<void>
}
