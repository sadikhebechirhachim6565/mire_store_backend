const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Colis = require("../models/Colis");

// ➕ Créer un colis
router.post("/create", async (req, res) => {
  try {
    const {
      expediteur,
      destinataire,
      telephoneDestinataire,
      paysDepart,
      paysArrivee,
      typeTransport,
    } = req.body;

    const trackingNumber = "MIRE-" + uuidv4().slice(0, 8);

    const nouveauColis = new Colis({
      trackingNumber,
      expediteur,
      destinataire,
      telephoneDestinataire,
      paysDepart,
      paysArrivee,
      typeTransport,
    });

    await nouveauColis.save();

    res.status(201).json({
      message: "Colis créé avec succès",
      trackingNumber,
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur création colis" });
  }
});

// 🔍 Suivre un colis
router.get("/track/:trackingNumber", async (req, res) => {
  try {
    const colis = await Colis.findOne({
      trackingNumber: req.params.trackingNumber,
    });

    if (!colis) {
      return res.status(404).json({ message: "Colis introuvable" });
    }

    res.json(colis);
  } catch (error) {
    res.status(500).json({ error: "Erreur suivi colis" });
  }
});

module.exports = router;// ADMIN - Voir tous les colis
router.get("/all", async (req, res) => {
  try {
    const colis = await Colis.find().sort({ createdAt: -1 });
    res.json(colis);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ADMIN - Modifier le statut
router.put("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const colis = await Colis.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(colis);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});