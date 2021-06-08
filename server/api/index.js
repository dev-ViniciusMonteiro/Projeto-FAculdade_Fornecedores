// npm install express body-parser sequelize mysql2
const express = require('express')//abstracoes de rotas
const bodyParser = require('body-parser')//transforma o body da requisicao em varios formatos
const config = require('config')//cria configs que sao passadas em formato json para minha api
const NaoEncontrado = require('./erros/NaoEncontrados')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos

const roteador = require('./rotas/fornecedores')

var cors = require('cors')

const app = express()//estancia app em express
app.use(bodyParser.json())//use = Middleware (encurtador de rotas) e transforma as respostas em json
//console.log(app.use(bodyParser.json))

app.use((req, res, proximo)=>{
    let formatoRequisitado = req.header('Accept')
    
    if(formatoRequisitado === '*/*'){
        formatoRequisitado = 'application/json'
    }

    if(formatosAceitos.indexOf(formatoRequisitado)===-1){
        res.status(406)
        res.end()
        return
    }

    res.setHeader('Content-Type', formatoRequisitado)
    proximo()
})

app.use(cors())

app.use('/api/fornecedores', roteador)//no caminho informado chama o ./rotas/fornecedores - index.js

app.use((erro, req, res, proximo)=>{
    let status = 500
    if(erro instanceof NaoEncontrado){
        status=404
    }
    if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos){
        status=400
    }
    if(erro instanceof ValorNaoSuportado){
        status=406
    }
    res.status(status)
    res.send(JSON.stringify({mensagem: erro.message, id: erro.idErro}))
})

app.listen(3000, () => console.log("api rodou"))//A função app.listen() do Express inicia um socket UNIX e escuta as conexões em um caminho fornecido.
//abre a porta 3000


