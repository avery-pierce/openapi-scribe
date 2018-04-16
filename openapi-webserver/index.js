'use strict';

const path = require('path');
const express = require('express');
const Specification = require('../openapi-parser').Specification;

function OpenAPIWebserver(filePath) {
    this.filePath = filePath;
}

OpenAPIWebserver.prototype.listen = function(port, callback) {

    const app = express();
    app.get('/openapi.json', (request, response) => {
        Specification.readFile(this.filePath, (error, spec) => {
            response.send(spec.resolvedJSON);
            response.end();
        });
    });

    const staticPath = path.join(__dirname, 'static');
    app.use(express.static(staticPath));
    app.listen(port, callback);
};

module.exports = OpenAPIWebserver;