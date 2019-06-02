const { perfis, proximoIDPerfil } = require('../../data/db')

function indicePerfil(filtro){
    if(!filtro) return -1
    const { id, nome } = filtro
    if(id)
        return perfis.findIndex(perfil => perfil.id === id)
    else if(nome)
        return perfis.findIndex(perfil => perfil.nome === nome)
    return -1
}

module.exports = {
    novoPerfil(_, { nome }){
        const perfilExistente = perfis
            .some(perfil => perfil.nome === nome)
        if(perfilExistente) throw new Error("Perfil já existente")
        const novo = {
            id: proximoIDPerfil(),
            nome
        }
        perfis.push(novo)
        return novo
    },

    excluirPerfil(_, { filtro }){
        const i = indicePerfil(filtro)
        if(i<0) return null
        const excluidos = perfis.splice(i, 1)
        return excluidos[0]
    },

    alterarPerfil(_, { filtro, nome }){
        const i = indicePerfil(filtro)
        if(i<0) return null
        if(nome)
            perfis[i].nome = nome
        return perfis[i]
    }
}