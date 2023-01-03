const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express();
const session = require("express-session")
const flash = require("connect-flash")
const method = require("method-override")
const Anime = require('./models/anime')
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://0.0.0.0:27017/anime",

{
    useUnifiedTopology:true,
    useNewUrlParser:true,
}
)
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error   "));
db.once("open",()=>{
    console.log("Hooked bro")
})

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(method("_method"))
const sessionConfig = {

       
    secret:"hope",
     resave:false,
     saveUninitialized:true,
     cookie:
     {
         httpOnly:true,
         expires:Date.now() +1000*60*60*7,
         maxAge:1000*60*60*7
     }
} 
app.use(session(sessionConfig))
app.use(flash())

app.use((req,res,next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next()
})

app.get('/anime/home',async(req,res)=>{
    res.render('home')
})


app.get('/anime',async(req,res)=>{
    const animes = await Anime.find()
    res.render('Animes/anime',{animes})
}) 
app.get('/anime/new',async(req,res)=>{

  
    res.render('Animes/new')
})
app.post('/anime',async(req,res)=>{
    const anime =  new Anime(req.body.anime)
    await anime.save();
    req.flash('success',"Successfully created!")
    res.redirect(`/anime/${anime._id}`)
})

app.get('/anime/:id',async(req,res)=>{
    const anime = await Anime.findById(req.params.id)
    res.render('Animes/show',{anime})

})

app.get('/anime/:id/edit',async(req,res)=>{
    const anime = await Anime.findById(req.params.id)
    res.render('Animes/edit',{anime})
})


app.put('/anime/:id',async(req,res)=>{
    const {id } = req.params
   const anime = await Anime.findByIdAndUpdate(id,{...req.body.anime})
   req.flash('success',"Successfully Edited!")
   res.redirect(`/anime/${anime._id}`)

})



app.delete('/anime/:id',async(req,res)=>{
    const {id} = req.params
    await Anime.findByIdAndDelete(id)
    req.flash('success',"Successfully Deleted!")
    res.redirect('/anime')
})

app.listen(3000,(req,res)=>{
    console.log("done well")
})



