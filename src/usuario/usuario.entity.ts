import * as bcrypt from 'bcrypt';

export class UsuarioEntity{
    id: string;
    nome: string;
    idade: Number;
    cep: string;
    endereco: string;
    complemento: string;
    cidade: string;
    email: string;
    telefone: string;
    senha: string;
    constructor(id: string,nome: string,idade: Number,cep: string, endereco: string, complemento: string, cidade: string,email: string,telefone: string,senha: string){
        const saltOrRounds = 10 //recomendado usar sempre 10

        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.cidade = cidade;
        this.email = email;
        this.telefone = telefone;
        this.cep = cep;
        this.endereco = endereco;
        this.complemento = complemento;
        this.senha = bcrypt.hashSync(senha,saltOrRounds);
    }

    trocarSenha(senhaNova){
        const saltOrRounds = 10;
        this.senha = bcrypt.hashSync(senhaNova,saltOrRounds);
    }

    login(senha){
        return bcrypt.compareSync(senha,this.senha);
    }
}