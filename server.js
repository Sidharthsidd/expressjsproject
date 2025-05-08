const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');


dotenv.config({ path: './.env' });  // Ensure the correct path

console.log("Loaded ENV Variables:", process.env); // Debugging line

console.log("DATABASE URL:", process.env.DATABASE); // Should print the MongoDB URL

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

console.log("DATABASE URL:", process.env.DATABASE);  // Debugging log

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB connection successful');
}).catch(err => {
    console.error('DB connection error:', err);
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});






// testing code 



// const mongoose=require('mongoose')


// const tourSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         unique:true,
//     },
//     price:Number,
//     rating:Number,
// })


// const tour=mongoose.model('Tour',tourSchema)


//  const testTour = new tour({
//     name: 'The Forest Hiker',
//     rating: 4.7,
//     price: 497
// });


// testTour.save()
//     .then(doc => {
//         console.log('Tour Saved:', doc);
//     })
//     .catch(err => {
//         console.error('Error saving tour:', err);
//     });