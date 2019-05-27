const { ApolloServer, gql } = require('apollo-server')

//API Schema; gql: it's a tagged template
const typeDefs = gql`
    scalar Date

    type Usuario {
        id: ID!
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    # first type. It's a reserved name. API entry points
    type Query {
        hello: String
        rightTime: Date
        usuarioLogado: Usuario
    }
`

//Functions that solve the data
const resolvers = {
    Query: {
        hello(){
            return `Just return a string`
        },
        rightTime(){
            return new Date
        },
        usuarioLogado(){
            return {
                id: 1,
                nome: "Rogério",
                email: "rogeriosilva@test.com",
                idade: 24,
                salario: 8000.87,
                vip: true
            }
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