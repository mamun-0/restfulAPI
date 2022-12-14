const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
let { comments } = require('./database_comment/comment');

//middleware
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
//setup the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/comments', (req, res) => {
  res.render('index', { comments, title:"All Coments" });
});

app.get('/comments/new', (req, res) => {
  res.render('new',{title:"Add new comment"});
});
app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params;
  const foundComment = comments.find((c) => c.id === id);
  res.render('edit', { foundComment, title:"Edit comment" });
});
app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const foundComment = comments.find((c) => c.id === id);
  res.render('show', { foundComment, title:"Comment details" });
});
app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuidv4() });
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
