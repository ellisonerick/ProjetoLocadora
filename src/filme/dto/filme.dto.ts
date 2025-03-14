import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class criaFilmeDTO{
    @IsString()
    @IsNotEmpty({message: 'Nome do FILME não pode ser vazio.'})
    nomeF: string;

    @IsInt()
    duracaoF: number;

    @IsString()
    sinopseF: string;

    @IsString()
    anoF: string;

    @IsString()
    generoF: string;

}