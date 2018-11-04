const http = require('http');
const app = require('./app');
const path = require('path');
const port = process.env.PORT || 5000

const server = http.createServer(app);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

server.listen(port, () => console.log(`Server listen at port ${port}`));

