
const bodybarser = require("body-parser");
const express = require("express");
const https = require("https");
const app = express();

app.use(bodybarser.urlencoded({extended: true}));

app.get("/", function(req,res){
res.sendFile(__dirname+"/index.html");

});
app.post("/",function(req,res){


const apikey = "2e4f47f89ce84cc0ae811f36ae1a704a";
const city = req.body.cityname ;
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q= "+city+"&appid="+apikey+"&units="+unit;
https.get(url,function(response){
console.log(response.statusCode)
response.on("data",function(data){
    const weatherdata = JSON.parse(data);
    console.log(weatherdata);
    const descr = weatherdata.weather[0].description;
    const temp = weatherdata.main.temp;
    const icon = weatherdata.weather[0].icon;
    console.log(descr);
    res.write("<p>the desc is "+descr+"asas</p>");
    res.write("<h1>the temp is "+temp+"asas</h1>");
    res.write("<image>"+icon+"</image>");
    res.send();
});

});


});



app.listen(3000,function(){

console.log("server is runnning in ");
});