const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const getVoiceUrl = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await timeout(300)
  await page.click('.share_audio_switch')
  const content = await page.content();
  const $ = await cheerio.load(content);
  const voiceId = await $('audio').attr('src');
  // const name = await $('mpvoice').attr('name');
  console.log(voiceId)

  if (voiceId) {
    voiceId = voiceId.match(/\?mediaid=(.+)/)[1]
  }
  
  await browser.close();
  return { url: `https://res.wx.qq.com/voice/getvoice?mediaid=${voiceId}` ,  name:'下载' }
};

// getVoiceUrl('https://mp.weixin.qq.com/s/llV1wW1hY5M80AoT7_LpZQ')

module.exports = getVoiceUrl
