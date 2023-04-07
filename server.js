const express = require("express");
const app = express();
const port = 8080;
const cors = require('cors');
app.use(cors());
const config = {
  mongoURI:"mongodb+srv://johriabhishek123:THTqhtEH8CiJxSLj@cluster0.cjzg9ki.mongodb.net/?retryWrites=true&w=majority",
};
const blogs = require("./blog");
const connect = require("./connect");
const contact = require("./contact");

let mongoose = require("mongoose");
_connect()
  .then(() => {
    console.info("connected to mongo db");
  })
  .catch((err) => {
    console.error(`not connected to mongo db due to ${err}`);
  });

function _connect() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res, err) => {
        if (err) {
          console.log("not connected");
          return reject(err);
        }
        resolve(res);
      })
      .catch((err) => {
        console.error(`not connected to mongo db due to ${err}`);
      });
  });
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.json());

app.get("/api/contact", async (req, res) => {
  let r = await contact.find({});
  res.json(r);
});

app.post("/api/contact", async (req, res) => {
  await contact.create(req.body);
  res.json(req.body);
});

app.get("/api/blogs", async (req, res) => {
  console.log("api/blogs called!");
  let r = await blogs.find({});
  res.json(r);
});

app.post("/api/blog", async (req, res) => {
  await blogs.create(req.body);
  res.json(req.body);
});

app.put("/api/blog", async (req, res) => {
  const { blogId } = req.body;
  await blogs.updateOne({"_id": blogId},
  {
    $set: req.body
  })
  res.json(req.body);
});

app.get("/api/connect", async (req, res) => {
  let r = await connect.find({});
  res.json(r);
});

app.post("/api/connect", async (req, res) => {
  await connect.create(req.body);
  res.json(req.body);
});


app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
