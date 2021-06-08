const Modelo = require('./ModeloTabelaFornecedores')
const NaoEncontrado = require('../../erros/NaoEncontrados')

module.exports={
    listar(){
        return Modelo.findAll({raw: true})//Sequelize faz o select para buscar no BD
    },
    inserir(fornecedor){
        return Modelo.create(fornecedor)//Sequelize faz o mapeamento e criacao das tabelas
    } ,
    // listarID(id){//lista todos com parametro de id
    //     return Modelo.findAll({where: {
    //         id: id
    //       }})
    // }

    async pegarPorID(id){//faz query sequalize select * from fornecedores wherer id = ?
        const encontrado = await Modelo.findOne({
            where:{
                id: id
            }
        })
        if(!encontrado){
            throw new NaoEncontrado()
        }
        return encontrado
    },

     atualizar(id,dados){
        return Modelo.update(
            dados,
            {
                where: {id: id} 
            }
        )
    },

     remover(id){
       return Modelo.destroy({
            where: {id: id} 
        })
    }
}