
var fs = require('fs');
/** This function requires filename.
    This function will store the content of a file into an array.
    @Input: filename
    @Output: filedoc // the content of file in array format.
*/

module.exports = function extractwrod(filename)
{

    let filedoc = [];
    fs.readFile(filename, function(err, data) {
      if(err) throw err;

      // store the content of a file into an array.
      filedoc = data.toString().split("\n");
      for(i in filedoc) {
          console.log(filedoc[i]); // you can comman this out.
      }
    });
    return filedoc; // an array
};