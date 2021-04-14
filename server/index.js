const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
