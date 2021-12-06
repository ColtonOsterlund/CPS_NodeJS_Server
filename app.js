require('dotenv').config();

const express = require('express');

const app = express();

const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users/', require('./routes/api/users'));
app.use('/api/herds/', require('./routes/api/herds'));
app.use('/api/cows/', require('./routes/api/cows'));
app.use('/api/calciulate-tests/', require('./routes/api/calciulate_tests'));

app.get('/', (req, res) => {
  res.send('ROOT');
});

app.listen(port, () => console.log(`Server started on ${hostname}:${port}`));
