// an array of common words.
//const common = "the, it is, we all, a, an, by, to, you, me, he, she, they, we, how, it, i, are, to, for, of";

/**
 * This function takes the content of a file as input.
 * Then it compares the file doc with common words array.
 * It will remove any common words in file doc.
 * @ Input: file // content of a file
 * @ Output: uncommonArr // A 2D array.
 */

module.exports = function prepareDoc(filedoc) {
    var  commonArr = [];
    var  uncommonArr = [];

    commonArr = removePunctuation(filedoc); // store file content into array of sentances.

    //console.log( commonArr );

    uncommonArr = removeComentWords(commonArr);
    // for(i = 0; i < commonArr.length; i++)
    // {
    //     uncommonArr[i] = removeComentWords(commonArr[i]);
    // }

    // uncommonArr = toString( uncommonArr );



    console.log(uncommonArr);
    return uncommonArr; // return the prepared file content as a 1!!!!D array
}


/**
 This function will store the word document into an array.
 {
        {Hello!},
        {Today is a, good, day, to, write, codes.},
        {I, hope, you, will, have, fine.}
    }
 Input: filedoc //content of word document.
 @Output: sArray //A 2D array.
 */

function removePunctuation(commonArr){
    //var commonArr = filedoc.toString().toLowerCase().split('.');

    for (var i = 0; i < commonArr.length; i++) {
      var tempSen = commonArr.pop();
      var tempArr = tempSen.toString().split('!');
        tempArr.forEach(function(x){
          if (x !== ""){
            commonArr.push(x.trimLeft());
          }
        });
    }

    for (var i = 0; i < commonArr.length; i++) {
      var tempSen = commonArr.pop();
      var tempArr = tempSen.toString().split('?');
        tempArr.forEach(function(x){
          if (x !== ""){
            commonArr.push(x.trimLeft());
          }
        });
    }

    for (var i = 0; i < commonArr.length; i++) {
      var tempSen = commonArr.pop();
      tempSen = tempSen.toString().replace(/,/g, '');
          if (tempSen !== ""){
            commonArr.push(tempSen.trimLeft());
          }
    }

    return commonArr;
}
/**
 * returns 2d string array looks like:
 * [
 *      ["word", "word", "word", "word"],
 *      ["word", "word", "word", "word"], etc
 * ]

/**
 * This function takes the file doc as an array.
 * Then it compares the file doc with common words array.
 * It will remove any common words in file doc.
 * @ Input: filedoc[][], common[]
 * @ Output: uncommonArr /1D array, contains strings
 */
//

function removeComentWords(commonArr) {
    // an array of common words.
    let common = ["the", "it", "is", "we", "all", "a", "an", "by", "to", "you", "me", "he", "she", "they", "we", "how", "it", "i", "are", "to", "for", "of"];

    for (var x = 0; x < commonArr.length; x++){
        for (var y = 0; y < commonArr[x].length; y++){
            for (var v = 0; v < common.lenth; v++){
                if (common[v] == commonArr[x][y]){
                    delete commonArr[x][y];
                    break;
                }
            }
        }
        //console.log(commonArr);
        //commonArr[x].filter(Boolean).join(' ');
    }

    return commonArr;
}
