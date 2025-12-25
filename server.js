const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const dados = [
  {
    restaurante: 'Djapa Sushi',
    chegada: 50.00,
    bairros: [
      { id: 0, bairro: 'Rio Branco', taxa: '5.00' },
      { id: 0, bairro: 'Jardim Maluche', taxa: '7.00' },
      { id: 0, bairro: 'Guarani', taxa: '7.00' },
      { id: 0, bairro: 'Cento 1', taxa: '10.00' },
      { id: 0, bairro: 'Centro 2', taxa: '10.00' },
      { id: 0, bairro: 'São Luiz', taxa: '10.00' },
      { id: 0, bairro: 'Dom Joaquim', taxa: '10.00' },
      { id: 0, bairro: 'Azambuja', taxa: '10.00' },
      { id: 0, bairro: 'Santa Rita', taxa: '12.00' },
      { id: 0, bairro: 'Santa Terezinha', taxa: '12.00' },
      { id: 0, bairro: 'Santa Terezinha Pós Unifebe', taxa: '14.00' },
      { id: 0, bairro: 'Nova Brasília', taxa: '12.00' },
      { id: 0, bairro: 'Paquetá', taxa: '12.00' },
      { id: 0, bairro: 'Aguas claras', taxa: '12.00' },
      { id: 0, bairro: 'Tv Dom Joaquim', taxa: '12.00' },
      { id: 0, bairro: 'Primeiro de maio', taxa: '12.00' },
      { id: 0, bairro: 'São Sebastião', taxa: '12.00' },
      { id: 0, bairro: 'Imigrantes', taxa: '12.00' },
      { id: 0, bairro: 'Centro Guabiruba', taxa: '15.00' },
      { id: 0, bairro: 'Steffen', taxa: '15.00' },
      { id: 0, bairro: 'Poço Fundo', taxa: '15.00' },
      { id: 0, bairro: 'Tomaz Coelho', taxa: '15.00' },
      { id: 0, bairro: 'São Leopoldo', taxa: '15.00' },
      { id: 0, bairro: 'São Pedro Brusque', taxa: '15.00' },
      { id: 0, bairro: 'Ceramica Reis', taxa: '18.00' },
      { id: 0, bairro: 'Cedrinho', taxa: '18.00' },
      { id: 0, bairro: 'Guabiruba Sul', taxa: '18.00' },
      { id: 0, bairro: 'Cedro Alto', taxa: '19.00' },
      { id: 0, bairro: 'Limeira Baixa', taxa: '20.00' },
      { id: 0, bairro: 'São Pedro Gubiruba', taxa: '20.00' },
      { id: 0, bairro: 'Pomerânia', taxa: '20.00' },
      { id: 0, bairro: 'Alsácia', taxa: '25.00' },
      { id: 0, bairro: 'Lorena', taxa: '25.00' },
      { id: 0, bairro: 'Bateas', taxa: '25.00' },
      { id: 0, bairro: 'Planalto', taxa: '25.00' },
      { id: 0, bairro: 'Limoeiro', taxa: '25.00' },
      { id: 0, bairro: 'Lorena', taxa: '25.00' },
      { id: 0, bairro: 'Lageado Baixo', taxa: '25.00' },
      { id: 0, bairro: 'Volta Grande', taxa: '35.00' }
    ]
  },
  {
    restaurante: 'Diminas Hamburgueria',
    chegada: 40.00,
    bairros: [
      { id: 1, bairro: 'Centro', taxa: '10.00' },
      { id: 2, bairro: 'Steffen', taxa: '15.00' }
    ]
  }
]

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