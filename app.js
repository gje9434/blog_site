const express = require("express");
const app = express();
const db = require("./db");

app.use(express.static("public"));
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
})

app.get("/", showPosts)

app.get("/posts/:id", viewSinglePost);

app.get("/about", (req, res) => {
    res.render("about_us.ejs", { pageTitle: "About" });
})

app.get("/contact", (req, res) => {
    res.render("contact_us.ejs", { pageTitle: "Contact" })
})

app.get("/compose", (req, res) => {
    res.render("compose.ejs", { pageTitle: "Compose" });
})

app.post("/compose", composePost);

function showPosts(req, res) {
    db.client.query("SELECT * FROM blog_posts",(error, response) => {
        if(error) {
            res.render("error.ejs", { error: error.stack });
        } else {
            // sort posts by date order DESCENDING
            let blogPosts = response.rows.sort((a, b) => {
                return b.created - a.created;
            })
            // change TIMESTAMP to more readable date string
            blogPosts.map(post => {
                post.created = post.created.toDateString();
                return post;
            })
            res.render("index.ejs", { blogPosts: shortenPostsTo80chars(blogPosts), pageTitle: "Home" });
        }
    })   
}

function composePost(req, res) {
    let newPostTitle = req.body.title;
    let newPostContent = req.body.content;
    let text = "INSERT INTO blog_posts (post_title, post_content) VALUES ($1, $2)";
    let values = [newPostTitle, newPostContent];
    
    db.client.query(text, values, (error, response) => {
        if(error) {
            res.render("error.ejs", { error: error.stack });
        } else {
            res.redirect("/");
        }
    })   
}

function viewSinglePost(req, res) {
    let newPostTitle = req.body.title;
    let newPostContent = req.body.content;
    let text = "INSERT INTO blog_posts (post_title, post_content) VALUES ($1, $2)";
    let values = [newPostTitle, newPostContent];
    
    db.client.query(text, values, (error, response) => {
        if(error) {
            res.render("error.ejs", { error: error.stack });
        } else {
            res.redirect("/");
        }
    }) 
}

shortenPostsTo80chars = function(blogPosts) {
    for(let i=1;i<blogPosts.length;i++) {
        if(blogPosts[i].post_content.length > 80) {
            let shortenedPost = blogPosts[i].post_content.slice(0, 50)+"...";
            blogPosts[i].post_content = shortenedPost;
        }
    }
    return blogPosts
}
