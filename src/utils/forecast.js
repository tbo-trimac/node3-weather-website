const request = require ('request')

const forecast =(lat, long,  callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b4ee7024c026807e8f35d2b2d3096ed6&query=' + long + ',' + lat + '&units=m'

    request({ url, json: true}, (error, {body}) =>{

            if (error){
                callback('Unable to connect to weather services!')
            } else if(body.error){
                console.log(lat, long)
                callback('Unable to find location. Try an other search.', undefined)
            }
            else {
                callback( undefined, {
                    weather: body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + '.  The UV index is ' + body.current.uv_index + '.'                })
            }


    })
}

module.exports = forecast