const iterator = require( './documentIterator' );

const levenshtein = require( './levenshtein/levenshtein' );
const cosine = require( './cosine/cosineSimilarity' );
const dice = require( './dice/diceSimilarity' );

module.exports = function detect( document ){

    const iter = new iterator();

    // TODO process document

    let score = [];

    while( iter.hasNext() ){

        let target = iter.next();

        let levScore = levenshtein( document, target );

        let cosScore = cosine( [...document], [...target] );

        let diceScore = dice( [...document], [...target] );

        // TODO other scoring algorithms

        score.push( { lev: levScore, cosine: cosScore, dice: diceScore } )

    }

    // TODO return something meaningful

    return score;

};
