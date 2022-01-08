const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const connectDB = require("./db/connect");
const Student = require("./models/Student");
const app = express();

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.use(bodyParser.json({ type: "application/*+json" }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", "src/views");

app.get("/", async (req, res) => {
  const students = await Student.find({});
  res.render("index", { students });
});

app.post("/student", (req, res) => {
  console.log(req.body);
  Student.create(req.body);
  res.redirect("/");
});

app.delete("/student/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// app.listen(5000, () => {
//   console.log("Server started on port 5000");
// });
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT } = process.env;

const connectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;
const port = 5000;
const start = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB(connectionString);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
