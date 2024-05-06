
const http = require("http");

const host= 'localHost';
const port= 4000;

const books=JSON.stringify([
 {name : "Vimal", age :"36"},
 {name : "Raahul", age :"24"},
])
                                                                                                   
const call = (req,res)=>{

  res.setHeader("content-Type","application/json");                                             //res.writeHead(200,{'content-type':'text/html'})
  console.log("books::::",books);                                                               //res.write('<h1>hello</h1>')
  

  switch (req.url){
    case  "/books" :
      res.writeHead(200);
      res.end(books);
      break

     default :
      res.writeHead(200);
      res.end("home");
    

  }

}

const server = http.createServer(call);

server.listen(port,host,()=>{
  console.log(`server is running on port ${port} in ${host}`);
})