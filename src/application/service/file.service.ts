import { inject, injectable } from 'inversify'
import { IFileService } from '../port/file.service.interface'
import { Identifier } from '../../di/identifiers'
import { IFileRepository } from '../port/file.repository.interface'
import { ILogger } from '../../utils/custom.logger'
import { IQuery } from '../port/query.interface'
import { ObjectId } from 'mongodb'


@injectable()
export class FileService implements IFileService {

    constructor(
        @inject(Identifier.FILE_REPOSITORY) private readonly _repository: IFileRepository,
        @inject(Identifier.LOGGER) private readonly _logger: ILogger
    ) {
    }

    public add(item: any): Promise<any> {
        return Promise.resolve(undefined)
    }

    public downloadFile(id: string): Promise<string> {
        try {
            const result = this._repository.downloadFile(id)
            return Promise.resolve(result)
        } catch (err) {
            this._logger.error(`Error: ${err}`)
            return Promise.reject(err)
        }
    }

    public findByName(fileName: string): Promise<any> {
        try {
            const result = this._repository.findByName(fileName)
            return Promise.resolve(result)
        } catch (err) {
            this._logger.error(`Error: ${err}`)
            return Promise.reject(err)
        }
    }

    public getAll(query: IQuery): Promise<Array<any>> {
        try {
            const result = this._repository.find(query)
            return Promise.resolve(result)
        } catch (err) {
            this._logger.error(`Error: ${err}`)
            return Promise.reject(err)
        }
    }

    public getById(id: string | number, query: IQuery): Promise<any> {
        return Promise.resolve(undefined)
    }

    public remove(id: string | number): Promise<boolean> {
        return Promise.resolve(false)
    }

    public update(item: any): Promise<any> {
        return Promise.resolve(undefined)
    }

    public uploadFile(file: any): Promise<ObjectId> {
        try {
            const result = this._repository.uploadFile(file)
            return Promise.resolve(result)
        } catch (err) {
            this._logger.error(`Error: ${err}`)
            return Promise.reject(err)
        }
    }

    public count(query: IQuery): Promise<number> {
        return Promise.resolve(0)
    }
}
