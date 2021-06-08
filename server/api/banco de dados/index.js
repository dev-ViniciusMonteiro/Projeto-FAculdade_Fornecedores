const sequalize = require('sequelize')
const config = require('config')//dados de acesso no json (npm install config)

const instancia = new sequalize(
    'fornecedoraula',
    'root',
    'admin',
    {
        host: '127.0.0.1',
        dialect: 'mysql'
    }
)

module.exports = instancia