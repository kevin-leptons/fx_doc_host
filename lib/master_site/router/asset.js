const path = require('path');
const express = require('express');

const asset_dir = path.join(__dirname, '../asset');

module.exports = express.static(asset_dir);
