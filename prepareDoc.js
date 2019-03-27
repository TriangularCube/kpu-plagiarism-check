// an array of common words.
const common = "the, it is, we all, a, an, by, to, you, me, he, she, they, we, how, it, i, are, to, for, of"; 

/**
* This function takes the content of a file as input. 
* Then it compares the file doc with common words array.
* It will remove any common words in file doc.
* @ Input: file // content of a file
* @ Output: uncommonArr // A 2D array.
*/

function prepareDoc(filedoc) {
    var  commonArr = [];
    var  uncommonArr = [];

    commonArr = sentenceArray(file); // store file content into a 2D array.


    //removeComentWords(commonArr); 
    for(i = 0; i < commonArr.length(); i++)
    {
        uncommonArr[i] = removeComentWords(commonArr[i]); 
    }

    return uncommonArr; // return the prepared file content as a 2D array
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
function sentenceArray(filedoc) 
{
    var sArray = [];
    var temp;
    var i = 0; // row number
    var j = 0; // col number
    while(filedoc.hasNext()) // Go through the content of the file
    {
        temp = filedoc.next();
        sArray[i][j] = temp; 

        // Each row of the sArray is a sentence.
        if( temp == "?" || temp == "." || temp == "!")
        {
            i++; // move to next row at the end of each sentence
            j= 0; // reset col number to 0 at the end of each sentence
        }
        else
        {
           
            j++;
            
        }
    }
    return sArray;
}




/**
* This function takes the file doc as an array. 
* Then it compares the file doc with common words array.
* It will remove any common words in file doc.
* @ Input: filedoc[][], common[]
* @ Output: uncommonArr /1D array, contains strings
*/
function removeComentWords(filedoc) {
    // an array of common words.
    const common = "the, it is, we all, a, an, by, to, you, me, he, she, they, we, how, it, i, are, to, for, of"; 

    var wordArr = filedoc.match(/\w+/g),
        commonObj = {},
        uncommonArr = [],
        word, i;

    common = common.split(' ');
    for ( i = 0; i < common.length; i++ ) {
        commonObj[ common[i].trim() ] = true;
    }

    for ( i = 0; i < wordArr.length; i++ ) {
        word = wordArr[i].trim().toLowerCase(); //low case
        if ( !commonObj[word] ) {
            uncommonArr.push(word);
        }
    }
    uncommonArr = toString(uncommonArr);
    return uncommonArr; // return the prepared file array.
}

/** This function will change uncomonArr 2D array into an array of strings.
    Format: {string1, string2,string3,...}
    input: 2D array
    output 1D array
*/
function toString(uncommonArr){
    var sArray = uncommonArr;
    var temp = [];
    for(i = 0; i < sArray.length; i++)
    {   
        temp[i] = '';
        for(j = 0; j <sArray[i].length; j ++)
        {
            temp[i] = temp[i] + ' ' + sArray[i][j];
        }
    }
    return temp;
}














