const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var mysql = require('mysql');
const port =3000;
const app =express();
// database connection part**************
var con = mysql.createConnection({
    host: "localhost",
    user: "sahan",
    password: "sahan1997",
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
// ****************************************
app.use(bodyParser.json());
app.use(cors());

app.get('/',function(req,res){
    res.send('Hello From Server');
});
app.post('/eventlog',function(req,res){

    console.log(req.body);
    res.status(200).send({"message" : "Data received"});
    con.connect(function() {
        //if (err) throw err;
        console.log("Connected!");
        var name =req.body.event_name;
        var mod = req.body.moderator;
        var sql = "INSERT INTO data VALUES ('"+name+"', '"+mod+"')";
        con.query(sql, function (err, result) {
          //if (err) throw err;
          console.log("1 record inserted");
        });
      });
})


app.listen(port,function(){
    console.log("Servce is running on localhost" + port);
});
