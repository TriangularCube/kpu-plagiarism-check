const w2v = require( './w2v' );
const euDistance = require( 'euclidean-distance' );

const documentIterator = require( '../documentIterator' );


const threshold = 1; // Complete placeholder value


module.exports.rwmd = function rwmd( doc ){

    // Make new document iterator
    let iter = new documentIterator();

    let output = {
        similarDocs: []
    };

    // Keep running through all documents from iterator
    while( iter.hasNext() ){

        // Pull next document
        let target = iter.next();

        // Running Total of transport distance
        let runningTotalDistance = 0;

        doc.forEach( ( element ) => {

            // Lowest cost for sentence
            let sentenceLowest = NaN;

            target.forEach( ( targetElement ) => {

                let dist = sentenceDistance( element, targetElement );

                if( isNaN( sentenceLowest ) || dist < sentenceLowest ){
                    sentenceLowest = dist;
                }

            });

            runningTotalDistance += sentenceLowest;

        });


        // If total distance greater than some threshold
        if( runningTotalDistance >= threshold ){

            // Add to output array
            output.similarDocs.push( { distance: runningTotalDistance, doc: target } );

        }

    }

    // Return all similar docs found
    return output;

};

// Find distance of two sentences
module.exports.sentence = sentenceDistance;

function sentenceDistance( sen1, sen2 ){

    // get bag of words
    let bow1 = prep( sen1 );
    let bow2 = prep( sen2 );


    // Start with Bag 1
    let bow1RunningTotal = 0;

    // iterate over Bag 1
    for( let w1 of bow1 ){

        // Cache vector for word
        let vec = w2v.getVector( w1[0] );

        // If the vector is null, log it and move on
        if( vec == null ){
            console.log( `The word ${w1[0]} is not in the vector space` );
            continue;
        }

        // Init lowest distance
        let lowestDistance = NaN;

        // for every word in sentence 1, go over sentence 2
        for( let w2 of bow2 ){

            let vec2 = w2v.getVector( w2[0] );

            // If the vector is null, log it and move on
            if( vec2 == null ){
                console.log( `The word ${w2[0]} is not in the vector space` );
                continue;
            }

            /**
             * Calculate the Euclidean Distance, multiply by weight of w1
             * @type {number}
             */
            let distance = euDistance( vec, vec2 ) * w1[1];

            // Replace if need be
            if( isNaN( lowestDistance ) || distance < lowestDistance ){
                lowestDistance = distance;
            }

        }

        // Sanity Check
        if( isNaN( lowestDistance ) ){
            console.log( `Something went wrong with word distance of ${w1[0]}`)
        } else {

            bow1RunningTotal += lowestDistance;

            console.log( `Lowest Distance for ${w1[0]} is ${lowestDistance}` );

        }

    }

    console.log( `Total Distance for Bag of Words 1 is ${ bow1RunningTotal }` );

    console.log( '\n' );


    // Find reverse
    let bow2RunningTotal = 0;

    for( let w2 of bow2 ){

        // Cache Vector
        let vec = w2v.getVector( w2[0] );

        // If the vector is null, log it and move on
        if( vec == null ){
            console.log( `The word ${w2[0]} is not in the vector space` );
            continue;
        }

        let lowestDistance = NaN;

        // Iterate through bag 1
        for( let w1 of bow1 ){

            let vec2 = w2v.getVector( w1[0] );

            // If the vector is null, log it and move on
            if( vec2 == null ){
                console.log( `The word ${w1[0]} is not in the vector space` );
                continue;
            }

            /**
             * Since we're still looking for flow from Bag 1,
             * we still calculate Euclidean Distance and multiply by weight of w1
             * @type {number}
             */
            let distance = euDistance( vec, vec2 ) * w1[1];

            // Replace if need be
            if( isNaN( lowestDistance ) || distance < lowestDistance ){
                lowestDistance = distance;
            }

        }

        // Sanity Check
        if( isNaN( lowestDistance ) ){
            console.log( `Something went wrong with the word distance of ${w2[0]}` );
        } else {

            bow2RunningTotal += lowestDistance;

            console.log( `Lowest Distance for ${w2[0]} is ${lowestDistance}` );

        }

    }

    console.log( `Total Distance for Bag of Words 2 is ${ bow2RunningTotal }`);

    console.log( '\n' );

    // Normalize score
    let score = Math.max( bow1RunningTotal, bow2RunningTotal );

    console.log( `Normalized distance is ${ score }` );

    return score;

}

// Prep sentences into Bag of Words in a Map
function prep( sentence ){

    // Split the sentence
    let arr = sentence.split( " " );

    // Map frequency of words
    let freq = new Map();

    for( let word of arr ){
        if( freq.has( word ) ){
            freq.set( word, freq.get( word ) + 1 );
        } else {
            freq.set( word, 1 );
        }
    }


    // Generate weights
    let res = new Map();
    for( let word of freq ){
        res.set( word[0], word[1] / arr.length );
    }


    return res;

}