let fs = require('fs').promises;
/**
 * 
 * @param {string[]} pathSegments 
 * @param {import 'http'.IncomingMessage } req 
 * @param {import 'http'.ServerResponse} res 
 */
exports.handleCharacterRoute = async (pathSegments, req, res) => {
    if (pathSegments.length === 0) {
        let template = (await fs.readFile('templates/characters-list.ballz')).toString();

        let profiles = [
            {
                name: 'Judy Hopps',
                url: './judy-hopps'
            },
            {
                name: 'Leodore Lionheart',
                url: './leodore-lionheart'
            }];

        let lis = '';

        for (let i = 0; i < profiles.length; i++) {
            let obj = profiles[i];
            lis += `<li><a href="${obj.url}">${obj.name}</a></li>`;
        }

        template = template.replaceAll('%profiles%', lis);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(template);
        res.end();
        return;
    }

    let seg = pathSegments.shift();

    let template = (await fs.readFile('templates/character.ballz')).toString();
    let variables = {};

    switch (seg) {
        case 'judy-hopps':
            variables = {
                name: 'Judy Hopps',
                image: '../static/judyhopps.jpg',
                species: 'rabbit',
                gender: 'F',
                occupation: 'police officer',
                personalityTraits: [
                    'energetic',
                    'overconfident',
                    'perky',
                    'heroic',
                    'self-righteous',
                    'optimistic',
                    'intelligent',
                    'persistent',
                    'ambitious',
                    'enthusiastic',
                    'diligent',
                    'idealistic',
                    'loyal',
                    'selfless',
                    'caring',
                    'forgiving',
                    'courageous'
                ]
            };

            break;
        case 'leodore-lionheart':
            variables = {
                name: 'Leodore Lionheart',
                image: '../static/LeodoreLionheart.jpg',
                species: 'lion',
                gender: 'M',
                occupation: 'mayor',
                personalityTraits: [
                    'charismatic',
                    'prideful',
                    'blustery',
                    'commanding',
                    'gruff',
                    'practical',
                    'intelligent',
                    'noble',
                    'inspiring',
                    'occasionally sarcastic',
                    'somewhat smarmy',
                    'pompous',
                    'dismissive',
                    'neglectful'
                ]
            };
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404, Not Found');
            res.end();
            return;
    }

    Object.keys(variables).forEach(key => {
        template = template.replaceAll(`%${key}%`, variables[key]);
    });

    let list = '';
    for (let i = 0; i < variables.personalityTraits.length; i++) {
        list += `<li>${variables.personalityTraits[i]}</li>`;
    }

    template = template.replace('%pTraits%', list);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(template);
    res.end();

}