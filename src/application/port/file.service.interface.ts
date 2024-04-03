import { IService } from './service.interface'
import { ObjectId } from 'mongodb'

export interface IFileService extends IService<any> {

    uploadFile(file: any): Promise<ObjectId>

    downloadFile(id: string): Promise<string>

    findByName(fileName: string): Promise<any>
}
