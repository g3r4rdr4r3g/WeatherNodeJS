//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  var city = req.body.cityName;
  //add https:// in URL
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=963bc7ff51eb93da2413b8990ef3a628";
  https.get(url, function (apires){
    console.log(apires.statusCode);
    //apires = API Response
    apires.on("data", function (data){
      //data is in hex format so parse it to js object
      const weatherData = JSON.parse(data);
      //JSON.stringify to compress object to string

      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

      res.write("<h1 style='font-family:helvetica; font-size:4rem; text-align: center; padding: 2%;'>Current temperature in "+city+" is "+temp+" degree Celsius</h1>");
      res.write("<p style='font-family:helvetica; font-size:2rem; text-align: center;'>Description: "+desc+"</p>");
      res.write("<img style='margin: 2% auto; display: block;' src = "+imageURL+">");

      res.send();
    });
  });
});


// //res.send("Server is running");







app.listen(3000, function (){
  console.log("Server started at port 3000");
});
