// Создаем роутер
const router = require('express').Router();

// Добавляем контролеров
const {
  postUser, sendUser, sendAllUsers, updateProfile, updateAvatar,
} = require('../controllers/users');

// Возвращаем пользователя по id
router.get('/users/:id', sendUser);

// Возвращаем всех пользователей
router.get('/users', sendAllUsers);

// Заводим нового пользователя
router.post('/users', postUser);

// Обновить профиль
router.patch('/users/me', updateProfile);

// Обновить аватар
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
