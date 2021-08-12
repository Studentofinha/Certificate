const express = require('express');
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');
const post = require('../models/post');
const router = express.Router()


// Adding posts
router.post('', checkAuth, (req, res, next) => {
    console.log(req.user.role);
    if (req.user.role === 'user') {
        return res.status(401).json({
            message: 'San buni qilomiysan'
        })
    }
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        courseName: req.body.courseName,
        comment: req.body.comment,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    })
    console.log(post)
    post.save().then(result => {
        res.status(201).json({
            message: "Post added successfully",
            postId: createdPost._id,

        })
    }).catch(error => {
        res.status(500).json({
            message: "Couldnot add the post"
        })
    })

})

// Updating post
router.put('/:id', checkAuth, (req, res, next) => {

    if (req.user.role === 'user') {
        return res.status(403).json({
            message: 'San buni qilomiysan'
        })
    }

    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        // creator: req.userData.userId,
        courseName: req.body.courseName,
        comment: req.body.comment,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        console.log(result)

        res.status(200).json({
            message: "editing done succesfully"
        })
    }).catch(error => {
        res.status(500).json({
            message: "Couldnot update the post"
        })
    })
})


router.get('', function(req, res, next) {


    Post.find({
        isDeleted: false
    }).then(documents => {
        console.log(documents);
        res.status(200).json({

            message: 'Posts fetch succesfully',
            posts: documents
        });
    }).catch(error => {
        res.status(500).json({
            message: "Fetching posts failed"
        })
    })
});


router.get('/:id', (req, res, next) => {

    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: "Post not found"
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Creating a post failed"
        })
    })
})

//Deleting post
router.patch('/:id', checkAuth, (req, res, next) => {

    console.log(req.user);
    if (req.user.role === 'user') {
        return res.status(403).json({
            message: 'San buni qilomiysan'
        })
    }

    console.log(req.params.id);

    Post.updateOne({ _id: req.params.id, isDeleted: false }, { isDeleted: true }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Deletion successful!" });

        console.log(result)
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Deleting posts failed"
        })
    })

})


//Certificate

// router.get('/certificate/:id', (req, res, next) => {

//     Post.findById(req.params.id)
//         .then(post => {
//             if (!post) {
//                 return res.status(404).json({
//                     message: "Certificate not found with id " + req.params.id

//                 });
//             }
//             res.status(200).json(post)
//         }).catch(err => {
//             if (post.kind === 'ObjectId') {
//                 return res.status(404).json({
//                     message: "Certificate not found with id " + req.params.id
//                 })
//             }
//             return res.status(500).send({
//                 message: "Error retrieving certificate with id " + req.params.id

//             });
//         });

// })
module.exports = router;
