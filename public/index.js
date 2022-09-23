const express = require("express");

const app = express();
const port = '3000';
app.use(express.static('./public'));
app.get('/', function (req, res) {
  res.render('index.html');
});
app.listen(port, function () {
  console.log("WebServer is running");
}); //npm run compile
//npm install --save-dev @babel/cli @babel/core @babel/preset-react