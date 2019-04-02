
var fs = require('fs');
/** This function requires filename.
    This function will store the content of a file into an array.
    @Input: filename
    @Output: filedoc // the content of file in array format.
*/

module.exports = function extractwrod(filename)
{

    let filedoc = [];
    let res = fs.readFileSync(filename);

    filedoc = res.toString().split('\n');

    for(i in filedoc) {
        console.log(filedoc[i]); // you can comman this out.
    }

    return filedoc; // an array
};
