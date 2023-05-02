const { query } = require('express');
var http = require('http');
var qs = require('querystring');
// var arr = require('./info02');
var url = require('url');
const arr = [
    { id: 1, fname: 'hero' },
    { id: 2, fname: 'villan' },
    { id: 3, fname: 'side character' },
    { id: 4, fname: 'commedian' },
    { id: 5, fname: 'heroien' },
];

http.createServer((req, res) => {
    var q = url.parse(req.url, true);
    console.log(q);
    console.log(req.method);
    /* console.log(req.url);
    console.log(q.pathname);
    console.log(q.query);
    console.log(q.query.fname); */
    if (q.pathname === "/cre" && req.method === "GET") {
        // console.log('IT is entered add data!!');
        var txt = '';
        req.on('data', chunk => {
            txt += chunk.toString();
        });
        req.on('end', () => {
            var { fname } = q.query;
            // console.log(`The name is ${fname}`);
            var i = { id: arr.length + 1, fname: fname }
            arr.push(i);
            console.log(arr);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(`The inserted valures are ${arr[arr.length - 1].id} and ${arr[arr.length - 1].fname}`);
            res.end();
        });
    }

    //-----Get Edit Conditions--
    else if (q.pathname === "/cre/id" && req.method === "GET") {
        var txt = '';
        req.on('data', chunk => {
            txt += chunk.toString();
        });
        req.on('end', () => {
            var { id, age, address } = q.query;
            // console.log(`The name is ${fname}`);
            let check = arr.find((e) => e.id === parseInt(id));
            console.log(check);
            if (check) {
                let i = { age: age, address: address}
                Object.assign(check, i);
                console.log(arr);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(`The inserted valures are ${check.id} and ${check.fname}`);
                res.end();
            }else{
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('OBJECT NOT FOUND IN GET METHOD!!!');
            }
        });
    }
    else if(q.pathname === "/cre/id/put" && req.method === "PUT"){
        var txt = '';
        req.on('data', chunk => {
            txt += chunk.toString();
        });
        req.on('end', () => {
            // console.log(txt);
            var { id, fname} = JSON.parse(txt);
            // console.log(`The name is ${fname}`);
            let check = arr.find((e) => e.id === parseInt(id));
            console.log(check);
            if (check) {
                if(check.fname !== undefined){
                    check.fname = fname;
                }
                if(check.age !== undefined){
                    check.age = age;
                }
                if(check.address !== undefined){
                    check.address = address;
                }
                console.log(arr);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(`The inserted valures are ${check.id} and ${check.fname}`);
                res.end();
            }else{
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('OBJECT NOT FOUND IN PUT METHOD!!!');
            }
        });
    }

    //---in Ajax put method--
    else if(q.pathname === "/domain/route/param" && req.method === "PUT"){
        console.log('put method is started');
        var txt = '';
        req.on('data', chunk => {
            txt += chunk.toString();
        });
        req.on('end', () => {
            var { id, fname} = JSON.parse(txt);
            // console.log(`The name is ${fname}`);
            let check = arr.find((e) => e.id === parseInt(id));
            console.log(check);
            if (check) {
                if(check.fname !== undefined){
                    check.fname = fname;
                }
                if(check.age !== undefined){
                    check.age = age;
                }
                if(check.address !== undefined){
                    check.address = address;
                }
                console.log(arr);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(`The inserted values are ${check.id} and ${check.fname}`);
                res.end();
            }else{
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('OBJECT NOT FOUND IN PUT METHOD in Ajax!!!');
            }
        });
    }

    //--in ajax delete method--
    else if(q.pathname === "/domain/route/param" && req.method === "DELETE"){
        console.log('Delete method is started');
        var txt = '';
        req.on('data', chunk => {
            txt += chunk.toString();
        });
        req.on('end', () => {
            var { id } = JSON.parse(txt);
            // console.log(`The name is ${fname}`);
            let check = arr.find((e) => e.id === parseInt(id));
            console.log(check);
            if (check) {
                let j = arr.findIndex(myFun);
                function myFun(value){
                    return value.id == id;
                }
                arr.splice(j, 1);
                console.log(arr);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(`The Deleted values are ${check.id} and ${check.fname}`);
                res.end();
            }else{
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('OBJECT NOT FOUND IN PUT METHOD in Ajax!!!');
            }
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(`404 Page not found`);
        res.end();
    }
}).listen(3036);
console.log('Server its running!!!');
console.log(arr.length);






