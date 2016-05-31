var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.get('/contactlist', function (req, res) {

	db.contactlist.find(function (err, docs) {
            console.log(docs);
            res.json(docs);
	});
});

app.post('/login', function (req,res) {
    console.log(req.body);
    db.contactlist.findOne({name: req.body.name}, function (err, user) {
         // res.json(user);
        if (user){
            if (req.body.password == user.password){
                return res.json({success: true});
            }
            else {
                return res.json({success: false});
            }
        }
        else {
            return res.json({success: false});
        }
        });
});

app.post('/contactlist', function (req, res) {
    console.log(req.body);
    if (req.body.name && req.body.email && req.body.password && req.body.number){
        db.contactlist.findOne({name: req.body.name}, function (err, user) {
            if (err) {
                console.log("error", err);
            }
            if (!user) {
                db.contactlist.insert(req.body, function (err, doc) {
                    res.json(doc);
                });
            }
            else {
                res.json("this name already exist");
            }
        });
    };

});

    app.delete('/contactlist/:id', function (req ,res) {
        var id = req.params.id;
        console.log(id);
        db.contactlist.remove({_id: mongojs.ObjectID(id)}, function (err,doc) {
            res.json(doc);
        });
    });

    app.get('/contactlist/:id', function (req, res) {
        var id = req.params.id;
        console.log(id);
        db.contactlist.findOne({_id: mongojs.ObjectID(id)}, function (err, doc) {
            res.json(doc);
        });
    });

    app.put('/contactlist/:id', function (req, res) {
        var id = req.params.id;
        console.log(req.body.name);
        db.contactlist.findAndModify({query: {_id: mongojs.ObjectID(id)},
            update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
            new: true}, function (err, doc) {
                res.json(doc);
        });
});

app.listen(3000);
console.log("Server running on port 3000");





// var http = require('http');
// var static = require('node-static');
// var file = new static.Server('.');

// http.createServer(function(req, res) {
//   file.serve(req, res);
// }).listen(8080);

// console.log('Server running on port 8080');