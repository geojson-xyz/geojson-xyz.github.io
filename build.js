var metadata = require('geojson-xyz-data'),
  Handlebars = require('handlebars'),
  prettyBytes = require('pretty-bytes'),
  fs = require('fs');

for (var k in metadata) {
  for (var v in metadata[k].files) {
    for (var i in metadata[k].files[v]) {
      for (var f = 0; f < metadata[k].files[v][i].length; f++) {
        metadata[k].files[v][i][f] = {
          url: metadata[k].meta.data + metadata[k].files[v][i][f],
          name: metadata[k].files[v][i][f],
          size: prettyBytes(metadata[k].sizes[metadata[k].files[v][i][f]]),
          summary: metadata[k].summaries[metadata[k].files[v][i][f]],
          geojsonio: 'http://geojson.io/#data=data:text/x-url,' +
            encodeURIComponent(metadata[k].meta.data + metadata[k].files[v][i][f])
        };
      }
    }
  }
}

fs.writeFileSync('index.html',
  Handlebars.compile(fs.readFileSync('./template.hbs', 'utf8'))({
    metadata: metadata
  }));
