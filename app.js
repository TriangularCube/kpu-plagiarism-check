
let w2v = require( './detection/rwmd/w2v' );

let extract = require( './detection/extractword' );
let prep = require( './detection/prepareDoc' );

let detect = require( './detection/detect' );

let file1 = prep( extract( './test1.txt' ) );
let file2 = prep( extract( './test2.txt' ) );


console.time( 'test 1' );

console.log( detect( file1 ) );

console.timeEnd( 'test 1' );



console.time( 'test 2' );

console.log( detect( file2 ) );

console.timeEnd( 'test 2' );