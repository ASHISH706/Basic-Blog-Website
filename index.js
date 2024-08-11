import e from "express";
import bodyParser from "body-parser";

const app = e();
const port = 3000;
const posts = [];


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(e.static("public"));

app.get("/", (req, res) => {
    res.render("home.ejs", { pst: posts });
});

app.get("/Create", (req, res) => {
    res.render("Create.ejs");
})

app.post('/Submit', (req, res) => {
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    const post = {
        content: req.body["content"],
        title: req.body["title"],
        date: `${date}/${month}/${year}`,
    };
    posts.push(post);
    res.redirect("/");
});

app.post('/delete', (req, res) => {
    const index = req.body.index;
    if (index > -1) {
        posts.splice(index, 1);
    }
    res.redirect('/');
});

app.get('/edit/:index', (req, res) => {
    const index = req.params.index;
    const post = posts[index];
    res.render('edit.ejs', { pst: post, ind: index });
});

app.post('/update/:index', (req, res) => {
    const index = req.params.index;
    posts[index].title = req.body.title1;
    posts[index].content = req.body.content1;
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`server is active at ${port}`);
})