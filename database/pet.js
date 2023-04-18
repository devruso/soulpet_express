const { DataTypes } = require("sequelize");
const {connection} = require("./database");

const Pet = connection.define("pet", {
    nome: {
        type: DataTypes.STRING(100),
        allowNull:false
    },
    tipo:{
        type: DataTypes.STRING,
        allowNull:false
    },
    porte:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dataNasc:{
        type: DataTypes.DATE,

    }
});

Cliente.hasMany(Pet);

Pet.belongsTo(Cliente);

module.exports = Pet;