const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comments} = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        }
    })
    .then(dbData => {
        const posts = dbData.map(post => post.get({ plain: true }));
        res.render('dashboard', {posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


router.get('/newpost', (req, res) => {
    res.render('new-post');
})


module.exports = router;