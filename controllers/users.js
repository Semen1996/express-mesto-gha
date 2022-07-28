const User = require('../models/user');
const { defaultError, validtionError, notfoundError } = require('../utils/errors');

// Функция публикации юзера
module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(validtionError).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(defaultError).send({ message: 'Произошла ошибка' });
    });
};

// Функция отправки пользователя
module.exports.sendUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(notfoundError).send({ message: 'Пользователь не найден' });
        return;
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(validtionError).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(defaultError).send({ message: 'Произошла ошибка' });
    });
};

// Функция отправки всех пользователей
module.exports.sendAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        res.status(notfoundError).send({ message: 'Пользователи не найдены' });
        return;
      }
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(defaultError).send({ message: 'Произошла ошибка' });
    });
};

// Функция обновления профиля
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(notfoundError).send({ message: 'Пользователь не найден' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(validtionError).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(defaultError).send({ message: 'Произошла ошибка' });
    });
};

// Функция обновления аватара
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(notfoundError).send({ message: 'Пользователь не найден' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(validtionError).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(defaultError).send({ message: 'Произошла ошибка' });
    });
};
