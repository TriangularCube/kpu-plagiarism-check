let w2v = require( 'word2vector' );

console.time( 'load' );

w2v.load( './data/google-vectors.bin' );

console.timeEnd( 'load' );

module.exports = w2v;