const {Users, User} = require('../../models');
const router = require('express').Router();

//get all
router.get('/', (req, res) => {
    User.findAll()
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// get 1
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbData => {
        if (!dbData) {
            res.status(400).json({ message: 'No users at this designated id' });
            return;
        }

        res.json(dbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// new user
router.post('/', (req, res) => {
    User.create({
        alias: req.body.alias,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbData => {
        req.session.save(() => {
            req.session.user_id = dbData.id;
            req.session.alias = dbData.alias;
            req.session.loggedIn = true;

            res.json(dbData)
        })
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
});

// Login
router.get('/login', (req, res) => {
    
})


// Edit
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbData => {
        if (!dbData[0]) {
            res.status(400).json({ message: 'error' });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


// Delete
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbData => {
        if (!dbData) {
            res.status(400).json({ message: 'no users under this id' });
            return;
        }

        res.json(dbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;