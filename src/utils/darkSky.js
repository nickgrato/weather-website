const request = require("request");

const darkSky = (lat,long, callback) => {
  const url =`https://api.darksky.net/forecast/cd1af7fba55fac13d4d60d2a491cca05/${long},${lat}`

  request({ url, json: true }, (error, {body}) => {
    if(error){
        callback('Unable to connect to location serivice')
      }else if(body.error) {
        callback('Unable to find dark sky location, try another search')
      }else{
        callback(undefined,`Its is currently ${body.currently.temperature} degrees out. there is a ${body.currently.precipProbability}% chance of rain.`)
      }
    })
}


module.exports = darkSky