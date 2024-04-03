import 'reflect-metadata'
import { Container } from 'inversify'
import { Identifier } from './identifiers'
import { ConnectionFactoryMongodb } from '../infrastructure/database/connection.factory.mongodb'
import { ConnectionMongodb } from '../infrastructure/database/connection.mongodb'
import { IConnectionDB } from '../infrastructure/port/connection.db.interface'
import { IConnectionFactory } from '../infrastructure/port/connection.factory.interface'
import { BackgroundService } from '../background/background.service'

import { App } from '../app'
import { CustomLogger, ILogger } from '../utils/custom.logger'
import { IBackgroundTask } from '../application/port/background.task.interface'
import { RegisterTask } from '../background/task/register.task'
import { IFileRepository } from '../application/port/file.repository.interface'
import { FileRepository } from '../infrastructure/repository/file.repository'
import { IFileService } from '../application/port/file.service.interface'
import { FileService } from '../application/service/file.service'
import { FileController } from '../ui/controllers/file.controller'

class IoC {
    private readonly _container: Container

    /**
     * Creates an instance of Di.
     * @private
     */
    constructor() {
        this._container = new Container()
        this.initDependencies()
    }

    /**
     * Get Container inversify.
     *
     * @returns {Container}
     */
    get container(): Container {
        return this._container
    }

    /**
     * Initializes injectable containers.
     *
     * @private
     * @return void
     */
    private initDependencies(): void {
        this._container.bind(Identifier.APP).to(App).inSingletonScope()

        // Controllers
        this._container
            .bind<FileController>(Identifier.FILE_CONTROLLER)
            .to(FileController).inSingletonScope()

        // Repository
        this._container
            .bind<IFileRepository>(Identifier.FILE_REPOSITORY)
            .to(FileRepository).inSingletonScope()

        // Service
        this._container
            .bind<IFileService>(Identifier.FILE_SERVICE)
            .to(FileService).inSingletonScope()

        // Background Services
        this._container
            .bind<IConnectionFactory>(Identifier.MONGODB_CONNECTION_FACTORY)
            .to(ConnectionFactoryMongodb).inSingletonScope()
        this._container
            .bind<IConnectionDB>(Identifier.MONGODB_CONNECTION)
            .to(ConnectionMongodb).inSingletonScope()
        this._container
            .bind(Identifier.BACKGROUND_SERVICE)
            .to(BackgroundService).inSingletonScope()

        // Tasks
        this._container
            .bind<IBackgroundTask>(Identifier.REGISTER_SETTINGS_TASK)
            .to(RegisterTask).inRequestScope()

        // Log
        this._container.bind<ILogger>(Identifier.LOGGER).to(CustomLogger).inSingletonScope()
    }
}

export const DIContainer = new IoC().container
