const  Anime = require('../models/anime')
const info = require('./seeds')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
 mongoose.connect('mongodb://0.0.0.0:27017/anime',{
    useUnifiedTopology:true,
    useNewUrlParser:true
 })

const  db = mongoose.connection
db.on('error',console.error.bind(console,"connection error"))
db.once("open",()=>{
  console.log("Release")  
})


const seedDB = async()=>{
     
        await Anime.deleteMany({})
       for(let i = 0;i < 20 ; i++){
             const ran = Math.floor(Math.random()*14);
            const list = new Anime({
                name:`${info[ran].name} `,
                episodes:`${info[ran].episodes}`,
                rating:`${info[ran].rating}`,
                popular:`${info[ran].popular}`,
                bestCharacter:`${info[ran].bestCharacter}`,
                category:`${info[ran].category}`
          
                
              
            })
            await list.save() 
       }
    
    }
    
    seedDB()


