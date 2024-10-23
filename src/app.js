const express = require('express');
const mongoose = require('mongoose');
const laudoRoutes = require('./routes/laudoRoutes');
const config = require('./config');

const app = express();

app.use(express.json());

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.log('Erro ao conectar ao MongoDB:', err));

app.use('/api', laudoRoutes);

app.listen(config.PORT, () => {
  console.log(`Servidor rodando na porta ${config.PORT}`);
});
