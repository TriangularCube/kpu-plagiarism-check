const iterator = require( '../documentIterator' );
const documents = new iterator();


module.exports = function process( inputPaper ){

    // Input paper should be in Array of Sentences


    /*while( documents.hasNext() ){

        // TODO

    }*/
	
	test();

};


function levenshtein( a, b ){

    let matrix = [];

    let i;
    for( i = 0; i <= b.length; i++ ){
        matrix[i] = [i];
    }

    let j;
    for( j = 0; j <= a.length; j++ ){
        matrix[0][j] = j;
    }


    for( i = 1; i <= b.length; i++ ){
        for( j = 1; j <= a.length; j++ ){

            if( b.charAt( i - 1 ) === a.charAt( j -1 ) ){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                    matrix[i][j-1] + 1, // insertion
                    matrix[i-1][j] + 1 // deletion
                )
            }

        }
    }

    return matrix[b.length][a.length];

}


function test(){
	// DEBUG CODE FOR NOW
    let a = "The universality of reality is a wonder to behold";
    let b = "There is no way in hell I'm going to record in this dump";

    let distance = levenshtein( a, b );

    let max = Math.max( a.length, b.length );

    let res = distance / max;

    console.log( res );
}
