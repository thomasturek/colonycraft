const express = require('express');
const app = express();
const PORT = 8080;

const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
