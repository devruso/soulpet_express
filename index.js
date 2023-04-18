require("dotenv").config();
const express = require("express");
const { connection, authenticate } = require("./database/database");

// Configuração do App
const app = express();
app.use(express.json());

// Configuração DB
authenticate(connection);
const Cliente = require("./database/cliente");
const Endereco = require("./database/endereco");
const Pet = require("./database/pet");

//Definição rotas
app.get("/clientes", async (req, res) => {
  const listaClientes = await Cliente.findAll();
  res.json(listaClientes);
});
app.get("/clientes:id", async (req, res) => {
  const cliente = await Cliente.findOne({
    where: { id: req.params.id },
    include: [Endereco],
  });
  cliente
    ? res.json(cliente)
    : res.status(404).json({ message: "Usuário não encontrado" });
});
//GET PET
app.get("/pets", async (req, res) => {
  const listaPets = await Pet.findAll();
  res.json(listaPets);
});

app.get("pet/:id", async (req, res) =>{
    const {id} = req.params;
    const pet = await Pet.findByPk(id);
    if(pet){
        res.json(pet);
    }else{
        res.status(404).json({message:"Não encontrado"});
    }
}
)

app.post("/clientes", async (req, res) => {
  const { nome, email, telefone, endereco } = req.body;
  try {
    const novoCliente = await Cliente.create(
      { nome, email, telefone, endereco },
      { include: [Endereco] }
    );
    res.json(novoCliente);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro ocorreu." });
  }
});

// POST PET
app.post("/pets", async (req, res) => {
  const { nome, tipo, porte, dataNasc, idCliente } = req.body;

  try {
    const cliente = await Cliente.findOne({where:{id:idCliente}});
    if (cliente) {
      const novoPet = await Pet.create({
        nome,
        tipo,
        porte,
        dataNasc,
        idCliente,
      });
      res.status(201).json(novoPet);
    } else {
      res.status(404).json({ message: "Cliente não encontrado." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Algo errado na requisição: ${err}` });
  }
});

app.put("/clientes/:id", async (req, res) => {
  const { nome, email, telefone, endereco } = req.body;
  const { id } = req.params;
  try {
    const cliente = await Cliente.findOne({ where: { id } });
    if (cliente) {
      if (endereco) {
        await Endereco.update(endereco, { where: { clienteId: id } });
      }
      await cliente.update({ nome, email, telefone });
      res.json({ message: "Cliente editado com sucesso" });
    } else {
      res.status(404).json({ message: "Cliente não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ messsage: `Um erro ocorreu: \n ${err}` });
  }
});

app.delete("/clientes/:id", async (req, res) => {
  const { id } = req.params;
  const cliente = await Cliente.findOne({ where: { id } });
  if (cliente) {
    cliente.destroy();
    res.json({ message: "Cliente deletado" });
  } else {
    res.status(404).json({ message: "Cliente não encontrado" });
  }
});

//Eventos
app.listen(3000, () => {
  connection.sync({ force: true });
  console.log("executando em http://localhost:3000.");
});
