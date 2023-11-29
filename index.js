const http = require('http');
let routeHandler = require('./routeHandlers/routeHandler')
let port = 3000;

let app = http.createServer(async (req, res) => {
    let url = new URL(req.url, 'http://' + req.headers.host);
    let path = url.pathname;
    let pathSegments = path.split('/').filter((element) => {
        return element !== '';
    });

    await routeHandler.handleRoute(pathSegments, req, res);
});

app.listen(port, () => {
    console.log(`Server listeing on port ${port}`);
})