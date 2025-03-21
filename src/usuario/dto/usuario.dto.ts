import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { SenhaForte } from "../validacao/senha-forte.validator";


export class criaUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: 'Nome não pode ser vazio!'})
    nome:string;

    @IsInt()
    idade: Number;

    @IsString()
    cidade: string;

    @IsEmail(undefined,{message:'email é inválido!'})
    @EmailUnico({message:'email ja cadastrado. Tente novamente.'})
    email: string;

    @IsString()
    telefone: string;

    @MinLength(8,{message: 'Senha precisa de pelo menos 8 digitos.'})
    @SenhaForte({message: "Senha muito fraca. Tente novamente."})
    senha: string;
}
