// Создаем роутер
const router = require('express').Router();

// Добавляем контролеров
const {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
} = require('../controllers/cards');

// Удаляем карточку
router.delete('/cards/:id', deleteCard);

// Показываем все карточки
router.get('/cards', getAllCards);

// Создаем новую карточку
router.post('/cards', createCard);

// Обновить профиль
router.put('/cards/:cardId/likes', likeCard);

// Обновить аватар
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
