const db = require('../../config/db')

module.exports = {
    async perfis() {
        return await db('perfis')
    },
    async perfil(_, { filtro }) {
        if(filtro.id){
            return await db('perfis').where({id: filtro.id}).first()
        }else{
            return await db('perfis').where('nome', 'like', `%${filtro.nome}%`).first()
        }
    }
}