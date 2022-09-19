const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    port : 5432,
    user: "postgres",
    password: "123456",
    database: "fleetdb"
})

module.exports = client