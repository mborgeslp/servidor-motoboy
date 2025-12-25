const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const dados = [
  {
    restaurante: 'Djapa Sushi',
    chegada: 50.00,
    bairros: [
      { id: 1, bairro: 'Rio Branco', taxa: '5.00' },
      { id: 2, bairro: 'Jardim Maluche', taxa: '7.00' }
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

app.get('/inicio', (req, res) => {
  //res.send('Hello World!')
  res.sendFile(__dirname + '/public/inicio.html');
});
app.get('/buscarLojas', (req, res) => {
  if (!dados) {
    res.status(500).send('Erro iterno ao buscar dados!');
  }
  res.status(200).json(dados);
});
app.listen(port, () => {
  console.log(`Servidor rodando em  http://localhost:${port}`)
})