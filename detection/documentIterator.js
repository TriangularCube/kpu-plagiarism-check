module.exports = class documentIterator{

    constructor(){
        // TODO Connect to DB

        // TODO Set pointer
        //this.pointer = 0; // or something
        //this.maxPointer = db.entries; // Get from DB
    }

    hasNext(){
        // TODO Should return true if DB has more documents

        // return this.pointer < this.maxPointer - 1; // Not real time.
    }

    next(){
        // TODO Return the next document
    }

};
