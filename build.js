var metadata = require('geojson-xyz-data'),
  path = require('path'),
  Handlebars = require('handlebars'),
  prettyBytes = require('pretty-bytes'),
  fs = require('fs');

Handlebars.registerHelper('clean_name', function(text) {
  return new Handlebars.SafeString(text
    .replace(/ne_(\d+)m_/, '')
    .replace(/\.geojson/, '')
    .replace(/_/g, ' '));
});

Handlebars.registerHelper('geojsonio', function(text) {
  return new Handlebars.SafeString('http://geojson.io/#data=data:text/x-url,' + encodeURIComponent(text));
});

Handlebars.registerHelper('basename', function(text) {
  return new Handlebars.SafeString(path.basename(text));
});

Handlebars.registerHelper('resolution', function(text) {
  return new Handlebars.SafeString(text.match(/ne_(\d+)/)[1]);
});

Handlebars.registerHelper('prettyBytes', function(text) {
  return new Handlebars.SafeString(prettyBytes(text));
});

fs.writeFileSync('index.html',
  Handlebars.compile(fs.readFileSync('./template.hbs', 'utf8'))({
    metadata: metadata
  }));
