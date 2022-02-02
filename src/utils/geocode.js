const request = require('request')

const geocode=(address,callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWVnaHJhajI0OSIsImEiOiJja3l2eGliZWIwMzFxMndxdzl6eThrY2hrIn0.EYmejc8uV9iay5q-g_kSiA&limit=1'

    request({url, json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to location services',undefined)
        }else if(body.features.length ===0){
            callback('Unable to search. Change search query')
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude :body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports=geocode