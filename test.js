// Import sqlite3
const sqlite3 = require('sqlite3')

// Make map database
let db = new sqlite3.Database("./map.db", (err) => {
    if (err) {
        console.log('Error when creating the database', err)
    } else {
        console.log('Database created!')
        // Function that creates table
        createTable()
    }
})

// Creates map table
const createTable = () => {
    console.log("Making map table");
    db.run("CREATE TABLE IF NOT EXISTS map(type TEXT, mass INTEGER, xcoor INTEGER, ycoor INTEGER)");
}

canvasWidth = 100;
canvasHeight = 100;
