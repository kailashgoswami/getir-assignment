const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const apiUrl = process.env.API_URL || 'https://dry-scrubland-97450.herokuapp.com';
const app = express();
app.use(favicon(__dirname + '/../build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
app.use('/api', createProxyMiddleware({
  target: apiUrl,
  changeOrigin: true,
}));
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});