const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}))
//DB연결
const mongoose = require('mongoose');
const Article = require('./models/article');
mongoose.connect('mongodb://localhost/blog' , {useNewUrlParser: true , useUnifiedTopology : true , useCreateIndex: true });


app.set('view engine' , 'ejs');
//router
const routers = require('./routes/articles');




app.get('/' , async (req, res) => {
    const articles = await Article.find().sort({create: 'desc'});
    
    res.render('articles/index', {
        articles: articles,

    })
})


app.use('/articles' , routers)


app.listen(port , () => {
    console.log(`${port}포트 포트로 이동중....`)
})