import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { SenhaForte } from "../validacao/senha-forte.validator";
import { ApiProperty } from "@nestjs/swagger";


export class criaUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: 'Nome não pode ser vazio!'})
    @ApiProperty({
        example: 'Roberto Silva',
        description: 'Esse campo vai ser utilizado como identificador do nome.'
    })
    nome:string;

    @IsInt()
    @ApiProperty({
        example: 19,
        description: 'Esse campo identifica a idade do usuário.'
    })
    idade: Number;

    @MinLength(8,{message: 'CEP precisa de pelo menos 8 digitos.'})
    @IsString()
    @ApiProperty({
        example: '17067200',
        description: 'Deve ser enviado um cep válido'
    })
    cep: string;

    @IsString()
    @ApiProperty({
        example: 'Apartamento, Casa, Comercial, Loja',
        description: 'Deve ser informado o complemento do endereço'
    })
    complemento: string;

    @IsEmail(undefined,{message:'email é inválido!'})
    @EmailUnico({message:'email ja cadastrado. Tente novamente.'})
    @ApiProperty({
        example: 'roberto@silva.com',
        description: 'Esse campo ira ser o login do usuário(email).'
    })
    email: string;

    @IsString()
    @ApiProperty({
        example: '14986526654',
        description: 'Esse campo é o contato do usuário (celular)'
    })
    telefone: string;

    @MinLength(8,{message: 'Senha precisa de pelo menos 8 digitos.'})
    @SenhaForte({message: "Senha muito fraca. Tente novamente."})
    @ApiProperty({
        example:'Senha@123',
        description: 'A senha deve ter números, letras maius...'
    })
    senha: string;
}
