const Cliente = require("../database/cliente");
const Endereco = require("../database/endereco");

const {Router} = require("express");

const router = Router();

router.get("/clientes", async (req, res) => {
    const listaClientes = await Cliente.findAll();
    res.json(listaClientes);
});


    router.get("/clientes:id", async (req, res) => {
    const cliente = await Cliente.findOne({
      where: { id: req.params.id },
      include: [Endereco],
    });
    cliente
      ? res.json(cliente)
      : res.status(404).json({ message: "Usuário não encontrado" });
  });
  

router.post("/clientes", async (req, res) => {
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

  router.put("/clientes/:id", async (req, res) => {
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
  
  router.delete("/clientes/:id", async (req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findOne({ where: { id } });
    if (cliente) {
      cliente.destroy();
      res.json({ message: "Cliente deletado" });
    } else {
      res.status(404).json({ message: "Cliente não encontrado" });
    }
  });
  
  module.exports = router;

