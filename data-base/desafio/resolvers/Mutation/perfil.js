const db = require('../../config/db')

module.exports = {
    async novoPerfil(_, { dados }) {
        let perfil = await db('perfis').where({nome: dados.nome}).first()

        if(!perfil){
            const id = await db('perfis').insert(dados)
            perfil = await db('perfis').where({id}).first()
        } else{
            await db('perfis').where({id: perfil.id}).update(dados)
            perfil = {...perfil, ...dados}
        }
        return perfil
    },
    async excluirPerfil(_, { filtro }) {
        let perfil = filtro.id ? await db('perfis').where({id: filtro.id}).first(): await db('perfis').where({nome: filtro.nome}).first()

        if(perfil && !await db('usuarios_perfis').where({perfil_id: perfil.id}).first()){
            await db('perfis').where({nome: filtro.nome}).delete()
            return perfil
        }
    },
    async alterarPerfil(_, { filtro, dados }) {
        let perfil = filtro.id ? await db('perfis').where({id: filtro.id}).first(): await db('perfis').where({nome: filtro.nome}).first()
        
        if(await db('perfis').where({nome: dados.nome}).first())
            return null

        if(!perfil){
            const id = await db('perfis').insert(dados)
            perfil = await db('perfis').where({id}).first()
        } else {
            await db('perfis').where({id: perfil.id}).update(dados)
            perfil = {...perfil, ...dados}
        }
        return perfil
    }
}