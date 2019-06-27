const db = require('../config/db')

async function salvarUsuario(name, email, password) {
    const count = db('users')
        .where('email', '=', email)
        .count('* as qtde').first()

    const user = {name, email, password}
    
    if(count === 0)
        db('users').insert(user)
    else
        db('users')
            .where('email', '=', email)
            .first()
            .update(user)

    return db('users').where('email', '=', email)
}

async function salvarPerfil(name, label) {
    const count = db('profiles')
        .where('name', '=', name)
        .count('* as qtde').first()

    const profile = {name, label}

    if(count === 0)
        db('profiles').insert(profile)
    else
        db('profiles')
            .where('name', '=', name)
            .first()
            .update(profile)

    return db('profiles').where('name', '=', name)
}

async function adicionarPerfis(user, ...profiles) {
    const user_id = db('users').where('email', '=', user.email)
    for(profile of profiles){
        db('users_profiles').insert({
            
        })
    }
}

async function executar() {
    const usuario = await salvarUsuario('Ana',
        'ana@empresa.com.br', '123456')
    const perfilA = await salvarPerfil('rh', 'Pessoal')
    const perfilB = await salvarPerfil('fin', 'Financeiro')

    console.log(usuario)
    console.log(perfilA)
    console.log(perfilB)

    await adicionarPerfis(usuario, perfilA, perfilB)
}

executar()
    .catch(err => console.log(err))
    .finally(() => db.destroy())