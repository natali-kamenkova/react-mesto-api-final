const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFound = require('../errors/NotFound'); // 404
const BadRequest = require('../errors/BadRequest'); // 400
const ConflictError = require('../errors/ConflictError'); // 409
const NotAuthError = require('../errors/NotAuthError');
const {
  SALT,
  CREATED,
  MONGO_DUPLICATE_ERROR_CODE,
} = require('../constants');
// const NotAuthError = require('../errors/NotAuthError');

const { JWT_SECRET = 'dev-key' } = process.env;

// получение всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// текущий пользователь
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(BadRequest('Переданы некорректные данные'));
      } else next(err);
    });
};

// получение пользователя по Id
module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Передан некорретный Id'));
        return;
      }
      next(err);
    });
};

// создание пользователя

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, SALT)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(CREATED).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))

    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else if (error.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(error);
      }
    });
};

// изменение профиля
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => { res.send(user); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err); // создаст 500
      }
    });
};

// изменение аватара
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => { res.send(user); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err); // создаст 500
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      console.log(user);
      if (!user) {
        throw new NotAuthError('Неправильные почта или пароль');
      }
      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NotAuthError('Неправильные почта или пароль');
          }

          return user;
        })
        .then(() => {
          // создадим токен
          const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );
          // вернём токен
          console.log(token);
          res.send({ message: 'Добро пожаловать', token });
        })
        .catch(next);
    })
    .catch(next);
};
