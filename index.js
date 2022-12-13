const express = require('express');
const app = express();
const path = require('path');
let { comments } = require('./database_comment/comment');

//setup the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

console.log(comments);
app.listen(3000, () => {
  console.log('PORT LISTENING ON 3000');
});
