const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { uuid } = require('uuidv4');
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
app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect('/comments');
});
app.patch('/comments/:id', (req, res) => {
  const { id } = req.params;
  const { username, comment } = req.body;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.username = username;
  foundComment.comment = comment;
  res.redirect('/comments');
});
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect('/comments');
});

app.listen(3000, () => {
  console.log('PORT LISTENING ON 3000');
});
