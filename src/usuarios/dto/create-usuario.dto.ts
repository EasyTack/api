import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateUsuarioDto {
    @IsString()
    @MaxLength(30)
    readonly nome: string;

    @IsString()
    @MaxLength(30)
    readonly sobrenome: string;

    @IsString()
    @MaxLength(40)
    readonly usuario: string;

    @IsString()
    @MaxLength(14)
    @IsNotEmpty()
    readonly documento: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    senha: string;
}
