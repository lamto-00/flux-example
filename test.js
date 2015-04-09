require('babel/register');
var Promise = require('bluebird');
var ReactOpt = require('./react/optimized');
var navigateAction = require('fluxible-router').navigateAction;
var contextOpt;
var profiler = require('profiler');


var app = require('./chat-optimized/app');
var fetchrPlugin = app.getPlugin('FetchrPlugin');
fetchrPlugin.registerService(require('./chat-optimized/services/message'));
contextOpt = app.createContext();
contextOpt.executeAction(navigateAction, {
    url: '/'
}, function (err) {
    profiler.resume();
    for(var i=0; i<1; ++i){
        ReactOpt.renderToStaticMarkup(contextOpt.createElement());
    }
    profiler.pause();
});