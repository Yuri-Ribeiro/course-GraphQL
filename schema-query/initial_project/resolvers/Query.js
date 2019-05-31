const { profiles, users } = require('../data/db')

module.exports = {
    hello(){
        return `Just return a string`
    },
    rightTime(){
        return new Date
    },
    loggedUser(){
        return {
            id: 1,
            name: "Rogério",
            email: "rogeriosilva@test.com",
            age: 24,
            real_salary: 8000.87,
            vip: true
        }
    },
    featuredProduct(){
        return {
            name: "Bike",
            price: 1699.99,
            discount: 0.5
        }
    },
    megaSenaNumbers(){
        let numbers = Array(6).fill(0).map(e => parseInt(Math.random() * 60 + 1))
        return numbers.sort((a, b) => a - b)
    },
    users(){
        return users
    },
    user(_, { id }){
        const selected = users.filter( user => user.id === id )
        return selected ? selected[0]: null
    },
    profiles(){
        return profiles
    },
    profile(_, { id }){
        const selected = profiles.filter( profile => profile.id === id)
        return selected ? selected[0] : null
    }
}