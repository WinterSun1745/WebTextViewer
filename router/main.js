import express, { request } from "express";
import axios from "axios";
import cheerio from "cheerio";

const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended:false}))

router.get("/", (req, res) => {
   res.render("home.html");
});

export default router;



var url = "";

async function getHTML() {
   try {
      return await axios.get(url);
   } catch (error) {
      console.error(error);
   }
}

router.post("/text-viewer", (req, res) => {
   url = req.body.url;
   //console.log(url);
   getHTML().then(html => {
      let textList = [];
      const $ = cheerio.load(html.data);
      const bodyList = $("div.tt_article_useless_p_margin p").children("span");
      const title = $("div.titleWrap").find("h2 a").text().replace(/~/gi, "");

      bodyList.each(function (i, elem) {
         textList[i] = $(this).text().replace(/\n/gi, "");
         // textList[i] = {
         //    text: $(this).text().replace(/\n/gi, "<br/>"), 
         //    space: '<br/>'
         // };
      });

      //console.log(textList[7]);

      const tem = Object.assign({}, textList); // {0:"a", 1:"b", 2:"c"}
      res.render("viewer.ejs", { data: JSON.stringify(tem), title: title });

      return "";
   })
});
