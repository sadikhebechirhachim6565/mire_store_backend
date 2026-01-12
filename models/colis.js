const mongoose = require("mongoose");

const ColisSchema = new mongoose.Schema(
  {
    trackingNumber: {
      type: String,
      required: true,
      unique: true,
    },
    expediteur: {
      type: String,
      required: true,
    },
    destinataire: {
      type: String,
      required: true,
    },
    telephoneDestinataire: {
      type: String,
      required: true,
    },
    paysDepart: {
      type: String,
      required: true,
    },
    paysArrivee: {
      type: String,
      required: true,
    },
    typeTransport: {
      type: String,
      enum: ["routier", "aerien"],
      required: true,
    },
    statut: {
      type: String,
      default: "En préparation",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Colis", ColisSchema);