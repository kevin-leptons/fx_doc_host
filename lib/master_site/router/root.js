const url = require('url');
const {Router} = require('express');

const router = Router();

router.get('/', function(req, res, next) {
    res.render('root', {
        title: req._opts.title,
        sites: req._opts.sites,
        org: req._opts.org
    });
});

module.exports = router;
