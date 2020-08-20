import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
   res.render("home.html");
});

export default router;





import axios from "axios";
import cheerio from "cheerio";

async function getHTML() {
  try {
    return await axios.get("https://jrstrans.tistory.com/108");
  } catch (error) {
    console.error(error);
  }
}

// router.get("/text-viewer", (req, res) => {
//    getHTML().then(html => {
//       let textList = [];
//       const $ = cheerio.load(html.data);
//       const bodyList = $("div.tt_article_useless_p_margin p").children("span");
//       const title = $("div.titleWrap").find("h2 a").text().replace(/~/gi, "");

//       bodyList.each(function(i, elem) {
//          textList[i] = {
//             text: $(this).text().replace(/\n/gi, "<br/>"), 
//             space: '<br/>'
//          };
//       });

//       res.render("viewer.ejs", { data: JSON.stringify(textList), title: title });
//       return "";
//    })
// });


router.get("/text-viewer", (req, res) => {
   getHTML().then((html) => {
      let dataList;
      const $ = cheerio.load(html.data);
      const title = $("div.titleWrap").find("h2 a").text().replace(/~/gi, "");
      const $data = $("div.tt_article_useless_p_margin p").children("span");
      //const raw = data.find("span").text();
      $data.each((idx, elem) => {
         dataList = $data.text().replace(/\. /gi, ".<br/>").replace(/\」/gi, '」<br/>').replace(/\)/gi,')<br/>' )
      });

      //console.log(JSON.stringify(dataList));
      //console.log(title);

      res.render("viewer.ejs", { data: JSON.stringify(dataList), title: title });
      return "";
   });
});
