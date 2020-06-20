const express = require("express");
const app = express();
const db = require("./db");

app.use(express.static("public"));
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
})

shortenPostsTo80chars = function(blogPosts) {
    for(let i=1;i<blogPosts.length;i++) {
        if(blogPosts[i].post_content.length > 80) {
            let shortenedPost = blogPosts[i].post_content.slice(0, 50)+"...";
            blogPosts[i].post_content = shortenedPost;
        }
    }
    return blogPosts
}

app.get("/", (req, res) => {
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
})

app.get("/about", (req, res) => {
    res.render("about_us.ejs", { pageTitle: "About" });
})

app.get("/contact", (req, res) => {
    res.render("contact_us.ejs", { pageTitle: "Contact" })
})

app.get("/compose", (req, res) => {
    res.render("compose.ejs", { pageTitle: "Compose" });
})

// view a single post after clicking "read more" link
app.get("/posts/:id", (req, res) => {
    let text = "SELECT * from blog_posts WHERE id = $1";
    let values = [req.params.id];
    db.client.query(text, values, (error, response) => {
        if(error) {
            res.render("error.ejs", { error: error.stack });
        } else {
            response.rows[0].created = response.rows[0].created.toDateString();
            res.render("single_blog_post.ejs", { blogPost: response.rows[0], pageTitle: response.rows[0].post_title });
        }
    })
})

// add a new blog post
app.post("/compose", (req, res) => {
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
})