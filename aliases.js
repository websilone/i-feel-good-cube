var path = require('path');

var utils_aliases = [
    'actions',
    'components',
    'constants',
    'images',
    'layouts',
    'reducers',
    'routes',
    'store',
    'utils',
    'views'
].reduce(function (acc, dir) {
    acc[dir] = path.resolve('src', dir);
    return acc;
}, {});

module.exports = utils_aliases;
