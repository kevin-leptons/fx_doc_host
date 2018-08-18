#!/usr/bin/env node

const path = require('path');
const program = require('commander');

const {config, doc, site, master_site} = require('../lib');

program.
    command('start <config_path>').
    option('--no-update', 'Do not pull from repo').
    option('--no-build', 'Do not build document').
    option('--tmp <tmp>', 'Where to store document files').
    option('--port <port>', 'Override listen port of master site').
    action(cli_start);

program.parse(process.argv);

function cli_start(config_path, opts) {
    let tmp_dir = opts.tmp ? path.resolve(opts.tmp) : path.resolve('tmp');

    let dest_conf = {
        tmp_dir: path.join(tmp_dir, 'repo'),
        dest_dir: path.join(tmp_dir, 'dest'),
        update: opts.update,
        build: opts.build
    };

    let conf = config.load(config_path);
    conf.port = opts.port ? parseInt(opts.port) : conf.port;

    cli_start_run(dest_conf, conf).
    then((addr) => {
        console.log(`Master site is serve on http://localhost:${addr.port}`);
    }).
    catch(err => {
        console.log(err);
    });
}

async function cli_start_run(dest_conf, conf) {
    let docs = [];

    for (let i = 0; i < conf.sites.length; ++i) {
        let built_doc = doc.build(dest_conf, conf.sites[i]);

        docs.push(built_doc);
    }

    let sites = await site.listen(docs, conf.auth, conf.port + 1);
    let root_conf = {
        title: conf.title,
        port: conf.port,
        sites: sites,
        org: conf.org
    }

    return await master_site.listen(root_conf);
}
