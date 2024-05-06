const express = require('express')                                                              
const app = new express()
const bodyParser = require('body-parser')



app.listen(4000,()=>{
  console.log('hi')
})


app.use(bodyParser.json())                               // so for post api to use body we should use body parser //




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