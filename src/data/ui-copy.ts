import type {Lang, SourceKind} from './credits';

export const uiCopy = {
  ko: {
    name: '슈샤드',
    role: '뮤지션 · 작곡가 · 프로듀서',
    nav: {music:'음악', about:'소개', press:'활동 기록', contact:'문의', credits:'크레딧'},
    eyebrow: {music:'MUSIC', about:'ABOUT', press:'ARCHIVE', contact:'CONTACT', follow:'LISTEN'},
    discography: 'Selected Discography',
    aboutTitle: 'Musician &\nProducer',
    pressTitle: '활동 기록',
    followTitle: '음악 듣기',
    contactTitle: '작업\n문의',
    contactText: '작곡·편곡·프로듀싱 및 베이스·기타 세션 문의',
    contactPending: '연락처 준비 중',
    musicianDetails: '몽구스의 음반, 슈샤드의 솔로 싱글과 다른 음악가의 제작 참여작을 모았습니다.',
    category: {band:'밴드',solo:'솔로',production:'프로듀싱',session:'세션'},
    year:'발매',
    listen:'음악 듣기',
    back:'음반 목록으로',
    more:'작품 상세 보기',
    scroll:'스크롤',
    allWorks:'주요 음반 및 참여작',
    categoryLabel:'참여 유형',
    pageLabel:'참여 크레딧',
    returnHome:'처음으로 돌아가기'
  },
  en: {
    name: 'Suchard',
    role: 'Musician · Composer · Producer',
    nav: {music:'Music', about:'About', press:'Archive', contact:'Contact', credits:'Credits'},
    eyebrow: {music:'MUSIC', about:'ABOUT', press:'ARCHIVE', contact:'CONTACT', follow:'LISTEN'},
    discography:'Selected Discography',
    aboutTitle:'Musician &\nProducer',
    pressTitle:'Archive',
    followTitle:'Listen',
    contactTitle:'Contact',
    contactText:'For composition, arrangement, production, and bass or guitar sessions.',
    contactPending:'Enquiry address coming soon',
    musicianDetails:'Selected releases with Mongoose, Suchard’s solo recordings and credits with other artists.',
    category: {band:'Band',solo:'Solo',production:'Production',session:'Session'},
    year:'Released',
    listen:'Listen',
    back:'Back to discography',
    more:'View work details',
    scroll:'Scroll',
    allWorks:'Selected recordings and credits',
    categoryLabel:'Contribution',
    pageLabel:'Recording credits',
    returnHome:'Back to home'
  }
} as const;

const sourceLabels: Record<Lang, Record<SourceKind, string>> = {
  ko: {
    credits:'크레딧 확인',
    release:'음반 정보 보기',
    award:'수상 기록 보기',
    listing:'음반 자료 보기',
    video:'영상 보기'
  },
  en: {
    credits:'View credits',
    release:'View release',
    award:'View award',
    listing:'View listing',
    video:'Watch video'
  }
};

export const getSourceLabel = (lang: Lang, kind: SourceKind) => sourceLabels[lang][kind];
export const getUiCopy = (lang: Lang) => uiCopy[lang];
