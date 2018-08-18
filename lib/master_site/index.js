const express = require("express");
const fs = require('fs');
const path = require('path');

const router = require('./router');

async function listen(conf) {
    return new Promise((resolve, reject) => {
        try {
            let app = express();

            app.use(config_middleware(conf));
            app.set('views', path.join(__dirname, 'view'));
            app.set('view engine', 'pug');

            app.use('/', router.root);
            app.use('/asset', router.asset);

            let service = app.listen(conf.port, () => {
                resolve(service.address());
            });
        } catch (err) {
            reject(err);
        }
    });
}

function config_middleware(opts) {
    return function middleware(req, res, next) {
        req._opts = opts;
        next();
    }
}

module.exports = {
    listen: listen
};
