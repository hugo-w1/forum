let fs = require('fs');
let fsp = require('fs').promises;

/**
 * 
 * @param {import 'http'.IncomingMessage} req 
 * @param {import 'http'.ServerResponse} res 
 * @param {string[]} pathSegments 
 */
exports.handleStaticRoute = async (req, res, pathSegments) => {
    let seg = pathSegments.shift();
    let ext = seg.split('.')[1];

    let filePath = 'static/' + seg;

    let contentType;
    let fileContent = await fsp.readFile(filePath);

    if (fs.existsSync(filePath)) {
        switch (ext) {
            case 'css':
                contentType = { 'Content-Type': 'text/css' };
                break;
            case 'jpeg':
                contentType = { 'Content-Type': 'image/jpeg' };
                break;
            case 'jpg':
                contentType = { 'Content-Type': 'image/jpeg' };
                break;
            case 'png':
                contentType = { 'Content-Type': 'image/png' };
                break;
            default:
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('404, Not Found');
                res.end();
                return;
        }

        res.writeHead(200, contentType);
        res.write(fileContent);
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404, Not Found');
        res.end();
    }



    console.log(seg);

}