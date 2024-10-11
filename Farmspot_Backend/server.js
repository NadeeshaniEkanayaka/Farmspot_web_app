const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Serve files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS setup
app.use(cors({
  origin:  ['http://localhost:3000', 'http://localhost:4000'],  // Frontend URL
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  allowedHeaders: 'Content-Type, Authorization' // Allowed headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes'));

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});