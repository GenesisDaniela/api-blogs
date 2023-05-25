import { HttpResponse } from "../../shared/response/http-response";
import { Request, Response } from 'express';
import AWS from 'aws-sdk';
import { ResponseS3DTO } from "../dto/response-s3.dto";

export class FileController {

    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }
    async uploadFileToS3(bucketName: string, fileName: string, fileContent: any, contentType: string, s3:any): Promise<string> {
        const params: AWS.S3.PutObjectRequest = {
            Bucket: bucketName,
            Key: fileName,
            Body: fileContent,
            ContentType: contentType
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Location);
            }
            });
        });
        }

    getFileFromS3(bucketName: string, fileName: string, s3:any): Promise<string> {
            const params: AWS.S3.GetObjectRequest = {
                Bucket: bucketName,
                Key: fileName
        };
        return new Promise((resolve, reject) => {
            s3.getObject(params, (err: Error, data: AWS.S3.GetObjectOutput) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Body?.toString() || '');
            }
            });
        });
        }
    async upload_file(_req: Request, res: Response) {
        try {
            const file = _req.file;
            if (!file) {
            return this.httpResponse.BadRequest(res, "No se proporcionó ningún archivo");
            }

            const bucket_name="blogs-s3"
            const aws_host = bucket_name+".s3.amazonaws.com"
            const s3 = new AWS.S3();
            this.uploadFileToS3(bucket_name,file.originalname,file.buffer,file.fieldname,s3)
            
            let response:ResponseS3DTO = new ResponseS3DTO(file.fieldname,"https://"+aws_host+"/"+file.originalname,file.originalname,file.mimetype)
            this.httpResponse.Ok(res, response)
        } catch (error) {
            this.httpResponse.Error(res, error)
        }
    }
}