const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const getVoiceUrl = async (url) => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto(url);
  const content = await page.content();
  const $ = await cheerio.load(content);
  const voiceId = await $('mpvoice').attr('voice_encode_fileid');
  const name = await $('mpvoice').attr('name');
  
  await browser.close();
  return { url: `https://res.wx.qq.com/voice/getvoice?mediaid=${voiceId}` , name }
};

module.exports = getVoiceUrl