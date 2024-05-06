
/* created table in database and syncing the values in that */

const express = require('express')                                                              
const bodyParser = require('body-parser')
const sequelize=require('sequelize')

const app = new express()

app.listen(4004,()=>{
  console.log('Server is started at port no 4004')
})

app.use(bodyParser.json())

// workout= like a name of one of the warehouse for a kitchen .root=like admin userid,Vimal@123 =password or key to enter////creating a documentation for a property//

let dbConnection = new sequelize.Sequelize('Workout','root','Vimal@1234',{
   host: 'localHost',    //host is like address of warehouse//
   dialect:'mysql',      // types of warehouse//
   logging: false        // like logboook to warehouse false means no need of that//
})

//now laying connection//    //It is like sending a person to check whether warehouse is accessile to take ingredients if then first or error//
dbConnection.authenticate().then(()=>{
    console.log('Database Connection has been estimated on local System')
}).catch((error)=>{
  console.log('Error in connecting to database in local system')
})

//defining the structure of table//
 const User=dbConnection.define('you',{
      
      id:{
        type : sequelize.STRING,
        allowNull:true,                  //means  not compulsory//
        primaryKey: true,
      },
      first_name:{
        type : sequelize.STRING,
        allowNull:false,
      },
      middle_name:{
        type : sequelize.STRING,
        allowNull: true,
      },
      last_name:{
        type : sequelize.STRING,
        allowNull:false,
      },
      phone_no:{
        type : sequelize.STRING,
        allowNull:false,
      },
      emai_id: {
        type : sequelize.STRING,
        allowNull:false,
      },
 })

//creating the table//
dbConnection.sync().then((result)=>{
 console.log("Table hs been created successfully")
}).catch((error)=>{
  console.log("Error in syncing the table",error)
})











app.use(bodyParser.json())                               




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


//app.put()
//app.delete()