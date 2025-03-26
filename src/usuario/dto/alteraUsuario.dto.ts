import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { SenhaForte } from "../validacao/senha-forte.validator";
import { ApiPropertyOptional } from "@nestjs/swagger";


export class alteraUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: 'Nome não pode ser vazio!'})
    @IsOptional()
    @ApiPropertyOptional({
        example: 'Roberto Silva',
        description: 'Esse campo vai ser utilizado como identificador do nome.'
    })
    nome:string;

    @IsInt()
    @IsOptional()
    @ApiPropertyOptional({
        example: 19,
        description: 'Esse campo identifica a idade do usuário.'
    })
    idade: Number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: 'Bauru',
        description: 'Deve ser enviado apenas o nome da cidade'
    })
    cidade: string;

    @IsEmail(undefined,{message:'email é inválido!'})
    @EmailUnico({message:'email ja cadastrado. Tente novamente.'})
    @IsOptional()
    @ApiPropertyOptional({
        example: 'roberto@silva.com',
        description: 'Esse campo ira ser o login do usuário(email).'
    })
    email: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: '14986526654',
        description: 'Esse campo é o contato do usuário (celular)'
    })
    telefone: string;

    @MinLength(6,{message: 'Senha precisa de pelo menos 6 digitos'})
    @SenhaForte({message: 'Senha muito fraca. Tente novamente.'})
    @IsOptional()
    @ApiPropertyOptional({
        example:'Senha@123',
        description: 'A senha deve ter números, letras maius...'
    })
    senha: string;
}
// http://localhost:3000/usuarios
// {
//     "nome": "Joao",
//     "idade": 20,
//     "cidade": "Bauru",
//     "email": "joazin2ho1@outlook.com",
//     "telefone": "996988820",
//     "senha": "12354678"
// }