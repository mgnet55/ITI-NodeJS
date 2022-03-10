const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 9999;

const content = {
  html: { content: "<h1>Hello to html content</h1>", type: 'text/html' },
  profile: { content: "<head><link rel=\"stylesheet\" href=\"style.css\"></head><h1>Hello from profile</h1><img src=\"assets/avatar.png\">", type: 'text/html' },
  profileImg: { content: fs.readFileSync('assets/avatar.png') ?? '', type: 'image/png' },
  json: { content: JSON.stringify({ id: 5, name: "gimmey" }), type: 'text/json' },
  favico: { content: fs.readFileSync('favicon.ico') ?? '', type: 'image/x-icon' },
  error: { content: "<h1 style=\"text-align:center\">Not found</h1>", type: 'text/html' },
  style: { content: fs.readFileSync('style.css') ?? '', type: 'text/css' }, 
};

const routes = {
  '/': content.html,
  '/home': content.html,
  '/profile': content.profile,
  '/assets/avatar.png': content.profileImg,
  '/json': content.json,
  '/favicon.ico': content.favico,
  '/style.css': content.style,
  '/error': content.error
};

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const responseData = routes[req.url] ?? routes['/error'];
  if (responseData== routes['/error']){res.statusCode = 404}else{res.statusCode = 200}
  res.setHeader('Content-Type', responseData.type);
  res.end(responseData.content);
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});










