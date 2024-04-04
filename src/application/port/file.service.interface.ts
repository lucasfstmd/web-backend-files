import { IService } from './service.interface'
import { ObjectId } from 'mongodb'

export interface IFileService extends IService<any> {

    uploadFile(file: any, directory_id: string): Promise<ObjectId>

    downloadFile(id: string): Promise<string>

    findByDirectory(directory: string): Promise<any>
}
