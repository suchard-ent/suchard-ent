import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';

const origin=process.env.PREVIEW_ORIGIN||'http://127.0.0.1:4322';
const browser=await puppeteer.launch({
  executablePath:'/usr/bin/google-chrome',
  headless:true,
  args:['--no-sandbox','--disable-dev-shm-usage']
});
let checks=0;

async function openPage(path,width){
  const page=await browser.newPage();
  page.setDefaultTimeout(15000);
  await page.setViewport({width,height:880,deviceScaleFactor:1});
  await page.setCacheEnabled(false);
  const response=await page.goto(origin+path,{waitUntil:'domcontentloaded',timeout:30000});
  assert.equal(response?.status(),200,path);
  return page;
}

async function modalTest(page,selector,provider){
  await page.click(selector);
  await page.waitForFunction(()=>document.querySelector('[data-media-dialog]')?.open&&document.querySelector('[data-media-dialog-frame] iframe'));
  const data=await page.evaluate(()=>{
    const dialog=document.querySelector('[data-media-dialog]');
    const iframe=dialog.querySelector('iframe');
    return {
      title:dialog.querySelector('[data-media-title]')?.textContent,
      provider:dialog.querySelector('[data-media-provider-label]')?.textContent,
      src:iframe?.src,
      width:iframe?.getBoundingClientRect().width,
      height:iframe?.getBoundingClientRect().height,
      modalWidth:dialog.getBoundingClientRect().width,
      viewport:innerWidth,
      hasExternalLink:dialog.querySelector('[data-media-external-link]')?.href.startsWith('https://')
    };
  });
  assert.equal(data.provider,provider.toUpperCase());
  assert.ok(data.title);
  assert.ok(data.hasExternalLink);
  assert.ok(data.modalWidth<=data.viewport);
  if(provider==='youtube'){
    assert.ok(data.src.includes('www.youtube-nocookie.com/embed/'));
    assert.ok(data.src.includes('autoplay=1'));
    assert.ok(data.height>=200);
  }else if(provider==='spotify'){
    assert.ok(data.src.includes('open.spotify.com/embed/'));
    assert.ok(data.width>=280,'Spotify embed too narrow: '+data.width);
    assert.ok(data.height>=352);
  }else if(provider==='soundcloud'){
    assert.ok(data.src.includes('w.soundcloud.com/player/'));
    assert.ok(data.src.includes('users%2F102586863'));
  }
  await page.click('[data-media-close]');
  await page.waitForFunction(()=>!document.querySelector('[data-media-dialog]')?.open&&document.querySelectorAll('iframe').length===0);
  checks++;
}

try{
  for(const width of [320,390,768,1440]){
    for(const lang of ['ko','en','ja']){
      const page=await openPage('/'+lang+'/',width);
      const initial=await page.evaluate(()=>({
        cards:document.querySelectorAll('.release-card .media-launch--card').length,
        stations:document.querySelectorAll('.streaming-actions .media-launch--station').length,
        frames:document.querySelectorAll('iframe').length,
        overflow:document.documentElement.scrollWidth-innerWidth
      }));
      assert.equal(initial.cards,11);
      assert.equal(initial.stations,3);
      assert.equal(initial.frames,0);
      assert.ok(initial.overflow<=1,lang+' home overflow '+initial.overflow);
      await modalTest(page,'.release-card .media-launch--card[data-media-provider="youtube"]','youtube');
      await modalTest(page,'.release-card .media-launch--card[data-media-provider="spotify"]','spotify');
      if(width===320||width===390){
        await modalTest(page,'.streaming-actions [data-media-provider="soundcloud"]','soundcloud');
      }
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
      assert.ok(overflow<=1,lang+' home overflow after modal '+overflow);
      console.log('HOME_MEDIA_PASS',width,lang);
      await page.close();
    }
  }

  for(const lang of ['ko','en','ja']){
    const page=await openPage('/'+lang+'/credits/',320);
    assert.equal(await page.$$eval('.credit-entry .media-launch--credit',x=>x.length),11);
    await modalTest(page,'.credit-entry .media-launch--credit[data-media-provider="spotify"]','spotify');
    await modalTest(page,'.credit-entry .media-launch--credit[data-media-provider="youtube"]','youtube');
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    assert.ok(overflow<=1,lang+' credits overflow '+overflow);
    console.log('CREDITS_MEDIA_PASS',lang);
    await page.close();
  }

  for(const [lang,slug,width,provider] of [
    ['ko','prescription',320,'youtube'],
    ['ja','lovestruck',390,'youtube'],
    ['en','cosmic',320,'spotify'],
    ['ja','dancing',1440,'spotify']
  ]){
    const page=await openPage('/'+lang+'/works/'+slug+'/',width);
    const before=await page.evaluate(()=>({
      inline:document.querySelectorAll('[data-inline-media]').length,
      launch:document.querySelectorAll('[data-media-inline-open]').length,
      iframes:document.querySelectorAll('iframe').length
    }));
    assert.deepEqual(before,{inline:1,launch:1,iframes:0});
    await page.click('[data-media-inline-open]');
    await page.waitForSelector('[data-inline-frame] iframe');
    const data=await page.evaluate(()=>{
      const iframe=document.querySelector('[data-inline-frame] iframe');
      return {src:iframe.src,width:iframe.getBoundingClientRect().width,height:iframe.getBoundingClientRect().height,overflow:document.documentElement.scrollWidth-innerWidth};
    });
    assert.ok(data.src.includes(provider==='youtube'?'youtube-nocookie.com/embed/':'open.spotify.com/embed/album/'));
    assert.ok(data.overflow<=1,lang+' inline overflow '+data.overflow);
    if(provider==='spotify')assert.ok(data.width>=280);
    if(provider==='youtube')assert.ok(data.height>=200);
    console.log('DETAIL_MEDIA_PASS',width,lang,slug,provider);
    checks++;
    await page.close();
  }
}finally{
  await browser.close();
}
console.log('MEDIA_QA_PASS',checks,'interactive playback checks');
