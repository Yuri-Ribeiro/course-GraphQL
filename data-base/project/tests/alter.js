const db = require('../config/db')

const newUser = {
    name: 'Pedro',
    email: 'pedro@empresa.com.br',
    password: '12345678'
}

async function exercicio(){
    // count
    const { qtde } = await db('users')
        .count('* as qtde').first()

    // inserir
    if(qtde === 0){
        await db('users').insert(newUser)
    }

    // consultar
    let { id } = await db('users')
        .select('id').limit(1).first()

    // alterar
    await db('users').where({id})
        .update({name: 'Pedro Garcia'})

    return db('users').where({id})
}

exercicio()
    .then(usuario => console.log(usuario))
    .finally(() => db.destroy())