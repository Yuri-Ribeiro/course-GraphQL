const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil')

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

            let usuario = await db('usuarios')
                .where({email: dados.email})
                .first()

            delete dados.perfis
    
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
            let usuario = filtro.id ? await db('usuarios').where({id: filtro.id}).first(): await db('usuarios').where({nome: filtro.nome}).first()

            if(usuario && !await db('usuarios_perfis').where({usuario_id: usuario.id}).first()){
                await db('usuarios').where({nome: filtro.nome}).delete()
                return usuario
            }
        } catch(e){
            throw new Error(e.sqlMessage)
        }
    },
    async alterarUsuario(_, { filtro, dados }) {
        try{
            let usuario = filtro.id ? await db('usuarios').where({id: filtro.id}).first(): await db('usuarios').where({email: filtro.email}).first()
            
            if(await db('usuarios').where({nome: dados.nome}).first())
                return null

            if(!usuario){
                const id = await db('usuarios').insert(dados)
                usuario = await db('usuarios').where({id}).first()
            } else {
                await db('usuarios').where({id: usuario.id}).update(dados)
                usuario = {...usuario, ...dados}
            }
            return usuario
        } catch(e){
            throw new Error(e.sqlMessage)
        }
    }
}