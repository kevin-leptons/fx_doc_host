const auth = require('basic-auth');

function create(credentials) {
    return function middleware(request, response, next) {
        let req_user = auth(request);
        let user = credentials.user;
        let pass = credentials.password;

        if (!req_user || req_user.name !== user || req_user.pass !== pass) {
            response.set('WWW-Authenticate', 'Basic realm="example"');
            return response.status(401).send();
        }

        return next();
    };
}

module.exports = {
    create: create
};
