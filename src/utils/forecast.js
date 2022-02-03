const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=da0785a51273793a3d68056cfde7c473&query=' +longitude+','+ latitude+'&units=m'
   //console.log(forecastUrl)
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather apis',undefined)
        }else if(body.error){
            callback('Unable to fetch weather',undefined)
        }else{
            callback(undefined,"Current temperature is:"+body.current.temperature 
            +" Feels liks is:"+body.current.feelslike+" . Description:"+body.current.weather_descriptions)
            
        }
    })
}


module.exports = forecast