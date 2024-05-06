
const http = require("http");

const host= 'localHost';
const port= 4000;

const call = (req,res)=>{
  res.writeHead(200);
  res.end("Hi my server");
}

const server = http.createServer(call);

server.listen(port,host,()=>{
  console.log(`server is running on port ${port} in ${host}`);
})








//another method//
  
// const server =http.createServer()

// server.on('request',(req,res)=>{
//   console.log(`server is running on port ${port} in ${host}`);
// })

// server.listen(5000)