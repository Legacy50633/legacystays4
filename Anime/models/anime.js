const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnimeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    episodes:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    bestCharacter:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    popular:{
        type:String,
        required:true
    }




})
module.exports = mongoose.model('Anime',AnimeSchema)