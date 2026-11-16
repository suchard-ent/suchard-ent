import {readFileSync, readdirSync} from 'node:fs';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const expectText = (path, phrases) => {
  const html = read(path);
  for (const phrase of phrases) assert.ok(html.includes(phrase), path + ' missing: ' + phrase);
};
const rejectText = (path, phrases) => {
  const html = read(path);
  for (const phrase of phrases) assert.ok(!html.includes(phrase), path + ' still contains: ' + phrase);
};

expectText('dist/ko/index.html', [
  '몽구스에서 베이스와 기타를 연주한 슈샤드의 솔로 음반과 제작 참여작.',
  '〈Lovestruck〉',
  '최우수 모던록 음반을 수상했다.',
  '활동 기록',
  '주요 음반 및 참여작',
  '작업 문의',
  'mailto:suchard337@gmail.com',
  'WantedSansVariable.min.css'
]);
expectText('dist/en/index.html', [
  'Recordings with Mongoose, solo releases, and work with other artists.',
  'He also worked on GUS',
  'Sports Seoul reported',
  'mailto:suchard337@gmail.com',
  'WantedSansVariable.min.css'
]);
rejectText('dist/ko/index.html', [
  '밴드의 무대에서 시작해',
  '이곳에는 발표된 음악과 확인 가능한 작업 크레딧을 모았다',
  '2006년 한국대중음악상 수상은 밴드 몽구스의 기록입니다.',
  '정식 공개 전 연락 채널을 연결할 예정입니다.',
  '본 페이지의 이미지와 음반 아트는 공개 전 사용 허락을 확인해야 합니다.'
]);
rejectText('dist/en/index.html', [
  'From the stage with Mongoose',
  'This space is intended for enquiries',
  'An enquiry channel will be connected',
  'The discography draws on published recordings and credits',
  'The 2006 Korean Music Awards recognition was awarded to Mongoose as a band.'
]);
expectText('dist/ja/index.html', [
  'Mongooseでの演奏、ソロ作品、他のアーティストとの制作・演奏参加。',
  '韓国大衆音楽賞',
  '主なディスコグラフィー',
  '活動記録',
  'mailto:suchard337@gmail.com',
  'fonts.googleapis.com/css2?family=Noto+Sans+JP'
]);
expectText('dist/ja/credits/index.html', [
  '主な音源と参加作品',
  'すべて',
  'バンド',
  'プロデュース'
]);
const newsLinks=[
  'https://m.entertain.naver.com/home/article/312/0000008050',
  'https://m.entertain.naver.com/home/article/468/0000068775'
];
for(const lang of ['ko','en','ja']){
 const home=read('dist/'+lang+'/index.html');
 for(const url of newsLinks)assert.ok(home.includes(url),lang+' missing Naver article '+url);
 assert.ok(home.includes('mailto:suchard337@gmail.com'),lang+' missing contact mailto');
 for(const obsolete of ['연락처 준비 중','Enquiry address coming soon','お問い合わせ先は準備中です'])
   assert.ok(!home.includes(obsolete),lang+' retained placeholder '+obsolete);

 for(const target of ['ko','en','ja']) {
   assert.ok(home.includes('hreflang="'+target+'"'),lang+' missing alternate '+target);
   assert.ok(home.includes('hreflang="'+target+'" lang="'+target+'"'),lang+' missing language switch '+target);
 }
}

for (const lang of ['ko','en','ja']) {
  expectText('dist/'+lang+'/credits/index.html', [
    'SELECTED RECORDINGS & CREDITS',
    'Early Hits of the Mongoose',
    'Lovestruck',
    'Next To Me'
  ]);
  rejectText('dist/'+lang+'/credits/index.html', ['COMPLETE INDEX / VERIFIED RELEASES']);
  expectText('dist/'+lang+'/works/lovestruck/index.html', [
    'https://m.entertain.naver.com/home/article/468/0000068775'
  ]);
  expectText('dist/'+lang+'/works/prescription/index.html', lang==='ko'
    ? ['작사: 슈샤드, Blues Lee','마스터링: 권남우','크레딧 확인']
    : lang==='ja' ? ['作詞：SUCHARD、Blues Lee','マスタリング：Kwon Nam-woo','クレジットを見る']
    : ['Lyrics: Suchard, Blues Lee','Mastering: Kwan Nam-woo','View credits']);
  expectText('dist/'+lang+'/works/early/index.html', lang==='ko'
    ? ['베이스 기타 · 보컬','https://www.maniadb.com/album/115593']
    : lang==='ja' ? ['ベース · ボーカル','https://www.maniadb.com/album/115593']
    : ['Bass guitar · Vocals','https://www.maniadb.com/album/115593']);
  expectText('dist/'+lang+'/works/lovestruck/index.html', lang==='ko'
    ? ['작사 · 작곡 · 편곡 · 녹음 · 연주','믹싱: 오승훈']
    : lang==='ja' ? ['作詞 · 作曲 · 編曲 · レコーディング · 演奏','ミキシング：Oh Seung-hoon']
    : ['Lyrics · Composition · Arrangement · Recording · Performance','Mixing: Oh Seung-hoon']);
  expectText('dist/'+lang+'/works/starchis/index.html', [
    'https://blendcompany.bandcamp.com/track/-',
    'https://www.youtube.com/watch?v=H_NvRKZ_rOI'
  ]);
  expectText('dist/'+lang+'/works/dancing/index.html',lang==='ko'
    ? ['수상 기록 보기']
    : lang==='ja' ? ['受賞記録を見る']
    : ['View award']);
  expectText('dist/'+lang+'/works/girlfriend/index.html',lang==='ko'
    ? ['음악 듣기']
    : lang==='ja' ? ['音楽を聴く']
    : ['Listen']);
  rejectText('dist/'+lang+'/works/girlfriend/index.html',['크레딧 원문','Original credits']);
}
expectText('dist/404.html',['처음으로 돌아가기','Back to home','WantedSansVariable.min.css']);
rejectText('dist/404.html',['color:#c3fc87']);
const pages = readdirSync(new URL('./dist/ko/works/',root),{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>x.name);
assert.equal(pages.length,11,'Expected eleven credited works');

const descs = [];
for(const lang of ['ko','en','ja']){
  for(const slug of pages){
    const html=read('dist/'+lang+'/works/'+slug+'/index.html');
    const match=html.match(/<meta name="description" content="([^"]+)"/);
    assert.ok(match,'Missing description on '+lang+'/'+slug);
    assert.ok(match[1].includes(/20\d\d/.exec(html)?.[0]||''), 'Missing release year in '+lang+'/'+slug);
    descs.push(match[1]);
    assert.ok(html.includes('noindex,nofollow'),'Preview robots guard missing');
  }
}
assert.equal(new Set(descs).size,descs.length,'Work descriptions must be unique');
const actual=read('src/data/credits.ts');
assert.ok(actual.includes("id: 'starchis'"));
assert.ok(actual.includes("sourceKind: 'credits'"));
console.log('COPY_QA_PASS: 3 locales, 11 works each, archive, contact, credits, metadata and 404');
