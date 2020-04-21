const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require('bcrypt');
const expressSession = require("express-session");
const path = require("path");

const PORT = process.env.PORT || 8000;

const app = express();

app.set("view engine", "pug");

app.use("/views", express.static( __dirname + "/views"));

app.use("/js", express.static(__dirname + "/assets/js"));
app.use("/css", express.static(__dirname + "/assets/css"));
app.use("/img", express.static(__dirname + "/assets/img"));

app.use(bodyParser.json({ type: 'application/json' }));
// app.use(bodyParser.urlencoded( { extended: true } )); 


let connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    database : "auth",
    password : "root"
})

const saltRounds = 10;


app.get("/", function(request, response) {
    response.render("main");
});

app.post("/authPassport", function(request, response) {
    console.log(JSON.stringify(request.body, null, 4));

});

app.post("/authJWT", function(request, response) {
    console.log(JSON.stringify(request.body, null, 4));

});

app.post("/authEncript", function(request, response) {
    console.log(JSON.stringify(request.body, null, 4));

});


app.post("/authBcrypt", function(request, response) {
    console.log(JSON.stringify(request.body, null, 4));
});


app.post("/registration", (request, response) => {
    console.log(JSON.stringify(request.body, null, 4));
    
    new Promise( (resolve, reject) => {
        bcrypt.hash(request.body.dataForm.password, saltRounds, function(err, hash) {
            resolve(hash);
        });
    }).then( (hash) => {
        return new Promise( (resolve, reject ) => {
            connection.query(`
                insert into user(login, password)
                    values(?, ?)
            `, [request.body.dataForm.login, hash], (err, res) => {
                if(err) console.log(err);
                resolve({
                    status : "success",
                    text : "Пользователь успешно добавлен"
                });
            })    
        })
        
    }).then( (result) => {
        response.send(result);
    })

});

app.listen(PORT, function(){
    console.log(`Server was started on ${PORT} port`)
})
