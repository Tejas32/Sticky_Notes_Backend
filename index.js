const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs');
const { log } = require('console');

app.set("view engine","ejs")
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));

app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        res.render("index", {files: files})//Sent the file's params files to the index page main files
    })
})

app.get('/files/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err,filedata)=>{
        res.render('show', {filename: req.params.filename, filedata: filedata})
    })
})

app.get('/edit/:filename', (req,res)=>{
    res.render('edit',{filename: req.params.filename})
})

app.post('/edit',(req,res)=>{
    fs.rename(`./files/${req.body.Previous}`, `./files/${req.body.New}`, (err)=>{
        res.redirect('/')
    })
})

// we can only read the data from input and textarea if we assign name property in their class
app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,`./files/${req.body.details}`,(err)=>{
        res.redirect('/');
    })
})

app.listen(3000);