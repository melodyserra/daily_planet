var express = require("express"),
app = express(),
bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

var articles = [
  {id:1, title:"awesome first post", body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, et. Similique ipsam consequuntur officia accusantium voluptatibus laudantium voluptate magni ipsa ullam cupiditate autem hic assumenda, ab, velit quo delectus recusandae."},
  {id:2, title:"awesome second post", body:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo molestias fugit eius voluptatibus repellat distinctio laboriosam debitis iure explicabo aperiam doloremque asperiores quis obcaecati, vel tempora, delectus nesciunt ipsa saepe."}];

var count = 3;

app.get('/', function(req,res){
  res.render('site/index', {articles: articles});
});

app.get('/about', function(req, res) {
  res.render('site/about');
});

app.get('/contact', function(req, res) {
  res.render('site/contact');
});

app.get('/articles', function(req, res) {
  res.render('articles', {articles: articles});
});

app.get('/articles/new', function(req, res) {
  res.render('newarticle');
});

app.post('/articles', function(req, res) {
  console.log(req.body.article);
  var article = {};
  article.id = count;
  article.title = req.body.article.title;
  article.body = req.body.article.title;
  articles.push(article);
  count++;
  res.redirect('/articles');
});

app.get('/articles/:id', function(req, res) {
  var articleId = Number(req.params.id);
  var foundArticle;
  articles.forEach(function(article){
    if(article.id === articleId){
      foundArticle = article;
    }
  });

  res.render('article', {article: foundArticle});
});

app.get('*', function(req,res){
  res.render('404');
});

app.listen(3000, function() {
  console.log('server started on localhost:3000');
});
