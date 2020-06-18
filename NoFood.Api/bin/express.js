const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const variables = require('../bin/configuration/variables');


//Routes
const categoriaRouter = require('../routes/categoria-router');
const produtoRouter = require('../routes/produto-router');
const usuarioRouter = require('../routes/usuario-router');


//Criando/Invocando a API/Server Web do Express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Configurando a conexão com o banco de dados
mongoose.connect(variables.Database.connection);


//Configurando as rotas
app.use('/API/categoria', categoriaRouter);
app.use('/API/produto', produtoRouter);
app.use('/API/usuario', usuarioRouter);

module.exports = app;