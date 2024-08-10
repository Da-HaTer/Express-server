const pool = require('./db');

async function executeSelectQuery(query) {
    try {
      console.log("query:",query);
      const [rows] = await pool.execute(query);
        return rows;
    } catch (err) {
        // console.log(err);
        throw new Error('Error getting instructors');
    }
  }
module.exports = { executeSelectQuery };