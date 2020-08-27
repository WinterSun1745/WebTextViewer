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

// router.post("/tistory-viewer", (req, res) => {
//    // if(req.body.url){
//    //    url = req.body.url;
//    // }
//    // else if (req.body.next) {
//    //    url = req.body.next;
//    // } else {
//    //    url = req.body.prev;
//    // }
//    url = req.body.url;
//    //console.log(url);
//    getHTML().then(html => {
//       let textList = [];
//       const $ = cheerio.load(html.data);
//       const bodyList = $("div.tt_article_useless_p_margin p").children("span");
//       const title = $("div[class='titleWrap']").find("h2 a").text().replace(/~/gi, "");
//       //console.log(title);
//       const next = $("div[id='paging']").children("a[id='prevPage']").attr("href"); //다음화 url
//       //console.log(next);
//       const prev = $("div[id='paging']").children("a[id='nextPage']").attr("href"); //이전화 url
//       //console.log(prev);

//       bodyList.each(function (i, elem) {
//          textList[i] = $(this).text().replace(/\n/gi, "");
//          // textList[i] = {
//          //    text: $(this).text().replace(/\n/gi, "<br/>"), 
//          //    space: '<br/>'
//          // };
//       });

//       //console.log(textList[7]);

//       const tem = Object.assign({}, textList);
//       res.render("viewer.ejs", { data: JSON.stringify(tem), title, url, next, prev });

//       return "";
//    })
// });

router.post("/naver-viewer", (req, res) => {
   url = req.body.url;
   //console.log(url);
   getHTML().then(html => {
      let textList = [];
      let urlList = [];
      const $ = cheerio.load(html.data);
      const bodyList = $("div[id='postViewArea']");
      const title = $("div[class='htitle']").find("span[class='pcol1 itemSubjectBoldfont']").text();
      console.log(title);
      for(var i=0;i<5;i++){
         urlList[i] = $("tbody[id='postBottomTitleListBody']").find("span[id='ell2 pcol2']").attr("href");
         //console.log(urlList[i]);
      }
      //console.log(urlList);

      bodyList.each(function (i, elem) {
         textList[i] = $(this).find('p span').text();
         // textList[i] = {
         //    text: $(this).text().replace(/\n/gi, "<br/>"), 
         //    space: '<br/>'
         // };
      });

      //console.log(textList[2]);

      const tem = Object.assign({}, textList);
      res.render("naver_viewer.ejs", { data: JSON.stringify(tem), title, url });

      return "";
   })
});
