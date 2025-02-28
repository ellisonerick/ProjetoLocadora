import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuariosArmazenados } from "./usuario.dm";
import { UsuarioEntity } from "./usuario.entity";
import { criaUsuarioDTO } from "./dto/usuario.dto";
import {v4 as uuid} from 'uuid';
import { ListaUsuarioDTO } from "./dto/consulta.dto";

@Controller('/usuarios') //@ = decorator -> define um tipo especifico de ação para aquela coisa
export class UsuarioController{
    constructor(private clsUsuariosArmazenados: UsuariosArmazenados){
        
    }
    @Post()
    async criaUsuario(@Body() dadosUsuario: criaUsuarioDTO){

        var novoUsuario = new UsuarioEntity(uuid(),dadosUsuario.nome,dadosUsuario.idade,dadosUsuario.cidade,
                                            dadosUsuario.email,dadosUsuario.telefone,dadosUsuario.senha);
        this.clsUsuariosArmazenados.AdicionarUsuarios(novoUsuario);
        
        var usuario = {
            dadosUsuario : novoUsuario,
            status: 'Usuario Criado'
        }
        return usuario;
    }

    @Get()
    async listaUsuarios(){

        const usuariosListados = this.clsUsuariosArmazenados.Usuarios;
        const listaRetorno = usuariosListados.map(
            usuario => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome,
                usuario.email
            )
        )
    }
}

// post -> envia dados para a API/inserir informações/passar info.
// get -> consulta dados/retorna informações
// pot -> modifica/altera dados
// delete -> exclui dados 