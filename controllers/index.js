const router = require('express').Router();

// file dependecny
const homepageRoutes = require('./homepage-routes');
const apiRoutes = require('./api/index');

// middleware.
router.use('/', homepageRoutes)
router.use('/api', apiRoutes);
//

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;