'use strict';

var BaseService = require('./service');
var inherits = require('util').inherits;
var fs = require('fs');

var InsightDigiAssetUI = function(options) {
  BaseService.call(this, options);
  if (typeof options.apiPrefix !== 'undefined') {
    this.apiPrefix = options.apiPrefix;
  } else {
    this.apiPrefix = 'insight-digibyte-api';
  }
  if (typeof options.routePrefix !== 'undefined') {
    this.routePrefix = options.routePrefix;
  } else {
    this.routePrefix = 'insight';
  }
};

InsightDigiAssetUI.dependencies = ['insight-digibyte-api'];

inherits(InsightDigiAssetUI, BaseService);

InsightDigiAssetUI.prototype.start = function(callback) {
  this.indexFile = this.filterIndexHTML(fs.readFileSync(__dirname + '/../public/index.html', {encoding: 'utf8'}));
  setImmediate(callback);
};

InsightDigiAssetUI.prototype.getRoutePrefix = function() {
  return this.routePrefix;
};

InsightDigiAssetUI.prototype.setupRoutes = function(app, express) {
  var self = this;

  app.use('/', function(req, res, next){
    if (req.headers.accept && req.headers.accept.indexOf('text/html') !== -1 &&
      req.headers["X-Requested-With"] !== 'XMLHttpRequest'
    ) {
      res.setHeader('Content-Type', 'text/html');
      res.send(self.indexFile);
    } else {
      express.static(__dirname + '/../public')(req, res, next);
    }
  });
};

InsightDigiAssetUI.prototype.filterIndexHTML = function(data) {
  var transformed = data
    .replace(/apiPrefix = '\/api'/, "apiPrefix = '/" + this.apiPrefix + "'");

  if (this.routePrefix) {
    transformed = transformed.replace(/<base href=\"\/\"/, '<base href="/' + this.routePrefix + '/"');
  }

  return transformed;
};

module.exports = InsightDigiAssetUI;
