const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { title } = require('process')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))


const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Piyush Anand'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',        
        name:'Piyush Anand'
    })
})

app.get('/help',(req,res)=>{

    res.render('help',{
        helpText:'This is some useful texts',
        title:'Help',
        name:'Piyush Anand'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

        if(error){
            return res.send({ error })
        }
        
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                address : req.query.address,
                forecast : forecastData,
                location
            })
        })
        
    })

    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search term'
        })
    }


    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Piyush Anand',
        errorMessage:'Help article not found'
    })

})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Piyush Anand',
        errorMessage:'Page not found'

    })
})


app.listen(port,()=>{
    console.log('Server is up on port '+port)
})