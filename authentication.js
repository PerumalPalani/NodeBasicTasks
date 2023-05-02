var http = require('http');
var url = require('url');
var qs = require('querystring');

var arr = [
    { username: 'manger@RA', password: 'right@123' },
    { username: 'asstmanger@RA', password: 'right@456' },
    { username: 'emp1@RA', password: 'right@789' },
    { username: 'emp2@RA', password: 'appleheart' },
];

http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/auth') {
        let txt = '';
        req.on('data', (chunk) => {
            txt += chunk.toString();
        });
        req.on('end', () => {
            let { username, password } = qs.parse(txt);
            console.log(username);
            console.log(password);
            let i = arr.find((e) => e.username === username);
            if (i && i.password === password) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(`<html>
                <body style="margin: 5% 10%;
                border: 5px groove rgb(23, 103, 128);
                padding: 1% 5%;">
                <h1>RIGHT AVENUE INFOTECH PRIVATE LIMITED</h1>
                <p>Welcome to ${username}</p>
                <table border='2px solid black' cellspacing='5px' cellspadding='2px'>
                <tr>
                <th>USER ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>POSSITION</th>
                <th>PHONE</th>
                </tr>
                <tr>
                <td>RA100198</td>
                <td>Darmesh H R</td>
                <td>darmesh@RA.info</td>
                <td>Manager</td>
                <td>9875432178</td>
                </tr>
                <tr>
                <td>RA100199</td>
                <td>Beemesh H</td>
                <td>beemeshcool@RA.info</td>
                <td>Asst Manager</td>
                <td>7065431290</td>
                </tr>
                <tr>
                <td>RA100200</td>
                <td>Arjun Reddy J</td>
                <td>arjunmass@RA.ifo</td>
                <td>HR</td>
                <td>8890543223</td>
                </tr>
                <tr>
                <td>RA100201</td>
                <td>Nagulan D</td>
                <td>nagulanteam@RA.info</td>
                <td>Team Leader</td>
                <td>9087126790</td>
                </tr>
                </table>  
                </body>
                </html>`);
                res.end();
            }
            else if(Array.isArray(username)){
                let j = username[1];
                console.log(j);
                var obj = {username : j, password : password};
                arr.push(obj);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(`New Authentication ${j} was updated!!!`);
                res.end();
            }
            else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Your not Authentication person, Please check your UserName and Password!!!');
            }
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Page not found!!1');
    }
}).listen(3037);
console.log('Your server is running !!!');