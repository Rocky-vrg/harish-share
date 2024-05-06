
/* creating four methods using mongodb*/

const express = require('express')                                                              
const bodyParser = require('body-parser')
const sequelize=require('sequelize')
const fs=require('fs')
const mongoose=require('mongoose')
const { error } = require('console')



const app = new express()

app.listen(4000,()=>{
  console.log('Server is started at port no 4000')
})

app.use(bodyParser.json())

// workout= like a name of one of the warehouse for a kitchen .root=like admin userid,Vimal@123 =password or key to enter////creating a documentation for a property//

let dbConnection = new sequelize.Sequelize('Workout','root','Vimal@1234',{
   host: 'localhost',    //host is like address of warehouse//
   dialect:'mysql',      // types of warehouse// 
   logging: false        // like logboook to warehouse false means no need of that//
})

//now laying connection//    //It is like sending a person to check whether warehouse is accessile to take ingredients if then first or error//
dbConnection.authenticate().then(()=>{
    console.log('Database Connection has been estimated on local System')
}).catch((error)=>{
  console.log('Error in connecting to database in local system')
})

mongoose.connect('mongodb://127.0.0.1:27017/table').then((result)=>{
console.log('mongodb connected successfully');
}).catch((error)=>{
  console.log('error in connecting to mongodb',error);
})


//defining the structure of table-schema//
 const userSchema=new mongoose.Schema({

      first_name:{
        type : String,
        required:true
      },
      middle_name:{
        type : String,
        required:false
      },
      last_name:{
        type : String,
        required:true
      },
      phone_no:{
        type : String,
        required:false
      },
      email_id: {
        type : String,
        required:false
      },
 })

 const mongoUser=mongoose.model('users',userSchema)

//creating the table//
dbConnection.sync().then((result)=>{
 console.log("Table hs been created successfully")
}).catch((error)=>{
  console.log("Error in syncing the table",error)
})

app.get("/",(req,res)=>{
  res.status(200).send(" not home")
})

app.get("/home",(req,res)=>{
  console.log("req.body:::",req.body)
  console.log("req.query::",req.query)
  res.status(200).send("Welcome to get home page")
})

/* app.post("/home",(req,res,next)=>{
  req.name="vimal"
  next()
},
(req,res)=>{
  console.log(req.name)
  res.status(200).send("welcomwe to post home page")
})
 */

app.post("/home",(req,res)=>{
  console.log("req.body:::",req.body)
  console.log("req.query::",req.query)
  res.status(200).send("welcomwe to post home page")
})


function userCheckField(req,res,next){
  let firName=req.body.first_name
 
  let lastName=req.body.last_name
  let phoneno=req.body.phone_no
  let email=req.body.email_id

if(firName===undefined)
return res.status(400).json({
   success:0,
   error:"user firname is required"
})
if(lastName===undefined)
return res.status(400).json({
   success:0,
   error:"user lastname is required"
})
if(phoneno===undefined)
return res.status(400).json({
   success:0,
   error:"user phone no is required"
})
if(email===undefined)
return res.status(400).json({
   success:0,
   error:"user email is required"
})
next()
}

app.post('/user',userCheckField,(req,res)=>{

  console.log('Hi we have came to the final or main function.')
  let firName=req.body.first_name
  let midName=req.body.middle_name
  let lastName=req.body.last_name
  let phoneno=req.body.phone_no
  let email=req.body.email_id

/* if(firName===undefined)
return res.status(400).json({
   success:0,
   error:"user firname is required"
})
if(lastName===undefined)
return res.status(400).json({
   success:0,
   error:"user lastname is required"
})
if(phoneno===undefined)
return res.status(400).json({
   success:0,
   error:"user phone no is required"
})
if(email===undefined)
return res.status(400).json({
   success:0,
   error:"user email is required"
}) */

     mongoUser.create({
      first_name:firName,
      middle_name:midName,
      last_name:lastName,
      phone_no:phoneno,
      email_id:email
     }).then((result) =>{
       //console.log('result :::::',result)
       res.status(201).json({
        success :1,
        message :'Data has been stored successfully',
        data : result 

       })
     }).catch((error)=>{
      console.log("Error in storing the user data",error),
      res.status(500).json({
        success:0,
        error: error
      })
     })
})


app.get('/user', function(req, res){ 

  let username = req.query.name

  mongoUser.find({}).then((result)=>{
       console.log('fetched data :::::', result)
      res.status(200).json({
          success: 1,
          data: result
      })
  }).catch((error)=>{
      console.log('error in fetching the data :::::', error)
      res.status(500).json({
          success: 0,
          error: error.message
      })
  })
})


app.put('/user/:id',(req,res)=>{        //obj1-which record to be updated
  let uniqueId=req.params.id            //obj2-updating info
  let name=req.query.name

  mongoUser.updateMany({
    _id:uniqueId,   
  },{
      first_name:name,
  }
).then((result)=>{
  console.log('result::::',result)
  res.status(201).json({
    success:1,
    data:result
  })
}).catch((error)=>{
    console.log('error in updating the records ::::', error)
    res.status(500).json({
        success: 0,
        error: error.message
    })
  })
})
app.delete('/user/:id',(req,res)=>{
let userID=req.params.id

mongoUser.findOne({
  
    _id:userID
  
}).then((userinfo)=>{
  if(userinfo===null){
    return res.status(404).json({
      success:0,
      error:'user does not exist'
    })
  }
  mongoUser.deleteOne({
    
      _id:userID
    
  }).then((result)=>{
    mongoUser.create({

    }).then((result)=>{
        mongoUser.findAll().then((rest)=>{
            
        })
    }).catch((error)=>{

    })
    res.status(200).json({
        success: 1,
        data: result
    })
}).catch((error)=>{
    res.status(500).json({
        success: 0,
        error: error.message
    })
})

})

})
   