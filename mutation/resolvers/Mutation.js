const { usuarios, proximoID } = require('../data/db')

function indiceUsuario(filtro){
    if(!filtro) return -1
    const { id, email } = filtro
    if(filtro.id)
        return usuarios.findIndex( usuario => usuario.id === id)
    else if(email)
        return usuarios.findIndex( usuario => usuario.email === email)
    return -1
}

module.exports = {
    novoUsuario(_, { dados }){
        const emailExistente = usuarios
            .some( usuario => usuario.email === dados.email)

        if(emailExistente) throw new Error("E-mail já cadastrado!")

        const novo = {
            id: proximoID(),
            ...dados,
            perfil_id: 1,
            status: 'ATIVO'
        }

        usuarios.push(novo)
        return novo
    },
    excluirUsuario(_, { filtro }){
        const i = indiceUsuario(filtro)
        
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