let extract = require( './extractword' );
let prepare = require( './prepareDoc' );


module.exports = class documentIterator{

    constructor(){
        // TODO Connect to DB

        // TODO Set pointer
        //this.pointer = 0; // or something
        //this.maxPointer = db.entries; // Get from DB

        this.read = false;
    }

    hasNext(){
        // TODO Should return true if DB has more documents

        return !this.read;
    }

    next(){
        // TODO Return the next document

        let file = extract( './testCompare1.txt' );
        let prep = prepare( file );

        this.read = true;
        return prep;
    }

};
