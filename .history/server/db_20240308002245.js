// MM//////////////////////////////////////////////////////////////////////////////////////MM 22/1 2:20 PM ////////
const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'kcemfjbg',
//   host: 'hansken.db.elephantsql.com',
//   database: 'kcemfjbg',
//   password: 'WrZeAvSIe3vr0EvIqpQgpgwFU-G05V75',
//   port: '5432', // Usually 5432 for PostgreSQL
// });

const pool = new Pool({
  user : "postgres",
   password: "mim",
   host: "localhost",
   port: 5432,
   database: "postgres"
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connection to PostgreSQL cloud server successful!');

  // You can execute queries with the client here

  release(); // remember to release the client when you're done
});

module.exports=pool;
// MM//////////////////////////////////////////////////////////////////////////////////////MM 22/1 2:20 PM ////////
// USER NAME // psql -h hansken.db.elephantsql.com -d kcemfjbg -U kcemfjbg
// password// WrZeAvSIe3vr0EvIqpQgpgwFU-G05V75