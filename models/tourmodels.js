const mongoose=require('mongoose')


const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    price:Number,
    rating:Number,
})


const tour=mongoose.model('Tour',tourSchema)
module.exports=tour;