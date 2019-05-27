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

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    # first type. It's a reserved name. API entry points
    type Query {
        hello: String
        rightTime: Date
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
    }
`

//Functions that solve the data
const resolvers = {
    Usuario: {
        salario(usuario){
            return usuario.salario_real
        }
    },

    Produto: {
        precoComDesconto(produto){
            return produto.preco * (1 - produto.desconto)
        }
    },

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
                salario_real: 8000.87,
                vip: true
            }
        },
        produtoEmDestaque(){
            return {
                nome: "Bike",
                preco: 1699.99,
                desconto: 0.15
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