const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const recordRoutes = require('./routes/recordRoutes');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connected')
  app.use(cors());
  app.use(bodyParser.json())
  app.use('/user', userRoutes)
  app.use('/record', recordRoutes)
  app.listen(port, () => {
    console.log("API is ready on port:", port)
  })
}).catch(err => console.error('MongoDB connection error:', err));