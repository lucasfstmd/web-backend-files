import { ObjectId } from 'mongodb'
import { IRepository } from './repository.interface'

export interface IFileRepository extends IRepository<any> {

    uploadFile(file: any): Promise<ObjectId>

    downloadFile(id: string): Promise<string>

    findByName(fileName: string): Promise<any>
}
