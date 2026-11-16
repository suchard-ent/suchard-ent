import puppeteer from 'puppeteer-core';
const base=process.env.PREVIEW_ORIGIN||'http://127.0.0.1:4322';
const browser=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const failures=[];
const pages=['/ko/','/en/','/ko/credits/','/en/credits/','/ko/works/prescription/','/en/works/prescription/'];
try{
 for(const width of [320,390,768,1440,1920]){
  const page=await browser.newPage();
  await page.setViewport({width,height:900,deviceScaleFactor:1});
  await page.setCacheEnabled(false);
  for(const path of pages){
   const response=await page.goto(base+path,{waitUntil:'networkidle0',timeout:30000});
   const check=await page.evaluate(()=>{
    const h1=document.querySelector('h1');
    const rect=h1?.getBoundingClientRect();
    const links=[...document.querySelectorAll('a[href]')].map(x=>x.getAttribute('href')||'');
    return {
      title:document.title,
      lang:document.documentElement.lang,
      h1Count:document.querySelectorAll('h1').length,
      canonical:document.querySelector('link[rel=canonical]')?.getAttribute('href'),
      hreflang:[...document.querySelectorAll('link[hreflang]')].map(x=>x.getAttribute('hreflang')),
      jsonld:[...document.querySelectorAll('script[type="application/ld+json"]')].map(x=>JSON.parse(x.textContent||'null')),
      width:document.documentElement.scrollWidth,
      innerWidth:innerWidth,
      h1Overflow:rect?rect.left<-2||rect.right>innerWidth+2:false,
      sameOriginLinks:links.filter(x=>x.startsWith('/')),
      hiddenFilters:[...document.querySelectorAll('.credit-entry[hidden]')].length
    };
   });
   const bad=response?.status()!==200||check.width>check.innerWidth+1||check.h1Overflow||check.h1Count!==1||check.hreflang.length!==3||!check.canonical||check.jsonld.length<1;
   if(bad)failures.push({viewport:width,path,status:response?.status(),...check});
   console.log(bad?'FAIL':'PASS',width,path,response?.status(),'width '+check.width+'/'+width);
   if(path==='/ko/credits/'&&width===390){
     const before=await page.$$eval('.credit-entry:not([hidden])',x=>x.length);
     await page.click('button[data-filter="solo"]');
     const after=await page.$$eval('.credit-entry:not([hidden])',x=>x.length);
     const pressed=await page.$eval('button[data-filter="solo"]',el=>el.getAttribute('aria-pressed'));
     console.log('FILTER',before,after,pressed);
     if(before!==11||after!==2||pressed!=='true')failures.push({width,path,filter:{before,after,pressed}});
   }
  }
  await page.close();
 }
}finally{await browser.close();}
if(failures.length){
 console.error('QA_FAIL',JSON.stringify(failures.map(x=>({viewport:x.viewport,path:x.path,status:x.status,width:x.width,innerWidth:x.innerWidth,h1Overflow:x.h1Overflow,filter:x.filter})),null,2));
 process.exitCode=1;
}else console.log('QA_PASS: 30 routes/viewport combinations, credit filter');
