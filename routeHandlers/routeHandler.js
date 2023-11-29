const fs = require('fs').promises;
let characterHandler = require('./characterHandler');
let discussionHandler = require('./discussionHandler');
let staticHandler = require('./staticHandler');

/**
 * 
 * @param {string[]} pathSegments 
 * @param {import 'http'.IncomingMessage } req 
 * @param {import 'http'.ServerResponse} res 
 */
exports.handleRoute = async (pathSegments, req, res) => {

    if (pathSegments.length === 0) {
        let template = (await fs.readFile('templates/index.ballz')).toString();
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(template);
        res.end();
        return;
    }

    let seg = pathSegments.shift();

    switch (seg) {
        case 'characters':
            characterHandler.handleCharacterRoute(pathSegments, req, res);
            break;
        case 'discussion':
            discussionHandler.handleDiscussion(req, res);
            break;
        case 'static':
            staticHandler.handleStaticRoute(req, res, pathSegments);
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404, Not Found');
            res.end();
            break;
    }
}