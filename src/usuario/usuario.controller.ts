import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuariosArmazenados } from "./usuario.dm";
import { UsuarioEntity } from "./usuario.entity";
import { criaUsuarioDTO } from "./dto/usuario.dto";
import {v4 as uuid} from 'uuid';
import { ListaUsuarioDTO } from "./dto/consulta.dto";
import { alteraUsuarioDTO } from "./dto/alteraUsuario.dto";
import { LoginUsuarioDTO } from "./dto/loginUsuario.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom, map } from "rxjs";
import { response } from "express";

@ApiTags('usuario')
//decorator rsponsavel por definir que essa classe

@Controller('/usuarios') //@ = decorator -> define um tipo especifico de ação para aquela coisa
export class UsuarioController{
    constructor(private clsUsuariosArmazenados: UsuariosArmazenados, private HttpService: HttpService){
        
    }
    @Post()
    @ApiResponse({status: 201, description:'Retorna que houve sucesso'})
    async criaUsuario(@Body() dadosUsuario: criaUsuarioDTO){
        var mensagemErro = '';
        try{
        var retornoCep = await lastValueFrom(this.HttpService
            .get(`http://viacep.com.br/ws/${dadosUsuario.cep}/json/`)
            .pipe(
                map((response) => response.data)
            ))
            if (retornoCep.error == 'true'){
                throw new Error('CEP Não encontrado')
            }
        }catch(error){
            mensagemErro = 'Erro ao consultar CEP, favor informe um CEP válido.!!';
            return {
                message: mensagemErro,
                status: 'Erro no cadastro do usuário.'
            }
        }
        var novoUsuario = new UsuarioEntity(uuid(),dadosUsuario.nome,dadosUsuario.idade,
                                                    dadosUsuario.cep,retornoCep?retornoCep.logradouro:'',dadosUsuario.complemento,retornoCep?retornoCep.localidade:'',
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

        return listaRetorno;
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: alteraUsuarioDTO){
        var messageError = '';
        if (novosDados.cep){
            try{
                var retornoCep = await lastValueFrom(this.HttpService
                                                    .get(`https://viacep.com.br/ws/${novosDados.cep}/json`)
                                                    .pipe(
                                                        map((response) => response.data)
                                                    ))
                if (retornoCep.erro){
                    retornoCep = null
                    throw new Error('CEP Não encontrado.')
                }
            }catch(error){
                messageError = '| Erro ao buscar CEP - ' + error.message;
            }

            var dadosEndereco = {
                endereco: retornoCep?retornoCep.lagradouro:'',
                cidade: retornoCep?retornoCep.localidade:'',
                cep: novosDados.cep
            }

            await this.clsUsuariosArmazenados.atualizausuario(id, dadosEndereco)
        }
        const usuarioAtualizado = await this.clsUsuariosArmazenados.atualizausuario(id, novosDados)

        return{
            usuario: usuarioAtualizado,
            message: 'Usuario atualizado com sucesso.'
        }
    }

    @Delete('/:id')
    async removeUsusario(@Param('id') id: string){
        const usuarioRemovido = await this.clsUsuariosArmazenados.removeUsuario(id)

        return{
            usuario: usuarioRemovido,
            message: 'Usuário removido.'
        }
    }

    @Post('/login')
    async login(@Body() dadosLogin: LoginUsuarioDTO){
        var login = this.clsUsuariosArmazenados.validaLogin(dadosLogin.email,dadosLogin.senha);
        return{
            status: login.login,
            usuario: login.login?login.usuario:null,
            message: login.login?'Login efetuado':'Usuário ou senha inválidos'
        }
    }
}

// post -> envia dados para a API/inserir informações/passar info.
// get -> consulta dados/retorna informações
// put -> modifica/altera dados
// delete -> exclui dados 