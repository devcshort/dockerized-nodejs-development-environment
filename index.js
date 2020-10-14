const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const Comment = require('./models/Comment');

const app = express();

mongoose.connect('mongodb://mongo:27017/test', {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

app.engine('hbs', exphbs({ extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const comments = await Comment.find().sort('-createdAt');
    const mappedComments = comments.map(doc => doc.toJSON());

    res.render('index', {
        title: 'Dockerized App',
        comments: mappedComments
    });
});

app.post('/comments', (req, res) => {
    const newComment = new Comment({
        content: req.body.content
    });

    newComment
        .save()
        .catch(err => console.error(err))
        .finally(() => res.redirect('/'));
});

app.listen(3000);
