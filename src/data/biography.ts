import type {Lang} from './credits';

export const biography = {
  ko: {
    heroLine: '몽구스에서 베이스와 기타를 연주한 슈샤드의 솔로 음반과 제작 참여작.',
    aboutParas: [
      '슈샤드(박희정)는 밴드 몽구스에서 베이스와 기타를 연주했다. 몽구스의 두 번째 음반 《Dancing Zoo》(2005)는 2006년 한국대중음악상 최우수 모던록 음반을 수상했다.',
      '2015년 첫 솔로 싱글 〈Lovestruck〉를 발표했다. 이듬해 발표한 〈처방전〉에서는 작곡과 편곡, 보컬과 악기 연주, 프로듀싱과 믹싱을 맡았다.',
      'GUS의 〈Next To Me〉, 신병섭의 〈좋아요〉, 드레인의 〈사랑, 아마도〉, 스타치스의 〈궁금한게 있어〉 등에도 작곡·편곡·프로듀싱 또는 세션 연주로 참여했다.'
    ],
    pressCards: [
      {eyebrow:'2006 · KOREAN MUSIC AWARDS',title:'몽구스 《Dancing Zoo》',subtitle:'2006년 한국대중음악상 최우수 모던록 음반. 몽구스의 수상 기록.',image:'album-dancing.webp',href:'https://koreanmusicawards.com/project/%EB%AA%BD%EA%B5%AC%EC%8A%A4-dancing-zoo-2/',link:'수상 기록 보기'},
      {eyebrow:'2011 · INTERVIEW',title:'몽구스 《Cosmic Dancer》',subtitle:'2011년 《Cosmic Dancer》 발매 당시 밴드의 음악과 작업 과정을 다룬 인터뷰.',image:'suchard-live-bw.webp',visual:'photo',href:'https://v.daum.net/v/M0N2PV3l8D',link:'인터뷰 읽기'},
      {eyebrow:'2015 · SOLO SINGLE',title:'슈샤드 〈Lovestruck〉',subtitle:'첫 솔로 싱글 〈Lovestruck〉 발표를 다룬 2015년 기사.',image:'lovestruck-2015-archive.webp',visual:'photo',href:'https://www.etoday.co.kr/news/view/1224758',link:'발매 기사 읽기'},
      {eyebrow:'2016 · RELEASE CREDITS',title:'슈샤드 〈처방전〉',subtitle:'〈처방전〉의 작곡·편곡·연주·프로듀싱·믹싱 크레딧.',image:'solo-prescription.webp',href:'https://blendcompany.bandcamp.com/album/prescription',link:'크레딧 확인'}
    ]
  },
  en: {
    heroLine: 'Recordings with Mongoose, solo releases, and work with other artists.',
    aboutParas: [
      'Suchard (Park Hee-jung) played bass and guitar in the Korean band Mongoose. Their second album, Dancing Zoo (2005), won Best Modern Rock Album at the 2006 Korean Music Awards.',
      'He released his first solo single, Lovestruck, in 2015. On Prescription (2016), he composed and arranged the music, performed vocals and instruments, and handled production and mixing.',
      'He also worked on GUS’s Next To Me, 좋아요 by Shin Byung-seop, 사랑, 아마도 by Drain, and 궁금한게 있어 by Starchis. His contributions include composition, arrangement, production and session playing.'
    ],
    pressCards: [
      {eyebrow:'2006 · KOREAN MUSIC AWARDS',title:'Mongoose — Dancing Zoo',subtitle:'Best Modern Rock Album at the 2006 Korean Music Awards, awarded to Mongoose.',image:'album-dancing.webp',href:'https://koreanmusicawards.com/project/%EB%AA%BD%EA%B5%AC%EC%8A%A4-dancing-zoo-2/',link:'View award'},
      {eyebrow:'2011 · INTERVIEW',title:'Mongoose — Cosmic Dancer',subtitle:'A 2011 interview about Mongoose and the making of Cosmic Dancer.',image:'suchard-live-bw.webp',visual:'photo',href:'https://v.daum.net/v/M0N2PV3l8D',link:'Read interview'},
      {eyebrow:'2015 · SOLO SINGLE',title:'Suchard — Lovestruck',subtitle:'The 2015 announcement of Suchard’s first solo single, Lovestruck.',image:'lovestruck-2015-archive.webp',visual:'photo',href:'https://www.etoday.co.kr/news/view/1224758',link:'Read announcement'},
      {eyebrow:'2016 · RELEASE CREDITS',title:'Suchard — Prescription',subtitle:'Composition, arrangement, performance, production and mixing credits for Prescription.',image:'solo-prescription.webp',href:'https://blendcompany.bandcamp.com/album/prescription',link:'View credits'}
    ]
  }
} as const;

export const getBiography = (lang:Lang) => biography[lang];
