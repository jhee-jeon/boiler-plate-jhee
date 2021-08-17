const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

//유저 정보 관리
const { User } = require("./models/User");

//mongoDB 관련 개인 정보를 보호하기 위해 넣는 과정
const config = require("./config/key");

//application/x-www-form-urlendcoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//기본 페이지
app.get("/", (req, res) => res.send("기본 페이지입니다."));

//회원가입 페이지
app.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
