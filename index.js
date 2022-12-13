const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
let { comments } = require('./database_comment/comment');

//middleware
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
//setup the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/comments', (req, res) => {
  res.render('index', { comments });
});

app.get('/comments/new', (req, res) => {
  res.render('new');
});

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect('/comments');
});

console.log(comments);
app.listen(3000, () => {
  console.log('PORT LISTENING ON 3000');
});
