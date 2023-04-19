const {DataTypes} = require("sequelize");
const {connection} = require("./database")
const Cliente = connection.define("cliente",{
    nome:{ // nome VARCHJar NOT NUL
        type:DataTypes.STRING(130),
        allowNull:false,
    },
    email:{// email VARCHAR UNIQUE NOT NULL
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },// telefone VARCHAR NOT NULL
    telefone:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

// Associacao 1:1 (One-to-One)

const Endereco = require("./endereco");

Cliente.hasOne(Endereco, {onDelete:"CASCADE"}); // Cliente tem 1 endereco

Endereco.belongsTo(Cliente); // Endereco pertence a 1 cliente

module.exports = Cliente;