const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app= express()
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather ',
        name:'meghraj'
    })
})

app.get('/about',(req,res)=>{
     res.render('about',{
         title:'About ',
         name:'meghraj'
     })
 })

 app.get('/help',(req,res)=>{
     res.render('help',{
         helptext:'help from node',
         title:' Help',
         name:'meghraj'
     })
 })

app.get('/weather',(req,res)=>{
   if(!req.query.address){
       return res.send({
           error:'Please provide a search term'
       })
   } 
   geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(longitude,latitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
   })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'meghraj',
        errorMessage:'Help article Page'  
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'meghraj',
        errorMessage:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up with port 3000')
})
