const express = require("express");
const app = express();
const fs=require('fs');
const path=require('path');

app.use(express.json());
app.use(express.urlencoded({encoded: false}));

app.get('/', (req, res)=> {
  res.send('Hello from the web server side...')
});
app.listen(3000, ()=> console.log('Hello from the web server side...'))

app.use(express.static(path.join(__dirname, '../public')))

app.use((req, res, next)=> {
  console.log(req.url);
  next();

});
let arr=[]
app.post('/contact-form', (req,res)=> {
  console.log(req.body);
  fs.readFile('log.json', (err,data)=> {
    console.log(data)
    if(err)console.log(err);
    let info=JSON.parse(data);
    if (Array.isArray(info)){
      info.forEach(element=>arr.push(element))
    
    }else{
      arr.push(info)
    }arr.push(req.body);
    fs.writeFile('log.json', JSON.stringify(arr), (err)=> console.log(err))
  })
  res.send('Thanks')
})
app.get('/formsubmissions', (req,res)=>{
  fs.readFile('log.json', (err,data)=>{
    let info=JSON.parse(data);
    res.send(info)
  }
  )

})

