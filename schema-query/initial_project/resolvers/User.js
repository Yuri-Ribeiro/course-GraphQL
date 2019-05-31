const { profiles } = require('../data/db')

module.exports = {
    salary(user){
        return user.real_salary
    },
    profile(user){
        const sels = profiles.filter( p => p.id === user.profile_id)
        return sels? sels[0]: null
    }
}