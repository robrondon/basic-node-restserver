const express = require('express');
const cors = require('cors');
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.usersPath = '/api/users';

    // Middlewares
    this.middlewares();

    // Application Routes
    this.routes();
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/user.routes.js'));
  }

  listen() {
    this.app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${this.port}`)
    );
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Read and parse info
    this.app.use(express.json());

    // Public Directory
    this.app.use(express.static('public'));
  }
}

module.exports = Server;
