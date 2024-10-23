const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const laudoSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  data: { type: String, required: true },
  crm: { type: String, required: true },
  texto: { type: String, required: true },
  arquivo: { type: Buffer, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Laudo', laudoSchema);
