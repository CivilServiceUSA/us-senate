var fs = require('fs');
var csv = require('fast-csv');
var slug = require('slug');

var core = 'source/us-senate.csv';

function toTitleCase(str) {
  if (!str) {
    return '';
  }

  str = str.toString();

  return str.replace(/-/g, ' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

if (fs.existsSync(core)) {
  var stream = fs.createReadStream(core);
  csv.parseStream(stream, {headers : true}).on('data', function(data){
    console.log('!['+ toTitleCase(data.title) + ' '+ data.first_name + ' ' + data.last_name +'](us-senate/images/headshots/128x128/' + slug(data.first_name + ' ' + data.last_name, { lower: true, replacement: '-' }) + '.jpg "'+ toTitleCase(data.title) + ' '+ data.first_name + ' ' + data.last_name +'")');
  });
} else {
  console.log(core + ' not found');
}
