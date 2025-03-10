require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const {
  unknownEndpoint,
  errorHandler,
} = require('./middleware/customMiddleware');
const jobRouter = require('./routes/jobRouter');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

connectDB();

// Use the jobRouter for all /api/jobs routes
app.use('/api/jobs', jobRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
  console.log('Server is running on http://localhost:${port}');
});
