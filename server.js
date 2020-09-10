const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const Workers = require("./models/Workers")
const mongoose = require("mongoose")
const validator = require("validator")
const { response } = require("express")
const app = express()


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

//connect local
//mongoose.connect("mongodb://localhost:27017/The_secondDB_created", {useNewUrlParser: true});

//connect to the app by altas
mongoose.connect("mongodb+srv://luozhongtain:lzt611789@cluster0.lg159.mongodb.net/The_SignDB_created?retryWrites=true&w=majority", 
{useNewUrlParser: true});

//在这个我文件中使用model里面的Student的Schema
app.route('/workers')
.get( (req, res)=>{
    Workers.find((err, workList)=>{
        if (err) {
            res.send(err)
        }else {
            res.send(workList)
        }
    })
})
.post( (req,res)=>{
    const worker = new Workers({
        
        firstname : req.body.fname,
        lastname : req.body.lname,
        tid:req.body.id,
        email:req.body.temail,
        phone:req.body.tphone,
        address:req.body.taddress,
        password:req.body.tpassword
    
    })
    worker.save((err) =>{
        if (err) {
            res.send(err)
        }else {
            res.send ('Successfully added a new worker!')
        }
    })
})
.delete((req,res) =>{
    Workers.deleteMany((err) =>{
        if (err) {
            res.send(err)
        }else {
            res.send('Successfully deleted all workers!')
        }
    })
})

app.route('/workers/:id')
    .get((req, res)=>{
        Workers.findOne({tid: req.params.id}, (err, foundWorker)=>{
            if (foundWorker) {
                (res.send(foundWorker))
            }else {
                res.send("No Matched Worker Found!")
            }
        })
    })
    .put((req,res)=>{
    Workers.update(
        {
            tid: req.params.id
        },
        {   tid: req.body.id,
            email:req.body.temail,
            firstname : req.body.fname,
            lastname : req.body.lname, 
            phone:req.body.tphone,
            address:req.body.taddress,
            password:req.body.tpassword
        },
        {overwrite:true}, 
        (err)=>{
            if (err) {
                res.send(err)
            }
            else {
                res.send('Successfully updated!')
            }
        }
    )
    })

    .patch((req, res)=>{
        
        Workers.update(
            {
                tid: req.params.id
            },
            {
                $set: req.body
            },
            (err)=>{
            if (!err) {
                res.send('Successfully updated! ')
            } else {
                res.send(err)
            }
        })
    })
    .delete((req,res)=>{
        Workers.deleteOne({tid:req.params.id},(err)=>{

            if(err){
                res.send(err)
            }else{
                res.send('Successfully deleted!')
            }
        })
    })
    app.listen(process.env.PORT || 8000, ()=>{
        console.log('Server started on port 8000');
    })
