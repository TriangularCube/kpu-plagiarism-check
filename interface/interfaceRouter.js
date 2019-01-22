const router = require( 'express' ).Router();


router.get( '/', function( req, res ){

    res.render( 'index', { title: "Plagiarism Checker", message: "This is the home page of the Plagiarism Checker" } );

});

module.exports = router;