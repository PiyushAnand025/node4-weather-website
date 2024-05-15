const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=22246bfc9511d90b7b43c1237c1def72&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)
     
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Please check your connection',undefined)
        }
        else if(body.error)
        {
            callback('Please check your input',response.body.error.type)
        }
        else
        {
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degress out. It feels like '
               +body.current.feelslike+' degress out.')
        }

    })

    
}

module.exports=forecast