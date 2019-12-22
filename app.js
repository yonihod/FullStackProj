const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/fullStack');
let db = mongoose.connection;

db.once('open',()=> {
    console.log('Connected to Mongodb')
})

// check for db errors
db.on('error',() => {
   console.log('err');
});

//init app
const app = express();

// Body Parser
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Set Public Folder
app.use(express.static(path.join(__dirname,'public')));

//Bring in Models
let Article = require('./models/article');

// Load View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');


// Home Route
app.get('/',(req,res) => {
    Article.find({},(err,articles)=> {
        if(err){
            console.log(err);
        }else {
            res.render('index',{
                articles: articles
            });
        }
    })
});

// Add Route
app.get('/articles/add',(req,res)=> {
   res.render('add_article',{
       title: 'Add Article'
   })
});

// Get Single Article
app.get('/article/:id',(req,res)=>{
    Article.findById(req.params.id,(err,article) =>
        res.render('article',{
            article:article
        })
    )}
)

// Add Submit Post Route
app.post('/articles/add',urlencodedParser,(req,res)=> {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    article.save( (err) => {
        if(err){
            console.log(err);
            return;
        }else {
            res.redirect('/')
        }
    })
});

// Update Submit Post Route
app.post('/articles/edit/:id',urlencodedParser,(req,res)=> {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    let query = {_id:req.params.id};
    Article.update( query,article,(err) => {
        if(err){
            console.log(err);
            return;
        }else {
            res.redirect('/')
        }
    })
});

app.delete('/article/:id',(req,res)=>{
    let query = {_id:req.params.id};
    Article.remove(query,function (err) {
        if(err){
            console.log(err)
        }
        res.send('Success')
    })
})

// Load Edit Form
app.get('/article/edit/:id',(req,res)=>{
    Article.findById(req.params.id,(err,article) =>
        res.render('edit_article',{
            article:article,
            title:'Edit Article'
        })
    )}
)

// Start Server
app.listen('3000',() => {
    console.log('Server started on port 3000');
});