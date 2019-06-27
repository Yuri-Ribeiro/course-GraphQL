const db = require('../config/db')

// const newProfile = {
//     name: "administrator2",
//     label: "Administrator"
// }

// db('profiles').insert(newProfile)
//     .then(res => console.log(res))
//     .catch(err => console.log(err.sqlMessage))
//     .finally(() => db.destroy())

const newRootProfile = {
    name: "root" + Math.random(),
    label: "Super User"
}

db.insert(newRootProfile).into('profiles')
    .then(res => console.log(res))
    .catch(err => console.log(err.sqlMessage))
    .finally(() => db.destroy())