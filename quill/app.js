'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const staticdir = path.join(__dirname, 'static');

// https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/

const server = http.createServer(function (req, res) {
  const filepath = path.join(staticdir, req.url.slice(1));
  console.log(`filepath: ${filepath} [${path.extname(filepath)}]`);
  if (fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
    if (path.extname(filepath) === '.html') {
      res.setHeader('content-type', 'text/html');
    }
    if (path.extname(filepath) === '.js') {
      res.setHeader('content-type', 'application/javascript');
    }
    res.end(fs.readFileSync(filepath));
    return;
  }

  res.end(JSON.stringify({ ok: false, message: `${req.url} is not supported` }));
});

server.listen(3010, () => console.log('http server started...'));