import { Injectable } from "@nestjs/common";
import { FilmeEntity } from "./filme.entity";
import { alteraFilmeDTO } from "./dto/alteraFilme.dto";

@Injectable()
export class FilmesArmazenados{
    atualizaFilme(idF: string, novosDadosF: alteraFilmeDTO) {
        throw new Error("Method not implemented.");
    }
    removeFilme(idF: string) {
        throw new Error("Method not implemented.");
    }
    #filmes: FilmeEntity[] = [];

    AdicionarFilmes(filme: FilmeEntity){
        this.#filmes.push(filme);
    }

    get Filmes(){
        return this.#filmes;
    }
}