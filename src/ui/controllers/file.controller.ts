import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IFileService } from '../../application/port/file.service.interface'
import { controller, httpGet, httpPost, request, response } from 'inversify-express-utils'
import { Request, Response } from 'express'
import multer from 'multer'
import HttpStatus from 'http-status-codes'
import fs, { unlinkSync } from 'fs'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { Query } from '../../infrastructure/repository/query/query'
import * as path from 'path'

@controller('/v1/files')
export class FileController {

    private static handlerError(res: Response, err: any) {
        const handlerError = ApiExceptionManager.build(err)
        return res.status(handlerError.code)
            .send(handlerError.toJSON())
    }

    constructor(
        @inject(Identifier.FILE_SERVICE) private readonly _service: IFileService,
    ) {
    }

    @httpPost('/upload', multer().single('file'))
    public async uploadFile(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('Nenhum arquivo recebido')
            }
            const filesName = Object.keys(req.files)
            const directory = path.join(__dirname, '..', '..', 'temp-files')
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory)
            }

            const stringResult: string[] = []

            const files = req.files
            filesName.map(async (arq) => {
                const objFiles = files[arq]
                try {
                    const idFile = await this._service.uploadFile(objFiles)
                    stringResult.push(idFile)
                } catch (err) {
                    return FileController.handlerError(res, err)
                }
            })
            return res.status(HttpStatus.OK).send(stringResult)
        } catch (err) {
            return FileController.handlerError(res, err)
        }
    }

    @httpGet('/download/:file_id')
    public async downloadFile(@request() req: Request, @response() res: Response): Promise<void | Response> {
        try {
            const { file_id } = req.params
            const filePath = await this._service.downloadFile(file_id)

            return res.download(filePath, () => {
                unlinkSync(filePath)
            })

        } catch (err) {
            return FileController.handlerError(res, err)
        }
    }

    @httpGet('find/:file_name')
    public async getByName(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const { file_name } = req.params
            const file = await this._service.findByName(file_name)

            return res.status(HttpStatus.OK).send(file)
        } catch (err) {
            return FileController.handlerError(res, err)
        }
    }

    @httpGet('')
    public async getAll(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result = await this._service.getAll(new Query())

            return res.status(HttpStatus.OK).send(result)
        } catch (err) {
            return FileController.handlerError(res, err)
        }
    }

}
