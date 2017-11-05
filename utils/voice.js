const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const getVoiceUrl = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://mp.weixin.qq.com/s/llV1wW1hY5M80AoT7_LpZQ');
  const content = await page.content();
  const $ = await cheerio.load(content);
  const voiceId = await $('mpvoice').attr('voice_encode_fileid');
  const name = await $('mpvoice').attr('name');
  
  await browser.close();
  return { url: `https://res.wx.qq.com/voice/getvoice?mediaid=${voiceId}` , name }
};

module.exports = getVoiceUrl