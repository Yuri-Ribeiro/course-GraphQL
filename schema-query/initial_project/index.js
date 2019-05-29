const { ApolloServer, gql } = require('apollo-server')

const profiles = [
    {id: 1, name: 'common'},
    {id: 2, name: 'administrator'}
]

// {
//     id: 1,
//     name: 'Amanda Costa'
// },
// {
//     id: 2,
//     name: 'Ricardo Bazão'
// },
// {
//     id: 3,
//     name: 'João Farias'
// },
// {
//     id: 4,
//     name: 'Solange Brito'
// }
//hard-code array
const users = [{
    id: 1,
    name: 'João Silva',
    email: 'jsilva@zemail.com',
    age: 29
}, {
    id: 2,
    name: 'Rafael Junior',
    email: 'rafajun@wemail.com',
    age: 31
}, {
    id: 3,
    name: 'Daniela Smith',
    email: 'danismi@umail.com',
    age: 24
}]

//API Schema; gql: it's a tagged template
const typeDefs = gql`
    scalar Date

    type User {
        id: Int!
        name: String!
        email: String!
        age: Int
        salary: Float
        vip: Boolean
    }

    type Product {
        name: String!
        price: Float!
        discount: Float
        discountPrice: Float
    }

    type Profile {
        id: Int!
        name: String!
    }

    # first type. It's a reserved name. API entry points
    type Query {
        hello: String
        rightTime: Date
        loggedUser: User
        featuredProduct: Product
        # array notation
        megaSenaNumbers: [Int!]!
        users: [User!]!
        user(id: Int): User
        profiles: [Profile]
        profile(id: Int): Profile
    }
`

//Functions that solve the data
const resolvers = {
    User: {
        salary(user){
            return user.real_salary
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
    typeDefs,
    resolvers
})

//Default port: 4000
server.listen().then(({ url }) => {
    console.log(`Executing on ${url}`)
})