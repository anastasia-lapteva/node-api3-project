const express = require('express');
const {
    validateUserId,
    validateUser,
    validatePost
} = require('../middleware/middleware.js');

const User = require('./users-model.js');
const Post = require('../posts/posts-model.js');

const router = express.Router();

router.get('/', (req, res, next) =>
{
    User.get()
        .then(users =>
        {
            res.json(users);
        })
        .catch(next);
});

router.get('/:id', validateUserId, (req, res) =>
{
    res.json(req.user);
});

router.post('/', validateUser, (req, res, next) =>
{
    User.insert({ name: req.name })
        .then(newUser =>
        {
            res.status(201).json(newUser);
        })
        .catch(next);
});

router.put('/:id', validateUserId, validateUser, (req, res, next) =>
{
    User.update(req.params.id, { name: req.name })
        .then(updatedUser =>
        {
            res.json(updatedUser);
        })
        .catch(next);
});

router.delete('/:id', validateUserId, (req, res) =>
{
    // RETURN THE FRESHLY DELETED USER OBJECT
    // this needs a middleware to verify user id
    console.log(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) =>
{
    // RETURN THE ARRAY OF USER POSTS
    // this needs a middleware to verify user id
    console.log(req.user);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) =>
{
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    console.log(req.user);
    console.log(req.text);
});

router.use((err, req, res, next) =>
{
    res.status(err.status || 500).json({
        customMessage: 'bad things happened',
        message: err.message,
        stack: err.stack
    });
});

module.exports = router;