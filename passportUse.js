var http = require('http');
var url = require('url');
var qs = require('querystring');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

//---create server--
http.createServer((req, res) => {

    //--define user name and password---
    const users = [
        { id: 1, username: 'peeter', password: 'peeter@12345' },
        { id: 2, username: 'billeyden', password: 'billeyden@9876' }
    ];

    //---set up passport jwt strategy--
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'my_secret_key'

    };
    passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
        const user = users.find(e => e.id === jwt_payload.sub);
        if (user) {
            done(null, user);
        } else {
            done(null, false)
        }
    }));

    //----url--

    let q = url.parse(req.url, true);

    if (req.url === '/login' && req.method === 'POST') {
        var txt = '';
        req.on('data', chunk => {
            txt += chunk.toString();
        });
        req.on('end', () => {
            let { username, password } = qs.parse(txt);
            //--if you want to check POSTMAN tool use this statement--
            // let { username, password } = JSON.parse(txt);

            //--find user in array--
            const user = users.find(e => e.username === username && e.password === password);

            if (user) {
                const token = jwt.sign({ sub: user.id }, jwtOptions.secretOrKey);
                res.writeHead(404, {'Content-Type':'application/json'});
                res.write('Successfully signed!!!!');
                res.end();
            } else {
                res.writeHead(404, {'Content-Type':'application/json'});
                res.write('Unauthorized!!');
                res.end();
            }
        });
    }
    else if (req.method === 'GET' && q.pathname === '/protected') {
        var txt = '';
        req.on('data', chunk => {
            txt += chunk.toString();
        });
        req.on('end', () => {
            passport.authenticate('jwt', { session: false });
            res.writeHead(200, {'Content-Type':'application/json'});
            res.end(`Protected Resource!!`);
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(`404 Page not found!!`);
    }
}).listen(3039);

console.log('Server is running currently!!!');

