var util = require('util'),
    Writable = require('stream').Writable,
    jsonquest = require('jsonquest');

var ElasticStream = module.exports = function (options) {
  if (!(this instanceof ElasticStream)) {
    return new ElasticStream(options);
  }

  this.host = options.host || 'localhost';
  this.port = options.port || 9200;
  this.index = options.index;
  this.type = options.type;

  Writable.call(this, { objectMode: true });
};
util.inherits(ElasticStream, Writable);

ElasticStream.prototype._write = function (chunk, encoding, callback) {
  var index = this.index || chunk.index,
      type = this.type || chunk.type;

  jsonquest({
    host: this.host,
    port: this.port,
    method: 'PUT',
    path: '/' + [this.index || chunk.index, this.type || chunk.type, chunk.id].join('/'),
    body: chunk.doc
  }, function (err, res, body) {
    if (err) {
      return callback(err);
    }

    if (!(res.statusCode >= 200 && res.statusCode < 300)) {
      err = new Error('elasticsearch error (' + res.statusCode.toString() + ')');
      err.statusCode = res.statusCode;
      return callback(err);
    }

    callback();
  });
};
