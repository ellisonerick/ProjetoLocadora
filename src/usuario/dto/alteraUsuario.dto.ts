import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { SenhaForte } from "../validacao/senha-forte.validator";


export class alteraUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: 'Nome não pode ser vazio!'})
    @IsOptional()
    nome:string;

    @IsInt()
    @IsOptional()
    idade: Number;

    @IsString()
    @IsOptional()
    cidade: string;

    @IsEmail(undefined,{message:'email é inválido!'})
    @EmailUnico({message:'email ja cadastrado. Tente novamente.'})
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    telefone: string;

    @MinLength(6,{message: 'Senha precisa de pelo menos 6 digitos'})
    @SenhaForte({message: 'Senha muito fraca. Tente novamente.'})
    @IsOptional()
    senha: string;
}
