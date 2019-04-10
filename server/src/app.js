const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

var Post = require("../models/post");
var Profile = require("../models/profile")

app.get('/profiles' , (req, res) => {
  Profile.find({}, 'username kills deaths matchesP matchesW' , function(error, profiles) {
    if (error){console.error(error);}
    res.send({
      profiles: profiles
    })
  }).sort({_id:-1})
})

app.post('/add_profile' , (req, res) => {
	var db = req.db;
	var username = req.body.username;
	var kills = req.body.kills;
  var deaths = req.body.deaths;
  var matchesP = req.body.matchesP;
  var matchesW = req.body.matchesW;
	var new_profile = new Profile({
		username: username,
		kills: kills,
    deaths: deaths,
    matchesP: matchesP,
    matchesW: matchesW
	})

	new_profile.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
})

app.delete('/profiles/:id', (req, res) => {
	var db = req.db;
	Profile.remove({
		_id: req.params.id
	}, function(err, post){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

app.get('/test' , (req, res) => {
  res.send({
    hello: 'hello'
  })
})

app.get('/posts', (req, res) => {
  Post.find({}, 'title description cust', function (error, posts) {
	  if (error) { console.error(error); }
	  res.send({
			posts: posts
		})
	}).sort({_id:-1})
})

app.post('/add_post', (req, res) => {
	var db = req.db;
	var title = req.body.title;
	var description = req.body.description;
  var cust = req.body.cust;
	var new_post = new Post({
		title: title,
		description: description,
    cust: cust
	})

	new_post.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
})

app.put('/posts/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'title description', function (error, post) {
	  if (error) { console.error(error); }

	  post.title = req.body.title
	  post.description = req.body.description
    post.cust = req.body.cust
	  post.save(function (error) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true
			})
		})
	})
})

app.delete('/posts/:id', (req, res) => {
	var db = req.db;
	Post.remove({
		_id: req.params.id
	}, function(err, post){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

app.get('/post/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'title description cust', function (error, post) {
	  if (error) { console.error(error); }
	  res.send(post)
	})
})

app.listen(process.env.PORT || 8081)
