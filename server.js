'use strict';
const express=require('express');
const cors=require('cors');
require('dotenv').config;

const PORT=process.env.PORT||3000;
const app=express();

app.use(cors());

app.use(express.static('./'));



app.get('./location',(req,res)=>{
  const locationData=getLocation();
  res.send(locationData);
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




//error handling
function handleError(error,res){

  if(res)
    res.status(500).send('error');
}
app.listen(PORT,()=>{});
