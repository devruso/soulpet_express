const Cliente = require("../database/cliente");
const Pet = require("../database/pet");

const {Router} = require("express");

const router = Router();

//GET PET
    router.get("/pets", async (req, res) => {
    const listaPets = await Pet.findAll();
    res.json(listaPets);
  });
  
    router.get("pet/:id", async (req, res) => {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: "Não encontrado" });
    }
  });
  
  // POST PET
    router.post("/pets", async (req, res) => {
    const { nome, tipo, porte, dataNasc, clienteId } = req.body;
  
    try {
      const cliente = await Cliente.findOne({ where: { id: clienteId } });
      if (cliente) {
        const novoPet = await Pet.create({
          nome,
          tipo,
          porte,
          dataNasc,
          clienteId,
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
  
  
  // Att PET
    router.put("/pets/:id", async (req, res) => {
    const { nome, tipo, porte, dataNasc } = req.body;
  
    // SELECT * FROM pets WHERE id = req.params.id;
    const pet = await Pet.findByPk(req.params.id);
    try {
      if (pet) {
        await Pet.update(
          { nome: nome, tipo: tipo, porte: porte, dataNasc: dataNasc },
          { where: { id: req.params.id } }
        );
        res.status(200).json({ message: "Pet atualizado!" });
      } else {
        res.status(404).json({ message: "Pet não encontrado" });
      }
    } catch (err) {
      res.status(500).json({ message: `Um erro ocorreu :${err}` });
    }
  });

  // Delete Pet
    router.delete("/pets/:id", async (req, res) => {
    const pet = await Pet.findByPk(req.params.id);
    try {
      if (pet) {
        await pet.destroy();
        res.json({ message: "Pet deletado com sucesso" });
      } else {
        res.status(404).json({ message: "Pet não encontrado" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: `Um erro ocorreu ${err}` });
    }
  });

module.exports = router;