var debug = require('debug')('metalsmith-models');

var fileCount = 0;
module.exports = function(opts) {

  var dir = opts.directory || 'models';

  return function(files, metalsmith, done) {
    fileCount = 0;
    Object.keys(files).forEach(function(file) {

      var filePath;
      debug('stringifying file: %s', file);
      var data = files[file];

      if (typeof data.model === 'string') {
        filePath = metalsmith.path(dir, data.model) + '.json';
        readFile(filePath, metalsmith, done, function(err, res) {
          try {
            data.model = JSON.parse(res ? res.contents : {});
          } catch (e) {
            throw new Error('Error loading data for file ' + file + '\n\n' + err);
          }
        });

      } else if (typeof data.model === 'object') {
        Object.keys(data.model).forEach(function(key) {
          filePath = metalsmith.path(dir, data.model[key]) + '.json';

          readFile(filePath, metalsmith, done, function(err, res) {
            try {
              data.model[key] = JSON.parse(res ? res.contents : {});
            } catch (e) {
              throw new Error('Error loading data for file ' + file + '\n\n' + err);
            }
          });
        });
      }
    });
  };
}

function readFile(path, metalsmith, done, callback) {
  fileCount++;
  metalsmith.readFile(path, function(err, res) {
    --fileCount;
    callback(err, res);
    if (fileCount == 0)
      done();
  });
}
