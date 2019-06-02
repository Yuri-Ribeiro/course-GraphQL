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
    },
    alterarUsuario(_, args){
        const i = usuarios.findIndex( usuario => usuario.id === args.id)
        if( i < 0 ) return null
        if(args.nome){
            usuarios[i].nome = args.nome
        }
        if(args.email){
            usuarios[i].email = args.email
        }
        if(args.idade){
            usuarios[i].idade = args.idade
        }
        return usuarios[i]
        // const usuario = {
        //     ...usuarios[i],
        //     ...args
        // }
        // usuarios.splice(i, 1, usuario)
        // return usuario
    }
}