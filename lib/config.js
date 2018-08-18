const assert = require('assert');
const path = require('path');
const fs = require('fs');

const yaml = require('js-yaml');

function load(config_path) {
    let raw_config = fs.readFileSync(config_path);
    let config = yaml.safeLoad(raw_config);

    assert(config.title, 'Required "title"');
    config.port = config.port ? config.port : 8080;
    assert(config.auth, 'Required "auth"');
    assert(config.auth.user,  'Required "auth.user"');
    assert(config.auth.password,  'Required "auth.password"');
    assert(config.org,  'Required "org"');
    assert(config.org.name,  'Required "org.name"');
    assert(config.org.url,  'Required "org.url"');
    assert(config.sites, 'Required "sites"');
    config.sites.forEach(site => {
        assert(site.url, 'Required "sites[i].url"');
        site.branch = site.branch ? site.branch : 'master';
        site.doc = site.doc ? site.doc : 'doc';
    });

    return config;
}

module.exports = {
    load: load
};
