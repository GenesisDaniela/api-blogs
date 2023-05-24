import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from "class-validator"


export class PersonDTO {

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email!: string

    @IsString()
    @IsNotEmpty()
    @Length(6,15)
    password!:string

    @IsString()
    @IsNotEmpty()
    names!: string

    @IsString()
    @IsNotEmpty()
    lastnames!: string

    @IsString()
    @Length(7, 12)
    num_document!:string

    @IsOptional()
    @IsString()
    img?: string

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    role_id!: string

}