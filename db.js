const {Client} = require("pg");

const client = new Client({
    user: "svyjcxdfkxgfgp",
    password: "5b57a71b369537535cf34e8b0ebdfc51d70f4fff64fe4a6629c9c957a0e55f81",
    host: "ec2-79-125-26-232.eu-west-1.compute.amazonaws.com",
    port: 5432,
    database: "db2fa0i5ab3r71",
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => console.log("connected"))
    .catch(error => console.log(error))

module.exports.client = client;