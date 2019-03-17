const iterator = require( './documentIterator' );

const levenshtein = require( './levenshtein/levenshtein' );

function detect( document ){

    const iter = new iterator();

    // TODO process document

    while( iter.hasNext() ){

        let target = iter.next();

        let levScore = levenshtein( document, target );

        // TODO other scoring algorithms

    }

    // TODO return something meaningful

}