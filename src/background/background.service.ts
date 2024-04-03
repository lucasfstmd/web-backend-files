import { inject, injectable } from 'inversify'
import { Identifier } from '../di/identifiers'
import { IConnectionDB } from '../infrastructure/port/connection.db.interface'
import { IBackgroundTask } from '../application/port/background.task.interface'
import { ConfigMongoDB, IMongoConfig } from '../utils/config.mongodb'

@injectable()
export class BackgroundService {


    constructor(
        @inject(Identifier.MONGODB_CONNECTION) private readonly _mongodb: IConnectionDB,
        @inject(Identifier.REGISTER_SETTINGS_TASK) private readonly _registerSettingsTask: IBackgroundTask
    ) {
    }

    public async startServices(): Promise<void> {
        try {
            /**
             * At the time the application goes up, an event is issued if the
             * database is connected, and in this case, the background tasks will run
             */
            await this._registerSettingsTask.run()

            /**
             * Trying to connect to mongodb.
             * Go ahead only when the run is resolved.
             * Since the application depends on the database connection to work.
             */
            const mongoConfig: IMongoConfig = ConfigMongoDB.options()
            await this._mongodb.tryConnect(mongoConfig.uri, mongoConfig.options)

            // Disbursement DisbursementOutput Task
            /**
             * Trying to connect to IBM Informix DB.
             * Go ahead only when the run is resolved.
             * Since the application depends on the database connection to work.
             */
        } catch (err: any) {
            return Promise.reject(new Error(`Error initializing services in background! ${err?.message}`))
        }
    }

    public async stopServices(): Promise<void> {
        try {
            await this._mongodb.dispose()
        } catch (err: any) {
            return Promise.reject(new Error(`Error stopping services in background! ${err?.message}`))
        }
    }
}
