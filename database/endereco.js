const {DataTypes} = require("sequelize");
const {connection} = require("./database")

const Endereco = connection.define("endereco",{
    uf:{ // nome VARCHAR NOT NUL
        type:DataTypes.STRING(2),
        allowNull:false,
    },
    cidade:{// email VARCHAR UNIQUE NOT NULL
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },// telefone VARCHAR NOT NULL
    cep:{
        type:DataTypes.STRING(9),
        allowNull:false
    },
    rua:{
        type:DataTypes.STRING,
        allowNull:false
    },
    numero:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = Endereco;