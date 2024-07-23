const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado!'))
    .catch(err => console.log('Erro ao conectar ao MongoDB:', err));

// Modelos e rotas
const taskRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');

app.use('/api/tasks', taskRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
