import { IIntegrationEventHandler } from './integration.event.handler.interface'
import { inject } from 'inversify'
import { Identifier } from '../../../di/identifiers'
import { ILogger } from '../../../utils/custom.logger'

import { IFileService } from '../../port/file.service.interface'
import { DeleteSyncEvent } from '../event/delete.sync.event'
import { DeleteFiles } from '../../domain/model/delete.files'

export class DeleteSyncEventHandler implements IIntegrationEventHandler<DeleteSyncEvent> {

    constructor(
        @inject(Identifier.FILE_SERVICE) public readonly _fileService: IFileService,
        @inject(Identifier.LOGGER) private readonly _logger: ILogger
    ) {
    }

    public async handle(event: DeleteSyncEvent): Promise<void> {
        try {
            if (!event.files?.files_ids?.length) {
                this._logger.error('Array is empty')
            }
            if (event.files instanceof DeleteFiles) {
                console.log(event.files)
                await this._fileService.deleteFiles(event.files)
                this._logger.info(`Action for event ${event.event_name} executed successfully!`)
            }
        } catch (err: any) {
            this._logger.warn(`An error occurred while attempting `
                .concat(`to perform the operation with the event: ${JSON.stringify(event)}. Error: ${err.message}`)
                .concat(err.description ? ' ' + err.description : ''))
        }
    }
}
