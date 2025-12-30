const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const dados = [
  {
    id: 0,
    restaurante: 'Djapa Sushi',
    chegada: 50.00,
    bairros: [
      { id: 0, bairro: 'Rio Branco', taxa: 5 },
      { id: 1, bairro: 'Jardim Maluche', taxa: 7 },
      { id: 2, bairro: 'Guarani', taxa: 7 },
      { id: 3, bairro: 'Cento 1', taxa: 10 },
      { id: 4, bairro: 'Centro 2', taxa: 10 },
      { id: 5, bairro: 'São Luiz', taxa: 10 },
      { id: 6, bairro: 'Dom Joaquim', taxa: 10 },
      { id: 7, bairro: 'Azambuja', taxa: 10 },
      { id: 8, bairro: 'Santa Rita', taxa: 12 },
      { id: 9, bairro: 'Santa Terezinha', taxa: 12 },
      { id: 10, bairro: 'Santa Terezinha Pós Unifebe', taxa: 14 },
      { id: 11, bairro: 'Nova Brasília', taxa: 12 },
      { id: 12, bairro: 'Paquetá', taxa: 12 },
      { id: 13, bairro: 'Aguas claras', taxa: 12 },
      { id: 14, bairro: 'Tv Dom Joaquim', taxa: 12 },
      { id: 15, bairro: 'Primeiro de maio', taxa: 12 },
      { id: 16, bairro: 'São Sebastião', taxa: 12 },
      { id: 17, bairro: 'Imigrantes', taxa: 12 },
      { id: 18, bairro: 'Centro Guabiruba', taxa: 15 },
      { id: 19, bairro: 'Steffen', taxa: 15 },
      { id: 20, bairro: 'Poço Fundo', taxa: 15 },
      { id: 21, bairro: 'Tomaz Coelho', taxa: 15 },
      { id: 22, bairro: 'São Leopoldo', taxa: 15 },
      { id: 23, bairro: 'São Pedro Brusque', taxa: 15 },
      { id: 24, bairro: 'Ceramica Reis', taxa: 18 },
      { id: 25, bairro: 'Cedrinho', taxa: 18 },
      { id: 26, bairro: 'Guabiruba Sul', taxa: 18 },
      { id: 27, bairro: 'Cedro Alto', taxa: 19 },
      { id: 28, bairro: 'Limeira Baixa', taxa: 20 },
      { id: 29, bairro: 'São Pedro Gubiruba', taxa: 20 },
      { id: 30, bairro: 'Pomerânia', taxa: 20 },
      { id: 31, bairro: 'Alsácia', taxa: 25 },
      { id: 32, bairro: 'Lorena', taxa: 25 },
      { id: 33, bairro: 'Bateas', taxa: 25 },
      { id: 34, bairro: 'Planalto', taxa: 25 },
      { id: 35, bairro: 'Limoeiro', taxa: 25 },
      { id: 36, bairro: 'Lorena', taxa: 25 },
      { id: 37, bairro: 'Lageado Baixo', taxa: 25 },
      { id: 38, bairro: 'Volta Grande', taxa: 25 }
    ]
  },
  {
    id: 1,
    restaurante: 'Boteco do Bolinho',
    chegada: 50.00,
    bairros: [
      { id: 0, bairro: 'Rio Branco', taxa: 0 },
    ]
  }

]
app.use((req, res, next) => {//LEMBRAR DE TIRAR ESSE TRECHO MAIS TARDE, É APENAS PARA PERMITIR A APPWEB
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  //res.send('Hello World!')
  res.redirect('/inicio');
});
app.get('/inicio', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'inicio.html'));
  //res.redirect();
});
app.get('/buscarLojas', (req, res) => {
  if (!dados) {
    res.status(500).send('Erro iterno ao buscar dados!');
  }
  res.status(200).json(dados);
});
app.listen(port)