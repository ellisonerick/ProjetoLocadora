import { IsEmail, MinLength } from "class-validator";


export class LoginUsuarioDTO{
    @IsEmail(undefined, {message: 'email inválido'})
    email: string;

    @MinLength(6, {message: 'senha deve conter no minimo 6 digitos'})
    senha: string;
}