import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class alteraFilmeDTO{
    @IsString()
    @IsNotEmpty({message: 'Nome do Filme não pode ser vazio!'})
    @IsOptional()
    nomeF: string;

    @IsInt()
    @IsOptional()
    duracaoF: number;

    @IsString()
    @IsOptional()
    sinopseF: number;

    @IsString()
    @IsOptional()
    anoF: string;

    @IsInt()
    @IsOptional()
    generoF: string;
}