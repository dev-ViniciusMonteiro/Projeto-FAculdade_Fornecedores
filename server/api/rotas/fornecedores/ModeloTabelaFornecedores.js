const sequalize = require('sequelize')
const instancia = require('../../banco de dados')

const colunas ={
    empresa: {
        type: sequalize.STRING,
        allowNull: false
    },email: {
        type: sequalize.STRING,
        allowNull: false
    },categoria: {
        type:  sequalize.STRING,
        allowNull: false
    },valor: {
        type:  sequalize.FLOAT,
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'fornecedores',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('fornecedor', colunas , opcoes)