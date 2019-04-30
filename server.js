'use strict';
const express=require('express');
const cors=require('cors');
require('dotenv').config;

const PORT=process.env.PORT||3000;
const app=express();

app.use(cors());

app.use(express.static('./'));



app.get('/location',(req,res)=>{
  try{
    console.log(req.query);
    const locationData=getLocation(req.query.data);
    res.send(locationData);
  }
  catch(error){
    handleError(error);
  }
});


//helper to get locatiodata
function getLocation(){
  const geoData=require('./data/geo.json');
  const location=new Location(geoData.results[0]);
  return location;
}


//location constructor
function Location(data){
  this.formatted_query=data.formatted_address;
  this.latitude=data.geometry.location.lat;
  this.longitude=data.geometry.location.lng;
}



app.get('/weather',(request,response)=>{
  try{
    const weatherData=searchToweather(request.query.data);
    response.send(weatherData);
  }
  catch(error){handleError(error,response);}
});

//helper
function searchToweather(){
  let arr=[];
  const weaData=require('./data/darksky.json');

  for(let i=0;i<weaData.daily.data.length;i++){
    arr.push( new Weather(weaData.daily.data[i]));
  }
  return arr;
}

function Weather(demo){
  this.time=demo.time;
  this.forcast=demo.summary;
}



//error handling
function handleError(error,res){
  res.status(500).send('error');
}
app.listen(PORT,()=>{});
