const express = require('express');

const app = express();

// Подключаемся к серверу монго
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// Подключаем пакет body-parser
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Реализуем временное решение авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '62e2a4bcd22d998f3dafa7cc',
  };
  next();
});

// импортируем роутер
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

// Запускаем роутинг
const logger = (req, res, next) => {
  console.log('Запрос залогирован!');
  next();
};

app.use(logger);
app.use('/', routerUsers);
app.use('/', routerCards);

app.listen(PORT, () => {
  console.log(`Приложение слушает порт ${PORT}`);
});
