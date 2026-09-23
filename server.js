const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const peopleRoutes = require('./src/routes/people');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/people', peopleRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});