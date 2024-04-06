import { IService } from './service.interface'
import { SendFile } from '../domain/model/send.file'
import { File } from '../domain/model/file'

export interface IFileService extends IService<any> {

    uploadFile(file: any, directory_id: string): Promise<File>

    downloadFile(id: string): Promise<string>

    findByDirectory(directory: string): Promise<Array<any>>

    sendFiles(sendFile: SendFile): Promise<any>
}
