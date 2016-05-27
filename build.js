var metadata = require('geojson-xyz-data'),
  _ = require('lodash'),
  path = require('path'),
  prettyBytes = require('pretty-bytes'),
  fs = require('fs');

var sources = [];

for (var s in metadata) {
  metadata[s].files.forEach(function (file) {
    file.url = file.url.replace('http://geojson.xyz/', 'https://d2ad6b4ur7yvpq.cloudfront.net/');
  });
  sources.push(metadata[s]);
}

function cleanName(text) {
  return text
    .replace(/ne_(\d+)m_/, '')
    .replace(/\.geojson/, '')
    .replace(/_/g, ' ');
}

function geojsonio(text) {
  return 'http://geojson.io/#data=data:text/x-url,' + encodeURIComponent(text);
}

function basename(text) {
  return path.basename(text);
}

function resolution(text) {
  return text.match(/ne_(\d+)/)[1];
}

fs.writeFileSync('index.html',
  _.template(fs.readFileSync('./template._', 'utf8'))({
    sources: sources,
    resolution: resolution,
    prettyBytes: prettyBytes,
    geojsonio: geojsonio,
    basename: basename,
    cleanName: cleanName
  }));
