var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.js');

var app = express();
var compiler = webpack(config);

// app.use(express.static(path.resolve(__dirname, './dist')));
// app.use('static/', express.static(path.resolve(__dirname, './dist/static')));

app.use(require('webpack-dev-middleware')(compiler, {
    color: true,
    noInfo: true,
    historyApiFallback: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, '0.0.0.0', function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://0.0.0.0:3000');
});
