import puppeteer from 'puppeteer-core';

const origin = process.env.PREVIEW_ORIGIN || 'http://127.0.0.1:4322';
const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']
});

let failures = 0;
try {
  for (const width of [320,390,768,1440,1920]) {
    const page = await browser.newPage();
    await page.setViewport({width, height: 900, deviceScaleFactor: 1});
    await page.setCacheEnabled(false);
    for (const lang of ['ko','en','ja']) {
      for (const suffix of ['', 'works/lovestruck/']) {
        const url = origin + '/' + lang + '/' + suffix;
        const response = await page.goto(url, {waitUntil:'networkidle0',timeout:30000});
        const check = await page.evaluate(() => {
          const hero = document.querySelector('.hero-photograph');
          const og = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
          const promo = [...document.querySelectorAll('.press-card')].filter(x => x.querySelector('img')?.getAttribute('src')?.includes('lovestruck-2015-archive')).length;
          const covers = [...document.querySelectorAll('.release-art-link img')].length;
          const allImages = [...document.querySelectorAll('img')];
          return {
            status:document.readyState,
            docWidth:document.documentElement.scrollWidth,
            screenWidth:innerWidth,
            og,
            heroImage:hero?.querySelector('img')?.getAttribute('src'),
            mobileSource:hero?.querySelector('source')?.getAttribute('srcset'),
            actualHero:hero?.querySelector('img')?.currentSrc,
            aboutGroup:document.querySelector('.about-portrait img')?.getAttribute('src'),
            aboutSolo:document.querySelector('.about-solo-strip img')?.getAttribute('src'),
            archiveCards:document.querySelectorAll('.press-card').length,
            promoCards:promo,
            albumCovers:covers,
            workFeature:document.querySelector('.work-photo-feature img')?.getAttribute('src'),
            missing:allImages.filter(x=>x.complete && x.naturalWidth===0).map(x=>x.getAttribute('src')),
            robots:document.querySelector('meta[name="robots"]')?.getAttribute('content')
          };
        });
        const home = suffix === '';
        const valid = response?.status()===200 &&
          check.docWidth<=check.screenWidth+1 &&
          check.missing.length===0 &&
          check.robots?.includes('noindex') &&
          check.og?.includes('lovestruck-2015-og.jpg') &&
          (home ?
            check.heroImage?.includes('lovestruck-2015-hero-desktop.webp') &&
            check.mobileSource?.includes('lovestruck-2015-hero-mobile.webp') &&
            check.aboutGroup?.includes('mongoose-2011-group-bw.webp') &&
            check.aboutSolo?.includes('lovestruck-2015-about.webp') &&
            check.archiveCards===4 && check.promoCards===1 && check.albumCovers===11 :
            check.workFeature?.includes('lovestruck-2015-detail.webp')
          );
        console.log((valid?'PASS':'FAIL')+' '+width+' '+lang+'/'+(suffix||'home')+' status='+response?.status()+' overflow='+(check.docWidth>check.screenWidth)+' hero='+(check.actualHero?.split('/').pop()||'none')+' cards='+(check.archiveCards||0));
        if (!valid) {
          failures++;
          console.error(JSON.stringify(check));
        }
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
}
if (failures) {
  console.error('VERIFICATION FAILED: '+failures);
  process.exitCode=1;
} else {
  console.log('LOVESTRUCK_VISUAL_QA_PASS: 30 route/viewport checks');
}
