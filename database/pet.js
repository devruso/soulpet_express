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
        type: DataTypes.DATEONLY,

    }
});
const Cliente = require("./cliente");


Cliente.hasMany(Pet, {onDelete:"CASCADE"});
Pet.belongsTo(Cliente);

module.exports = Pet;