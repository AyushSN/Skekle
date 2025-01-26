const mysql = require('mysql2/promise');
require('dotenv').config();

// async function getUsersWithoutDfId() {
//     const conn = await mysql.createConnection({
//         host: process.env.HOST,
//         user: process.env.USER,
//         password: process.env.PASSWORD,
//         database: process.env.DATABASE
//     })
//     return new Promise((resolve, reject) => {
//         console.log('andar')
//         conn.query('SELECT * FROM user WHERE df_id IS NULL', (err, results) => {
//             if (err) {
//                 console.log('error')
//                 reject(err);
//                     return;
//             }
//             else{
//                 console.log('results')
//                 resolve(results);
//             }
//         }); 
//     });
// }

// getUsersWithoutDfId().then(data => console.log(data)).catch(err => console.error(err));

async function mysqlConnection() {
    let connection;
    try{
        connection = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });
    let database = process.env.DATABASE;
    await connection.query('SELECT 1');
    console.log('MySQL connection established successfully');
        return {connection,database}
}catch(error){
    console.error('Error creating MySQL connection:', error.message);
    return null;

}}

mysqlConnection()