require("dotenv").config();
const express = require("express");
const { connection, authenticate } = require("./database/database");
const morgan = require("morgan");
// Configuração do App
const app = express();
app.use(express.json());

// Configuração DB
authenticate(connection);

const rotasClientes = require("./routes/clientes");
const rotasPets = require("./routes/pets");

app.use(rotasClientes);
app.use(rotasPets);
app.use(morgan('dev'));

//Eventos
app.listen(3000, () => {
  connection.sync();
  console.log("executando em http://localhost:3000.");
});
