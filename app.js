const express=require('express');
const fs=require("fs");
const { dirname } = require('path');
const app =express();
app.use(express.json())
/*
app.get("/",(req,res)=>{
    res.status(200).json({masssege:'hello from the server side !',app:"nartour"});
});*/


/*app.post("/",(req,res)=>{
    res.send("you can post to this edpoint")
})*/

//**parse the data from the from the file once because we dont want the data to be reloaded again and again  because the data is get only once when page is opended 
const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
// console.log(tours)



app.listen(3000,()=>{
    console.log("listening on 3000")
});



const deletetoursid=(req,res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
                status:'fail',
                massege:'invalid id'
            });
    }

    res.status(204).json({
        status:'success',
        data:null
    })
}

const patchtourid=(req,res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
                status:'fail',
                massege:'invalid id'
            });
    }

    res.status(200).json({
        status:'success',
        data:{
            tour:'<updated tour here...>'
        }
    })
}

const gettoursid=(req,res)=>{
    // console.log(req.params)
    const id=req.params.id*1;         // as the result is in string to convert the string to numebr 
    const tour =tours.find(el=>el.id===id)
    console.log(tour)
    res.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tour      
        }
})}

const gettours=(req,res)=>{
    res.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tours:tours,       //tours the value is set as specified when the file is synced by readfilesync
        }
})}
const posttours=(req,res)=>{
    // console.log(req.body);
    const newId =tours[tours.length-1].id+1;
    const newTour =Object.assign({id:newId},req.body);
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{res.status(201).json({status:'success',data:{tour:newTour}})})
    
}



app.route("/api/v1/tours",gettours)
app.post("/api/v1/tours",posttours);
//parameters
app.get("/api/v1/tours/:id",gettoursid);
app.patch('/api/v1/tours/:id',patchtourid)
app.delete('/api/v1/tours/:id',deletetoursid)


//with shortcut  for better understanding the code  using route 
app.route("/api/v1/tours",).get(gettours).post(posttours) 
app.route('/api/v1/tours/:id').patch(patchtourid).delete(deletetoursid).get(gettoursid)
