const url = require('url');
const path = require('path');
const fs = require('fs');

const shell = require('shelljs');
const yaml = require('js-yaml');

/*
Build document from repository.

* conf - Object.
    * tmp_dir - String. Directory which is uses to store repository.
    * dest_dir - String. Directory which is uses to store build results.
* repo_conf - Object.
    * url - String. URI to clone repository.

return Object
    * name - String. Name of document.
    * path - String. Path to document directory
*/
function build(conf, repo_conf) {
    let repo_name = git_repo_name(repo_conf.url);
    let repo_dir = path.join(conf.tmp_dir, repo_name);
    let src_doc_dir = path.join(repo_dir, repo_conf.doc);
    let dest_doc_dir = path.join(conf.dest_dir, repo_name);

    shell.mkdir('-p', conf.tmp_dir);
    if (conf.update)
        update_repo(repo_conf.url, repo_conf.branch, repo_dir);
    if (conf.build)
        build_doc(src_doc_dir, dest_doc_dir);

    let doc_info = read_doc_info(src_doc_dir);

    doc_info.path = dest_doc_dir;
    return doc_info;
}

function update_repo(url, branch, dest) {
    if (fs.existsSync(dest)) {
        shell.cd(dest);
        shell.exec(`git pull origin ${branch}`);
    } else {
        let cmd = [
            'git', 'clone', '--single-branch',
            '-b', branch,
            url, dest
        ];
        shell.exec(cmd.join(' '));
    }
}

function build_doc(src, dest) {
    shell.exec(`rm -rf ${dest}`);
    shell.exec(`fx-doc build ${src} ${dest} --no-pdf`);
}

function git_repo_name(repo_url) {
    let parsed = url.parse(repo_url);
    let pathname = parsed.pathname;
    let extension = path.extname(pathname);

    return path.basename(pathname, extension);
}

function read_doc_info(dir) {
    let info_path = path.join(dir, 'index.yaml');
    let raw_info = fs.readFileSync(info_path);

    return yaml.safeLoad(raw_info);
}

module.exports = {
    build: build
};
