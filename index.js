require("dotenv").config();
const express = require("express");
const {connection, authenticate} = require("./database/database")


// Configuração do App

const app = express();
app.use(express.json())

// Configuração DB
authenticate(connection);
const Cliente = require("./database/cliente");
const Endereco = require("./database/endereco");

//Definição rotas
app.get("/clientes", async (req, res) =>{
    const listaClientes = await Cliente.findAll();
    res.json(listaClientes);
})
app.get("/clientes:id", async (req, res) =>{
    const cliente = await Cliente.findOne({where: {id: req.params.id}, include: [Endereco]});
    cliente ? res.json(cliente) : res.status(404).json({message: "Usuário não encontrado"}) 
})

app.post("/clientes", async (req,res) =>{
    const {nome, email, telefone, endereco} = req.body;
    try{
       const novoCliente = await Cliente.create({nome, email, telefone,endereco},
        {include: [Endereco]});
       res.status(201).json(novoCliente);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Um erro ocorreu."});
    }
})
//Eventos

app.listen(3000,()=>{
    connection.sync({force: true});                           
    console.log("executando em http://localhost:3000.")
});                                                                                                                             