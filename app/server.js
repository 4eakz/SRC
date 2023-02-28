const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const videoRouter = require('./routes/video');
const userRouter = require('./routes/user');
const commentRouter = require('./routes/comment');

const app = express();
const PORT = process.env.PORT || 3001;

// Parse incoming JSON requests
app.use(bodyParser.json());
// Use the MongoDB Node.js driver's built-in parser library
const uri = `mongodb+srv://qwerty:qwerty123@cluster0.ivyl8eo.mongodb.net/auth_roles?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(express.static('client/public'));
app.use(express.json());
// Wait for MongoDB connection to be established
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
// Handle MongoDB connection errors
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

app.use('/video', videoRouter);
app.use('/user', userRouter);
app.use('/comment', commentRouter);

// Start the server
app.listen(PORT, () => {
  console.log('http://localhost:3001')
});
