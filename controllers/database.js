const mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
   // passwod: '',
    database: 'e_commerce_prj',
});

module.exports = connection;

function connect() {
    console.log(connection.connect());
    
    console.log('connect');
    console.log(connection.query('USE e_commerce_prj')); //select the database 
}

connect();

function getClientNames(){
    console.log (connection.query('DESCRIBE clients'));
}
function getClients(){
  
    connection.query("SELECT * FROM clients", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
}

function login() {
    
}

function getprudoct() {
    
}

function addProduct() {
    
}


function disconnect() {
    connection.end();
    console.log('disconnecting...');
}


disconnect();
