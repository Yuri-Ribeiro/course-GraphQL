const { ApolloServer, gql } = require('apollo-server')

//API Schema; gql: it's a tagged template
const typeDefs = gql`
    scalar Date

    type User {
        id: ID!
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

    # first type. It's a reserved name. API entry points
    type Query {
        hello: String
        rightTime: Date
        loggedUser: User
        featuredProduct: Product
        # array notation
        megaSenaNumbers: [Int!]!
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