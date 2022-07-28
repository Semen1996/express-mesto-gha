const Card = require('../models/card');
const { defaultError, validtionError, notfoundError } = require('../utils/errors');

// Функция публикации карточки
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req.user._id);
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(validtionError).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(defaultError).send({ message: 'Произошла ошибка' });
    });
};

// Функция удаление карточки
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(notfoundError).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(validtionError).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(defaultError).send({ message: 'Произошла ошибка' });
    });
};

// Функция отправки всех карточек
module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(defaultError).send({ message: 'Произошла ошибка' }));
};

// Функция, ставящая лайк
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(notfoundError).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(validtionError).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(defaultError).send({ message: 'Произошла ошибка' });
    });
};

// Функция, убирающая лайк
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(notfoundError).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(validtionError).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(defaultError).send({ message: 'Произошла ошибка' });
    });
};
