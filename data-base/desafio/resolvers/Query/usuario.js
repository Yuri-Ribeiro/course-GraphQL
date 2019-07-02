const db = require('../../config/db')

module.exports = {
    async usuarios() {
        return db('usuarios')
    },
    async usuario(_, { filtro }) {
        if(filtro.id){
            return db('usuarios').where({id: filtro.id}).first()
        } else {
            return db('usuarios').where({email: filtro.email}).first()
        }
    }
}