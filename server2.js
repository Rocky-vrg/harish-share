//here we use post api for post api or method there should be data sent from client,and when hitting them post api need those datas as object,so normally we call those posting datas as stream and in the next program we can use pakage (body parser ) which converts client datas (stream) to object//

const express = require('express')                                                              //shift+alt+a - comment multi lines//
const app = new express()
app.listen(4000,()=>{
  console.log('hi')
})

app.get("/",(req,res)=>{
  res.status(200).send(" not home")
})

app.get("/home",(req,res)=>{
  res.status(200).send("Welcome to get home page")
})

app.post("/home",(req,res,next)=>{
  req.name="vimal"
  next()
},
(req,res)=>{
  console.log(req.name)
  res.status(200).send("welcomwe to post home page")
})
//app.put()
//app.delete()