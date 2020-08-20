import express from "express";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/view");

const server = app.listen(process.env.PORT || 8888, () => {
   console.log("Express server has started on port 8888");
});

import router from "./router/main.js";
app.use("/", router);
