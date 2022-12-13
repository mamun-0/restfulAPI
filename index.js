const express = require('express');
const app = express();
const path = require('path');
let { comments } = require('./database_comment/comment');

//setup the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', { comments });
});

app.get('/comments/new', (req, res) => {
  res.render('new');
});

console.log(comments);
app.listen(3000, () => {
  console.log('PORT LISTENING ON 3000');
});
