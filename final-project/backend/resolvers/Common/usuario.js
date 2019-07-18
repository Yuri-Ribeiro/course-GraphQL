const jwt = require('jwt-simple')
const { perfis: obterPerfis } = require('../Type/Usuario')

module.exports = {
    async getUsuarioLogado(usuario) {
          const perfis = await obterPerfis(usuario)
          const agora = Math.floor(Date.now() / 1000)

          const usuarioInfo = {
              id: usuario.id,
              nome: usuario.nome,
              email: usuario.email,
              perfis: perfis.map( perfil => perfil.nome ),
              iat: agora,
              exp: agora + (3 * 24 * 3600)
          }

          return {
            ...usuarioInfo,
            token: jwt.encode(usuarioInfo, process.env.APP_AUTH_SECRET)
          }
    }
}
const secret = process.env.APP_AUTH_SECRET