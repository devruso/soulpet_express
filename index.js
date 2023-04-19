require("dotenv").config();
const express = require("express");
const { connection, authenticate } = require("./database/database");

// Configuração do App
const app = express();
app.use(express.json());

// Configuração DB
authenticate(connection);

const rotasClientes = require("./routes/clientes");
const rotasPets = require("./routes/pets");

app.use(rotasClientes);
app.use(rotasPets);


//Eventos
app.listen(3000, () => {
  connection.sync({ force: true });
  console.log("executando em http://localhost:3000.");
});
