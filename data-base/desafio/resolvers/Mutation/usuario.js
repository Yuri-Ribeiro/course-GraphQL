const db = require('../../config/db')

module.exports = {
    async novoUsuario(_, { dados }) {
        let usuario = await db('usuarios').where({email: dados.email}).first()

        if(!usuario){
            const id = await db('usuarios').insert(dados)
            usuario = await db('usuarios').where({id}).first()
        }else{
            const { nome, senha, perfis } = dados
            await db('usuarios').where({email: dados.email}).update({ nome, senha, perfis })
            usuario = {...usuario, ...dados}
        }
        return usuario
    },
    async excluirUsuario(_, { filtro }) {
        let usuario = filtro.id ? await db('usuarios').where({id: filtro.id}).first(): await db('usuarios').where({nome: filtro.nome}).first()

        if(usuario && !await db('usuarios_perfis').where({usuario_id: usuario.id}).first()){
            await db('usuarios').where({nome: filtro.nome}).delete()
            return usuario
        }
    },
    async alterarUsuario(_, { filtro, dados }) {
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
    }
}