const router = require('express').Router();

// file dependecny
const homepageRoutes = require('./homepage-routes');

// middleware.
router.use('/', homepageRoutes)

//

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;