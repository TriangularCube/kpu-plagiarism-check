const router = require( 'express' ).Router();


router.get( '/', function( req, res ){

    res.end( 'Hello World!' );

});

module.exports = router;