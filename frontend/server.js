const handler = require('serve-handler');
const http = require('node:http');
const path = require('node:path');

const server = http.createServer((request, response) => {
    return handler(request, response, {
        public: path.join(__dirname, 'out'),
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});
