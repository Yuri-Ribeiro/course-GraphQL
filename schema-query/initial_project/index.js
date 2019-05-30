const { ApolloServer, gql } = require('apollo-server')
const { importSchema } = require('graphql-import')

const profiles = [
    {id: 1, name: 'common'},
    {id: 2, name: 'administrator'}
]

//hard-code array
const users = [{
    id: 1,
    name: 'João Silva',
    email: 'jsilva@zemail.com',
    age: 29,
    profile_id: 1
}, {
    id: 2,
    name: 'Rafael Junior',
    email: 'rafajun@wemail.com',
    age: 31,
    profile_id: 2
}, {
    id: 3,
    name: 'Daniela Smith',
    email: 'danismi@umail.com',
    age: 24,
    profile_id: 1
}]

//Functions that solve the data
const resolvers = {
    User: {
        salary(user){
            return user.real_salary
        },
        profile(user){
            const sels = profiles.filter( p => p.id === user.profile_id)
            return sels? sels[0]: null
        }
    },

    Product: {
        discountPrice(product){
            return product.price * (1 - product.discount)
        }
    },

    Query: {
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
}

const server = new ApolloServer({
    typeDefs: importSchema('./schema/index.graphql'),
    resolvers
})

//Default port: 4000
server.listen().then(({ url }) => {
    console.log(`Executing on ${url}`)
})