const iterator = require( './documentIterator' );

const levenshtein = require( './levenshtein/levenshtein' );

const rwmd = require( './rwmd/rwmd' );

module.exports = function detect( document ){

    const iter = new iterator();

    // TODO process document

    while( iter.hasNext() ){

        let target = iter.next();

        let levScore = levenshtein( document, target );

        let rwmdScore = rwmd( document, target );

        // TODO other scoring algorithms

    }

    // TODO return something meaningful

}