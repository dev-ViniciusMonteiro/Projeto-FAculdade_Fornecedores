const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor.js')
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor


roteador.get('/',async (req,res)=>{//listar
    //console.log("foi")
    const resultados = await TabelaFornecedor.listar()
    res.status(200)
    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'))
    res.send(
        serializador.serializar(resultados)
        //console.log(resultados)
    )
})

roteador.post('/',async (req,res,proximo)=>{//cadastrar
    try{
        const dadosRecebidos = req.body//recebe o corpo da requisicao
        //console.log(dadosRecebidos)
        //res.send(dadosRecebidos)
        const fornecedor = new Fornecedor(dadosRecebidos)//coloca no modelo fornecedores
        await fornecedor.criar()   //pede para o js esperar para rodar antes de continuar e roda a insercao na tabela BD
        res.status(201)
        const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'))
        res.send(//resposta
            serializador.serializar(fornecedor)
        )
        }catch(erro){
            proximo(erro)
        }
})

//meu 
// roteador.get('/:idFornecedor',async(req,res)=>{
//     const id = req.params.idFornecedor//recebe o que é passado no idfornecedor
//     const resultado = await TabelaFornecedor.listarID(id)//passa para meu listar
//     res.send(resultado)//mostra o resultado
// })

roteador.get('/:idFornecedor',async(req,res,proximo)=>{//acessar um
    try{//se algo retornar erro cai pro catch
        const id = req.params.idFornecedor//recebe o que é passado no idfornecedor
        const fornecedor = new Fornecedor({id: id})//cria um novo fornecedor so com id
        await fornecedor.carregar()//chama carregar do Fornocedor
        res.status(200)
        const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'))
        res.send(serializador.serializar(fornecedor))//mostra o resultado
    }catch(erro){
        proximo(erro)
    }    
})

roteador.put('/:idFornecedor', async(req,res,proximo)=>{//atualizar
    try{
        const id = req.params.idFornecedor//recebe o que é passado no idfornecedor
        const dadosRecebidos = req.body
        //console.log(dadosRecebidos)
        const dados = Object.assign({}, dadosRecebidos, {id: id})//cria uma novo objeto so com as variaveis
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.status(204)
        res.end("Atualizado com sucesso")//mostra o resultado
    }catch(erro){
        proximo(erro)
    }
        
       
})


roteador.delete('/:idFornecedor',async(req,res,proximo)=>{//delete
    try{
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()//se nao existe emite erro
        await fornecedor.remover(id)
        res.status(204)
        res.end()
    }catch(erro){
       proximo(erro)
    }
})

module.exports = roteador