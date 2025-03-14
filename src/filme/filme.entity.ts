export class FilmeEntity{
    idF: string;
    nomeF: string;
    duracaoF: number;
    sinopseF: string;
    anoF: string;
    generoF: string;

    constructor(idF: string, nomeF: string, duracaoF: number, sinopseF: string, anoF: string, generoF: string){
        this.idF = idF;
        this.nomeF = nomeF;
        this.duracaoF = duracaoF;
        this.sinopseF = sinopseF;
        this.anoF = anoF;
        this.generoF = generoF;
    }

}