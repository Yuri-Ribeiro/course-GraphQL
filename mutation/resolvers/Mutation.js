const { usuarios, proximoID } = require('../data/db')

module.exports = {
    novoUsuario(_, { nome, email, idade }){
        const novo = {
            id: proximoID(),
            nome,
            email,
            idade,
            perfil_id: 1,
            status: 'ATIVO'
        }

        usuarios.push(novo)
        return novo
    },
    excluirUsuario(_, { id }){
        const i = usuarios.findIndex( usuario => usuario.id === id)
        if( i < 0 ) return null
        const excluidos =
            usuarios.splice(i, 1)
        return excluidos ?
            excluidos[0]: null
    }
}