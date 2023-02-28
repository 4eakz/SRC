const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const saltRounds = 10;
const secretKey = 'mysecretkey'; // можно задать любую строку

// Регистрация нового пользователя
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Проверяем, есть ли пользователь с таким же именем или почтой
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(409).json({ message: 'A user with this name or email is already registered' });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Создаем нового пользователя
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'A user is registered' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Авторизация пользователя
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Проверяем, есть ли пользователь с таким именем
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(401).json({ message: 'Incorrect user data' });
    }

    // Проверяем, верен ли пароль
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Incorrect user data' });
    }

    // Создаем токен для авторизации
    const token = jwt.sign({ userId: existingUser._id }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token, userId: existingUser._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
