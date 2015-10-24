/**
 * Created by Timothy on 10/18/15.
 */

var express = require('express'),
    mongodb = require('mongodb'),
    app = express(),
    bodyParser = require('body-parser'),
    validator = require('express-validator'),
    url = 'mongodb://localhost:27017/board'

String.prototype.capitalize = function() {
    return this.toLowerCase().replace(/\b\w/g, function(ch) {
        return ch.toUpperCase()
    })
}

mongodb.MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log(err)
        process.exit(1)
    }

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(validator())
    app.use(express.static('public'))

    app.use(function(req, res, next) {
        req.menu = db.collection('menu')
        return next()
    })

    app.get('/menu', function(req, res, next) {
        req.menu.find({}, {sort: {name: -1}}).toArray(function (err, docs) {
            if (err) return next(err)
                return res.json(docs)
        })
    })

    app.post('/menu', function(req, res, next) {
        req.checkBody('name', 'Sushi item needs a name').notEmpty()
        req.checkBody('ingredients', 'Sushi item needs ingredients').notEmpty()
        var errors = req.validationErrors()
        if (errors) return next(errors)
        req.body.name = req.body.name.capitalize()
        req.body.ingredients = req.body.ingredients.map(function(word) {return word.capitalize()})
        req.menu.insertOne(req.body, function(err, result) {
            if (err) return next(err)
            return res.json(result.ops[0])
        })
    })

    app.delete('/menu', function(req, res, next) {
        req.checkBody('name', 'Please specify a name').notEmpty()
        var errors = req.validationErrors()
        if (errors) return next(errors)
        req.menu.removeOne({name: req.body.name.capitalize()}, function(err) {
            if (err) return next(err)
            return res.end()
        })
    })

    app.listen(5000)
    console.log("Listening on: localhost:5000")
})

