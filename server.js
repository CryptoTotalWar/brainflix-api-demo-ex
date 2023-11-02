const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const { v4: uuid } = require("uuid");

app.use(cors());
app.use(express.json());
app.use("/photos", express.static("./static/images"));

app.get("/", (request, response) => {
  response.send("andrea is so cool");
});

app.get("/posts", (request, response) => {
  const something = fs.readFileSync("./data/blog-posts.json");
  // const parseSomething = JSON.parse(something);
  // response.json(parseSomething);
  response.send(something);
});

app.post("/posts", (request, response) => {
  const something = fs.readFileSync("./data/blog-posts.json");
  const parseSomething = JSON.parse(something);

  const { username, comment } = request.body;

  const newObj = {
    id: uuid(),
    avatar: "/tom.jpeg",
    username: username,
    comment: comment,
    likes: 0,
  };

  parseSomething.push(newObj);
  fs.writeFileSync("./data/blog-posts.json", JSON.stringify(parseSomething));
  response.json(newObj); // send the created object as a response
});

app.get("/posts/:searchParams", (request, response) => {
  const something = fs.readFileSync("./data/blog-posts.json");
  const parseSomething = JSON.parse(something);
  const found = parseSomething.find(
    (x) => x.username === request.params.searchParams
  );
  response.json(found);
});

app.listen(8081, () => {
  console.log("hi, now listening on port 8081");
});
