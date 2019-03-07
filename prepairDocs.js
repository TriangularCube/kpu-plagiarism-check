/*
* check if the file doc is upload in memory.
* if not, return an error message.
*/




// an array of common words.
var common="the, it is, we all, a, an, by, to, you, me, he, she, they, we, how, it, i, are, to, for, of"; 

/**
* This function takes the file doc as an array. 
* Then it compares the file doc with common words array.
* It will remove any common words in file doc.
* @ Input: filedoc[], common[]
* @ Output: uncommonArr 
*/
function getUncommon(filedoc, common) {
    var wordArr = sentence.match(/\w+/g),
        commonObj = {},
        uncommonArr = [],
        word, i;

    common = common.split(',');
    for ( i = 0; i < common.length; i++ ) {
        commonObj[ common[i].trim() ] = true;
    }

    for ( i = 0; i < wordArr.length; i++ ) {
        word = wordArr[i].trim().toLowerCase(); //low case
        if ( !commonObj[word] ) {
            uncommonArr.push(word);
        }
    }

    return uncommonArr; // return the prepared file
}