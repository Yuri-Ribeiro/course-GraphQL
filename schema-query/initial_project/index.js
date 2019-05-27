const { ApolloServer, gql } = require('apollo-server')

//API Schema; gql: it's a tagged template
const typeDefs = gql`
    scalar Date

    # first type. It's a reserved name. API entry points
    type Query {
        hello: String
        rightTime: Date
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