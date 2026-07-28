const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const pool = mysql.createPool({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE,
   waitForConnection: true,
   connectionLimit: 10,
   queueLimit: 0,
}).promise();

(async () => {
   try {
      const connection = await pool.getConnection();
      console.log('Database connected successfully');
   } catch (error) {
      console.error("Couldn't connect to database : ", error.message);
   }
})();

async function getUserById(id) {

   try {
      //Queries the user by id
      const [rows] = await pool.query(
      `
      SELECT * FROM users WHERE id = ?
      `, [id]
      )

      //Throws error if there's no user with informed id
      if (rows.length === 0) {
         console.error(`User with id of ${id} doesn't exist`);
         return null
      }

      //Returns the user if found
      return rows[0];
   
   //Catches query error and throws upstream
   } catch (error) {
      console.log('Failed to get user : ', error);
   }
}

async function getUserByName(name) {

   try {
      //Queries the user by id
      const [rows] = await pool.query(
      `
      SELECT * FROM users WHERE name = ?
      `, [name]
      )

      //Throws error if there's no user with informed id
      if (rows.length === 0) {
         console.error(`User with name of ${name} doesn't exist`);
         return null
      }

      //Returns the user if found
      return rows[0];
   
   //Catches query error and throws upstream
   } catch (error) {
      console.log('Failed to get user : ', error);
   }
}

async function fetchQuery(query) {
   try {
      //Queries the user by id
      const [rows] = await pool.query(query)

      //Throws error if there's no user with informed id
      if (rows.length === 0) {
         console.error(`No result for fetch`);
         return null;
      }

      //Returns the user if found
      return rows[0];
   
   //Catches query error and throws upstream
   } catch (error) {
      throw error
   }
}

async function sendQuery(query) {
   try {
      //Queries the user by id
      await pool.query(query);

   //Catches query error and throws upstream
   } catch (error) {
      throw error;
   }
}

//Promise function
//(async () => {
//   const result = await getUserById(29)
//  console.log(result);
//})();

//getUserById(29)
//.then((data) => {
//   if (data === null) {
//     return
//   }
//
//  console.log(data);
//})

module.exports = {
   pool,
   getUserById,
   getUserByName,
   fetchQuery,
   sendQuery,
}