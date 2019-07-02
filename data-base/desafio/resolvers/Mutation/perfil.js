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
        // implementar
    },
    async alterarPerfil(_, { filtro, dados }) {
        // implementar
    }
}