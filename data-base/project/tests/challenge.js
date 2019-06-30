const db = require('../config/db')

async function salvarUsuario(name, email, password) {
    let user = await db('users')
        .where({email}).first()
    
    if(!user){
        let [ id ] = await db('users')
            .insert({name, email, password})
        user = await db('users')
            .where({id}).first()
    }
    else{
        await db('users')
            .where({ id: user.id })
            .update({ name, email, password})
        user = {...user, name, email, password}
    }

    return user
}

async function salvarPerfil(name, label) {
    let profile = await db('profiles').where({name}).first()

    if(!profile){
        let [ id ] = await db('profiles').insert({name, label})
        profile = await db('profiles').where({id}).first()
    }
    else{
        await db('profiles')
            .where({name})
            .update({name, label})
        profile = {...profile, name, label}
    }

    return profile
}

async function adicionarPerfis(user, ...profiles) {
    const user_id = user.id
    await db('users_profiles').where({user_id}).delete()
    
    const user_profiles = profiles.map( profile => {
        return {
            user_id,
            profile_id: profile.id
        }
    })
    await db('users_profiles').insert(user_profiles)
}

async function executar() {
    const usuario = await salvarUsuario('Ana Silva',
        'ana.silvab@empresa.com.br', '123456')
    const perfilA = await salvarPerfil('rh_3', 'Pessoal')
    const perfilB = await salvarPerfil('fin_3', 'Financeiro')

    console.log(usuario)
    console.log(perfilA)
    console.log(perfilB)

    await adicionarPerfis(usuario, perfilA, perfilB)
}

executar()
    .catch(err => console.log(err))
    .finally(() => db.destroy())