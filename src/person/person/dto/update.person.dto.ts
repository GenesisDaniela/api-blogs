import { IsEmail, IsOptional, IsString, Length } from 'class-validator';


export class UpdatePersonDTO{

    @IsEmail()
    @IsOptional()
    @IsString()
    email?:string

    @IsOptional()
    @IsString()
    names?:string

    @IsOptional()
    @IsString()
    lastnames?:string

    @IsString()
    @IsOptional()
    @Length(7, 12)
    num_document?:string

    @IsOptional()
    @IsString()
    img?:string

}