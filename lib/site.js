const express = require('express');

const auth = require('./auth');

/*
Deploy list of documents.

* docs - Array.
    * name - String. Name of document.
    * path - String. Path to document directory.
* credentials - Object.
    * user - String. Basic authentication by user and password.
    * password - String.
* begin_port - Number. Firt port which listen. Other side listen on
  begin_port + i.
*/
async function listen(docs, credentials, begin_port) {
    let sites = [];

    for (let i = 0; i < docs.length; ++i) {
        let site = await deploy(docs[i], credentials, begin_port + i);

        sites.push(site);
    }

    return sites;
}

async function deploy(doc, credentials, port) {
    return new Promise((resolve, reject) => {
        try {
            let app = express();
            let auth_middleware = auth.create(credentials);

            app.use(auth_middleware);
            app.use(express.static(doc.path));

            let service = app.listen(port, () => {
                let addr = service.address();

                resolve({
                    name: doc.name,
                    license: doc.license,
                    author: doc.author,
                    version: doc.version,

                    address: addr,
                    url: `http://localhost:${addr.port}`
                });
            });
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    listen: listen
};
