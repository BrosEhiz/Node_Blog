const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
// app.use((req, res, next) => {
//   res.locals.path = req.path;
//   next();
// });

// mongoose.set("strictQuery", false)
const dbURl = 'mongodb+srv://Bros_Ehiz:ehizogie123@blog.uz4szia.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURl, {useNewUrlParser: true, useUnifiedTopology: true}).
then((result) => console.log('connected to DB')).
catch((error) => console.log(error));

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});