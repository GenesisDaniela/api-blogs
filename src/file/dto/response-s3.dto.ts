import { IsNotEmpty, IsString } from "class-validator"


export class ResponseS3DTO {

    @IsNotEmpty()
    @IsString()
    fieldname!: string

    @IsNotEmpty()
    @IsString()
    awsURL!: string

    @IsNotEmpty()
    @IsString()
    originalname!: string
    
    @IsNotEmpty()
    @IsString()
    mimetype!: string

    constructor(fieldName:string,awsURL:string,originalname:string,mimetype:string) {
        this.fieldname=fieldName,
        this.awsURL=awsURL,
        this.originalname=originalname,
        this.mimetype=mimetype
    }

}