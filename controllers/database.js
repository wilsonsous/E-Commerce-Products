const mysql = require('mysql2');
//const { HostNotFoundError } = require('sequelize/types');

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
function getUsers(callback) {
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
    connection.query(`SELECT userName, password FROM users where userName = '${username}'`, function (err, result, fields) {
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
        if ((userName === result[0].userName) && (password === result[0].password)) {
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
function addProduct(product, callback) { // add/update product to the products table

    connection.query(`SELECT * FROM products WHERE name = '${product.name}'`, function (err, result, fields) {
        if (result.length > 0) {
            // item found, update DB( update everything but the product name)
            connection.query(`UPDATE products SET price = ${product.price}, description = '${product.description}', provider1 = '${product.provider1}', provider2 = '${product.provider2}' WHERE name = '${product.name}'`,
                function (err, result, fields) {
                    if (err) {
                        console.log("product update error...");
                    } else {
                        return callback(1); // added to DB
                    }
                });
        } else {
            // item not found, add it to DB
            connection.query(`INSERT INTO products (name, price, description, provider1, provider2) 
                     VALUES ('${product.name}', ${product.price}, '${product.description}', '${product.provider1}', '${product.provider2}') `,
                function (err, result, fields) {
                    if (err) {
                        console.log("product add error...");
                        return callback(-1);
                    } else {
                        return callback(0); // added to DB
                    }
                });
        }

        /* return:
        0: added to DB
        -1: error
        1:  item already found, updated info
        */
       
    });
}


// Example on how to use these queries (TESTED)
/*
let product = { name: "bookbag", price: 30, description: "medium bookbag", provider1: "walmart", provider2: "amazon" };

addProduct(product,
    (res) => {
        switch (res) {
            case -1:
                console.log("product add error ------");
                break;
            case 0:
                console.log("product added ------");
                break;
            case 1:
                console.log("product updated ------");
                break;
        }
    });
*/

//
//
//
function updateInventory(productID, quantity, callback) { // changing the quantity of a product in inventroy
    connection.query(`UPDATE inventory SET quantity = ${quantity} WHERE productID = ${productID}`, function (err, result, fields) {
        if (err) throw err;
        // update product in database

        return callback(result);
    });
}

// Example on how to use these queries (TESTED)
/*
updateInventory(2,20,
     (res) => {
        console.log("product updated ------");
        console.log(res);
});
*/
