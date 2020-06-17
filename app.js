const express = require("express");
const app = express();
const db = require("./db");

app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(3000, () => {
    console.log("Server started");
})

app.get("/", (req, res) => {
    db.client.query("SELECT * FROM blog_posts", (error, response) => {
        if(error) {
            console.log(error.stack)
        } else {
            res.render("index.ejs", { blogPosts: response.rows });
        }
    })   
})
