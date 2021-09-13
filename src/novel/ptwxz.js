const cheerio = require("cheerio");
const axios = require("axios").default;
var iconv = require("iconv-lite");

const ROOT_DOMAIN = `https://www.ptwxz.com/`;

function getHTML(url) {
  return axios.get(url, { responseType: "arraybuffer" }).then((response) => {
    return iconv.decode(response.data, "gbk");
  });
}

async function getChapterList(url) {
  const html = await getHTML(url);
  const $ = cheerio.load(html);

  const chapters = $(".mainbody .centent a")
    .map((i, el) => {
      return {
        title: $(el).text().trim(),
        url: ROOT_DOMAIN + "html/11/11610/" + $(el).attr("href"),
      };
    })
    .toArray();

  return chapters;
}

async function getChapterData(url) {
  const html = await getHTML(url);
  const $ = cheerio.load(html);

  return $("div")
    .map((i, el) => {
      console.log($(el).html())
      $(el).text();
    })
    .toArray();
}

(async function () {
  const data = await getChapterList("https://www.ptwxz.com/html/11/11610/");
  console.log(data[0]);

  const chapter = await getChapterData(data[0].url);
  console.log(chapter);
})();
