require('dotenv').config();

const mongoose = require('mongoose');
const Cooperative = require('../models/cooperatives');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log('Connect to Mongo DB and ready to seed!')
  })
  .catch(error => {
    console.log('Error connecting to Mongo DB', error)
  })

const cooperatives = [{
    name: "Cooperativa de materiais Recicláveis e Reaproveitáveis CHICO MENDES ",
    address: "Rua Cinira Polonio 369",
    location: {
      type: "Point",
      coordinates: [-46.457784, -23.622344]
    },
  }, {
    name: "CASA DO CATADOR - Cooperativa de Trabalho e Serviços em Gestão Integrada de Resíduos Sólidos",
    address: "Est Fazenda do Carmo, 450",
    location: {
      type: "Point",
      coordinates: [-46.477969, -23.583509]
    },
  },
  {
    name: "COOPAMARE - Cooperativa de Trabalho dos Catadores Autônomos de Papel, Aparas e Materiais Recicláveis",
    address: "Rua Galeno de Almeida, 659",
    location: {
      type: "Point",
      coordinates: [-46.679436, -23.553765]
    },
  },
  {
    name: "COOPERATIVA DE PARELHEIROS - Cooperativa de Trabalho, de Produção e Coleta Seletiva ",
    address: "Rua Henrique Hessel, 451",
    location: {
      type: "Point",
      coordinates: [-46.736572, -23.802714]
    },
  },
  {
    name: "COOPERCAPS - Cooperativa de Trabalho e Produção, Coleta, Triagem, Beneficiamento",
    address: "Avenida João Paulo da Silva, 48 ",
    location: {
      type: "Point",
      coordinates: [-46.697890, -23.693115]
    },
  },
  {
    name: "COOPERE CENTRO - Cooperativa de Trabalho, Produção e Prestação de Serviços dos Catadores",
    address: "Avenida do Estado, 300",
    location: {
      type: "Point",
      coordinates: [-46.636197, -23.522014]
    },
  },
  {
    name: "COOPERMYRE - Cooperativa de Produção, coleta, triagem e Beneficiamento de Materiais",
    address: "Rua Irapará, S/N",
    location: {
      type: "Point",
      coordinates: [-46.725440, -23.622185]
    },
  },
  {
    name: "COOPERPAC - Cooperativa de Catadores(as) Seletivos(as) Parque Cocaia de São Paulo",
    address: "Estrada do Barro Branco, 1501 ",
    location: {
      type: "Point",
      coordinates: [-46.639587, -23.658878]
    },
  },
  {
    name: "COOPERVIVABEM - Cooperativa de Trabalho e Produção de Materiais Recicláveis de São Paulo",
    address: "Avenida Presidente Castelo Branco, 7729 ",
    location: {
      type: "Point",
      coordinates: [-46.682016, -23.512240]
    },
  },
  {
    name: "GRANJA JULIETA - Cooperativa de Trabalho e Produção, Coleta, Triagem, Beneficiamento",
    address: "Rua Nossa Senhora do Socorro, 218",
    location: {
      type: "Point",
      coordinates: [-46.712391, -23.670813]
    },
  }
]

Cooperative.create(cooperatives)
  .then(allCoop => {
    console.log(`Created ${allCoop.length} cooperatives`);
    mongoose.connection.close();
  })
  .catch(err => console.log(err));