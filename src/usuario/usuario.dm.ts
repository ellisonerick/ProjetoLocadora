import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";


@Injectable()
export class UsuariosArmazenados{
    #usuarios: UsuarioEntity[] = [];

    AdicionarUsuarios(usuario: UsuarioEntity){
        this.#usuarios.push(usuario);
    }

    get Usuarios(){
        return this.#usuarios;
    }

    atualizausuario(id: string, dadosAtualizacao: Partial<UsuarioEntity>){
        const usuario = this.buscaPorID(id);

        Object.entries(dadosAtualizacao).forEach( //forEach -> para cada dado do obejto ele executa a função.
            ([chave,valor]) => {
                if (valor === undefined){
                    return
                }
                if(chave === 'id'){
                    return
                }else if(chave === 'senha'){
                    usuario.trocarSenha(valor);
                    return
                }
                usuario[chave] = valor;
            }
        )
        return usuario;
    }

    private buscaPorID(id: string){
        const possivelUsuario = this.#usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        )

        if (!possivelUsuario){
            throw new Error('Usuario não encontrado!')
        }

        return possivelUsuario;
    }

    private buscaPorEmail(email: string){
        const possivelUsuario = this.#usuarios.find(
            usuarioSalvo => usuarioSalvo.email === email
        )

        if (!possivelUsuario){
            throw new Error('Usuario não encontrado!')
        }

        return possivelUsuario;
    }

    validaLogin(email:string,senha:string){
        const usuario = this.buscaPorEmail(email);
        return{ 
            login: usuario.login(senha),
            usuario: usuario
        }
    }

    async validaEmail(email: string): Promise<boolean>{
        const possivelUsuario = this.#usuarios.find(
            usuario => usuario.email === email
        )
        return (possivelUsuario !== undefined)
    }

    async removeUsuario(id: string){
        const usuario = this.buscaPorID(id);

        this.#usuarios = this.#usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        )
    }
}