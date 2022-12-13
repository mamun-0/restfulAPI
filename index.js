const express = require('express');
const app = express();
let comment = require('./database_comment/comment');

app.listen(3000, () => {
  console.log('PORT LISTENING ON 3000');
});
