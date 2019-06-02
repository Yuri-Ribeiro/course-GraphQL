let id = 1
function proximoID(){
    return id++
}

let idPerfil = 1
function proximoIDPerfil(){
    return idPerfil++
}

const perfis = [
    { id: proximoIDPerfil(), nome: 'comum' },
    { id: proximoIDPerfil(), nome: 'administrador' }
]

const usuarios = [{
    id: proximoID(),
    nome: 'João Silva',
    email: 'jsilva@zemail.com',
    idade: 29,
    perfil_id: 1,
    status: 'ATIVO'
}, {
    id: proximoID(),
    nome: 'Rafael Junior',
    email: 'rafajun@wemail.com',
    idade: 31,
    perfil_id: 2,
    status: 'INATIVO'
}, {
    id: proximoID(),
    nome: 'Daniela Smith',
    email: 'danismi@umail.com',
    idade: 24,
    perfil_id: 1,
    status: 'BLOQUEADO'
}]

module.exports = { usuarios, perfis, proximoID, proximoIDPerfil }