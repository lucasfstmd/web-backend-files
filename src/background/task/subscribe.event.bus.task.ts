import { inject, injectable } from 'inversify'
import { IBackgroundTask } from '../../application/port/background.task.interface'
import { Identifier } from '../../di/identifiers'
import { IEventBus } from '../../infrastructure/port/event.bus.interface'
import { ILogger } from '../../utils/custom.logger'
import { DIContainer } from '../../di/di'
import { DeleteSyncEvent } from '../../application/integration-event/event/delete.sync.event'
import { DeleteSyncEventHandler } from '../../application/integration-event/handler/delete.sync.event.handler'
import { IFileService } from '../../application/port/file.service.interface'

@injectable()
export class SubscribeEventBusTask implements IBackgroundTask {

    constructor(
        @inject(Identifier.RABBITMQ_EVENT_BUS) private readonly _eventBus: IEventBus,
        @inject(Identifier.LOGGER) private readonly _logger: ILogger
    ) {
    }

    public run(): void {
        this.subscribeEvents()
    }

    public async stop(): Promise<void> {
        try {
            await this._eventBus.dispose()
        } catch (err: any) {
            return Promise.reject(new Error(`Error stopping SubscribeEventBusTask! ${err.message}`))
        }
    }

    public subscribeEvents(): void {
        this._eventBus
            .subscribe(new DeleteSyncEvent(), new DeleteSyncEventHandler(
                    DIContainer.get<IFileService>(Identifier.FILE_SERVICE), this._logger),
                DeleteSyncEvent.ROUTING_KEY)
            .then((result: boolean) => {
                if (result) this._logger.info('Subscribe in DeleteSyncEvent successful!')
            })
            .catch(err => {
                this._logger.error(`Error in Subscribe DeleteSyncEvent! ${err.message}`)
            })
    }
}
