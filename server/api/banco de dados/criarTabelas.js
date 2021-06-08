const ModeloTabela = require('../rotas/fornecedores/ModeloTabelaFornecedores')


ModeloTabela.sync().then(()=>{
    console.log("tabela criada com sucesso")
}).catch(console.log)

