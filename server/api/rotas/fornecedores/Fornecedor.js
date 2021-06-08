const TabelaFornecedor = require('./TabelaFornecedor')
const CamposInvalido = require('../../erros/CampoInvalido')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos')

class Fornecedor{
    constructor({id, empresa, email, categoria, valor, dataCriacao, dataAtualizacao, versao}){
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.valor = valor
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async criar(){
        //this.validar()
        const resultados = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria,
            valor: this.valor
        })
        this.id = resultados.id
        this.dataCriacao = resultados.dataCriacao
        this.dataAtualizacao = resultados.dataAtualizacao
        this.versao = resultados.versao
    }

 validar(){
        const campos = ['empresa','email','categoria']

        campos.forEach(campo=>{
            const valor =this[campo]
            if(typeof valor !== 'string' || valor.length === 0){
                throw new CamposInvalido(campo)
            }
        })
    }

    async carregar(){
        const resultado = await TabelaFornecedor.pegarPorID(this.id)//passa para queri sequalize
        this.empresa = resultado.empresa
        this.email = resultado.email
        this.categoria = resultado.categoria
        this.valor = resultado.valor
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async atualizar(){
        await TabelaFornecedor.pegarPorID(this.id)//se nao der erro ele roda
      
        const campos = ['empresa','email','categoria','valor']
        const dadosParaAtualizar = {}

        campos.forEach((campo)=>{
            const valor = this[campo]
            if(valor.length > 0){
                dadosParaAtualizar[campo] = valor
                }
            })
            //console.log("dadosParaAtualizar")
            //console.log(dadosParaAtualizar)
        

            if (Object.keys(dadosParaAtualizar).length === 0){
                throw new DadosNaoFornecidos()
            }

            await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar)
        
        
    }

    remover(){
        return TabelaFornecedor.remover(this.id)
    }

   
}

module.exports = Fornecedor 