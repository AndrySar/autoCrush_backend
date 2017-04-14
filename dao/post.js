/**
 * Created by user on 07.04.17.
 */
var Post = require('../models/post');


var post = {

    getAll: function (req, res) {
        console.log("Work getAll");
        Post.find(function (err,posts) {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({
                    "status": 500,
                    "message": err.message
                });
            } else {
                console.log(posts);
                res.json(posts);
            }
        });

    },

    creat: function(req, res) {
        console.log('Hello World');
        console.log(req.body.country);
        console.log(req.body.address);
        console.log(req.body.Date);
        console.log(req.body.cars);
        console.log(req.body.urls);

        var newPost = new Post({
            country: req.body.country,
            address: req.body.address,
            date: req.body.Date,
            //urls: req.body.urls,
            // cars: req.body.cars
        });

        req.body.urls.forEach(function(item, i, arr) {
            newPost.urls.push(item);
        });

        req.body.cars.forEach(function(item, i, arr) {
            newPost.cars.push(item);
        });

        newPost.save(function (err, newPost) {
            if (err) {
                res.status(500);
                res.json({
                    "status": 500,
                    "message": "Invalid Save"
                });
                return console.error(err.message);
            } else {
                res.status(200);
                res.json({
                    "status": 200,
                    "message": "Post created"
                });
            }
        });

        // var newUrls = new Image({
        //     url: req.body.urls
        // });


        // urls: req.body.urls,
        // cars: req.body.cars
    }

};

module.exports = post;
