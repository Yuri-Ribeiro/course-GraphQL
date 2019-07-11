const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil')
const { usuario: obterUsuario} = require('../Query/usuario')

module.exports = {
    async novoUsuario(_, { dados }) {
        try{
            const idsPerfis = []
            
            if(dados.perfis){
                for(filtro of dados.perfis){
                    const perfil = await obterPerfil(_, {
                        filtro
                    })
                    if(perfil) idsPerfis.push(perfil.id)
                }
            }
            delete dados.perfis

            let usuario = await db('usuarios')
                .where({email: dados.email})
                .first()
            if(!usuario){
                const id = await db('usuarios')
                    .insert(dados)
                usuario = await db('usuarios')
                    .where({id})
                    .first()
            } else{
                const { email } = dados
                delete dados.email
                await db('usuarios')
                    .where({ email })
                    .update(dados)
                usuario = {...usuario, ...dados}
            }
            
            await db('usuarios_perfis')
                .where({ usuario_id: usuario.id })
                .delete()

            for(perfil_id of idsPerfis){
                await db('usuarios_perfis')
                    .insert({ usuario_id: usuario.id, perfil_id})
            } 

            return db('usuarios')
                .where({id: usuario.id}).first()
        } catch(e){
            throw new Error(e.sqlMessage)
        }
    },
    async excluirUsuario(_, { filtro }) {
        try{
            let usuario = await obterUsuario(_, { filtro })

            if(usuario){
                let { id } = usuario
                await db('usuarios_perfis')
                    .where({ usuario_id: id })
                    .delete()
                await db('usuarios')
                    .where( { id })
                    .delete()
            }
            return usuario
        } catch(e){
            throw new Error(e.sqlMessage)
        }
    },
    async alterarUsuario(_, { filtro, dados }) {
        try{
            const idsPerfis = []
            
            if(dados.perfis){
                for(let filtro of dados.perfis){
                    const perfil = await obterPerfil(_, { filtro })
                    if(perfil) idsPerfis.push(perfil.id)
                }
            }
            delete dados.perfis
            
            let usuario = await obterUsuario(_, { filtro })  
            if(!usuario){
                const id = await db('usuarios')
                    .insert(dados)
                usuario = await db('usuarios')
                    .where({id})
                    .first()
            } else {
                await db('usuarios')
                    .where({id: usuario.id})
                    .update(dados)
                usuario = {...usuario, ...dados}
            }

            if(idsPerfis.length !== 0){
                await db('usuarios_perfis')
                    .where({usuario_id: usuario.id})
                    .delete()

                for(let perfil_id of idsPerfis){
                    await db('usuarios_perfis')
                        .insert({perfil_id, usuario_id: usuario.id})
                }
            }

            return db('usuarios')
                .where({id: usuario.id})
                .first()
        } catch(e){
            throw new Error(e)
        }
    }
}