const {Client} = require("pg");

const client = new Client({
    user: "postgres",
    password: "Rainforest00!",
    host: "127.0.0.1",
    port: 5432,
    database: "postgres"
});

client.connect()
    .then(() => console.log("connected"))
    .catch(error => console.log(error))

module.exports.client = client;