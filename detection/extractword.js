
var fs = require('fs');
/** This function requires filename.
    This function will store the content of a file into an array.
    @Input: filename
    @Output: filedoc // the content of file in array format.

*/

module.exports = function extractwrod(file)
{

    let filedoc = [];
    let res = fs.readFileSync(file);

    filedoc = res.toString().toLowerCase().split('\n');


    return filedoc.filter(Boolean); // an array
};
