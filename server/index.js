require('dotenv').config({ silent: true });
require('isomorphic-fetch');

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());

app.use(express.static(__dirname + '/../build'));

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname + '/../client/index.html'));
// });

app.get('/marks', (req, res, next) => {
    // let lat = req.query.lat;
    // let long = req.query.long;
    res.json([{lat: 153.0251, long: -27.4698}])
});

app.post('/add_mark', (req, res, next) => {

})

if (!module.parent) {
  app.listen(process.env.PORT || 7777, () => {
    console.log(`SERVER IS LIVE ON port ${process.env.PORT || 7777}`);
  });
}

module.exports = app;
