const mysql = require('mysql2');

// constants
let dbName = 'e_commerce_prj';
let tableUserStr = 'users';
let tableproductsStr = 'products';

// functions

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'e_commerce_prj',
});

module.exports = connection;

function connect() {
    connection.connect();
    if (connection.err) {
        consolelog('not connected');
    } else {
        console.log('connected...');
        try {
            connection.query('USE e_commerce_prj'); //select the database
            console.log(`using db ${dbName}`);
        } catch (err) {
            // error selecting e_commerce_prj database
            console.log(`Error selecting database ${dbName}`);
        }
    }
}

connect();

function disconnect() {
    connection.end();
    console.log('disconnecting...');
}

//
//
//
function getUsers( callback) {
    //console.log (connection.query('show tables'));
    connection.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        var rows = JSON.parse(JSON.stringify(result));
        return callback(rows);
    });
}

//Example how to call this query  (TESTED)
/*
getUsers( (res) => {
    console.log("get users from db...");
    console.log(res);
});
*/

//
//
//
function getLoginInfo(username, callback) {
    connection.query(`SELECT userName, password FROM users where userName = '${username}'`,  function (err, result, fields) {
            if (err) throw err;
            var rows = JSON.parse(JSON.stringify(result));
            // to be able to return with callback function
            return callback(rows);
    });
    
}

// Example on how to use these queries (TESTED)
/*
getLoginInfo('fd',  (res) => {
        console.log("login users ------");
        console.log(res);
});
*/

function verifyLogin(userName, password, callback) {
    connection.query(`SELECT userName, password FROM users WHERE userName = '${userName}'`, function (err, result, fields) {
            let retVal = false;
            if (err) throw err;
            if (( userName === result[0].userName ) && ( password === result[0].password )) {
                retVal = true;
            }
            var rows = JSON.parse(JSON.stringify(result));
            // to be able to return with callback function
            return callback(retVal);
        });
}

// Example on how to use these queries (TESTED)
/*
verifyLogin('fd', 'diaz',
    function (res) {
        if (res) {
            console.log("user logged in..." );
        }      
    });
*/

function getproducts(callback) {
    connection.query(`SELECT * FROM products`, function (err, result, fields) {

        return callback(result);
    });
}

// Example on how to use these queries (TESTED)
/*
getproducts(
     (res) => {
        console.log("products ------");
        console.log(res);
});
*/

//
//
//
function addProduct(product, callback) { // add a new product to the inventory
    connection.query(`SELECT * FROM products`, function (err, result, fields) {

        return callback(result);
    });
}


// Example on how to use these queries 
/*
addProduct(product,
     (res) => {
        console.log("product added ------");
        console.log(res);
});
*/



//
//
//
function updateProduct(product, callback) { // changing the price , quantity, etc
    connection.query(`UPDATE * FROM products WHERE productID = ${product.productID}`, function (err, result, fields) {
        if (err) throw err;
        // update product in database

        return callback(result);
    });
}

// Example on how to use these queries (TODO)
/*
updateProduct(product,
     (res) => {
        console.log("product updated ------");
        console.log(res);
});
*/
