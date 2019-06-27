const db = require('../config/db')

// // excluir por id
// db('users').where({id:1})
//     .delete()
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

// excluir tudo
db('users')
    .delete()
    .then(res => console.log(res))
    .finally(() => db.destroy())