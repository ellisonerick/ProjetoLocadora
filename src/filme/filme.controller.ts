import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { FilmeEntity } from "./filme.entity";
import { FilmesArmazenados } from "./filme.dm";
import { criaFilmeDTO } from "./dto/filme.dto";
import { ListaFilmeDTO } from "./dto/consultaFilme.dto";
import { alteraFilmeDTO } from "./dto/alteraFilme.dto";
import {v4 as uuid} from 'uuid';

@Controller('/filmes')
export class FilmeController{
    constructor(private clsFilmesArmazenados: FilmesArmazenados){

    }
    @Post()
    async criaFilme(@Body() dadosFilme: criaFilmeDTO){

        var novoFilme = new FilmeEntity(uuid(),dadosFilme.nomeF,dadosFilme.duracaoF,dadosFilme.sinopseF, dadosFilme.anoF, dadosFilme.generoF);

        this.clsFilmesArmazenados.AdicionarFilmes(novoFilme);
        
        var filme = {
            dadosFilme : novoFilme,
            status: 'Filme Adicionado!'
        } 
        return filme;    
    }

    @Get()
    async listaFilmes(){

        const filmesListados = this.clsFilmesArmazenados.Filmes;
        const listaRetornoF = filmesListados.map(
            filme => new ListaFilmeDTO(
                filme.idF,
                filme.nomeF
            )
        )
        return listaRetornoF;
    }

    @Put('/:idF')//Possivel ERRO!!!
    async atualizaFilme(@Param('idF') idF: string, @Body() novosDadosF: alteraFilmeDTO){
        const filmeAtualizado = await this.clsFilmesArmazenados.atualizaFilme(idF, novosDadosF)

        return{
            filme: filmeAtualizado,
            message: 'Filme atualizado com sucesso!'
            }
    }

    @Delete('/:idF')
    async removeFilme(@Param('idF') idF: string){
        const filmeRemovido = await this.clsFilmesArmazenados.removeFilme(idF)

        return{
            filme: filmeRemovido,
            message: 'Filme removido!'
        }
    }
   

}

