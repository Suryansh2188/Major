
const express = require('express');
const wifi = require('node-wifi');

const app = express();
const port = process.env.PORT || 3000;

// Initialize wifi module
wifi.init({
  iface: null,
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/scan', (req, res) => {
  wifi.scan((error, networks) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to scan networks' });
    } else {
      res.json(networks);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
