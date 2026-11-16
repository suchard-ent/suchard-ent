export const locales = ['ko', 'en', 'ja'] as const;
export type Lang = (typeof locales)[number];
export type Translation = Record<Lang, string>;
export type SourceKind = 'credits' | 'release' | 'award' | 'listing' | 'video';

export type Work = {
  id: string;
  title: string;
  artist: string;
  year: string;
  category: 'band' | 'solo' | 'production' | 'session';
  role: Translation;
  image: string;
  link: string;
  source: string;
  sourceKind: SourceKind;
  additionalCredits?: Translation[];
};

export const works: Work[] = [
  {
    id: 'prescription', title: '처방전 / Prescription', artist: 'Suchard', year: '2016', category: 'solo',
    role: {ko: '작곡 · 편곡 · 보컬 · 프로듀싱 · 믹싱', en: 'Composition · Arrangement · Vocals · Production · Mixing', ja: '作曲 · 編曲 · ボーカル · プロデュース · ミキシング'},
    additionalCredits: [
      {ko: '작사: 슈샤드, Blues Lee', en: 'Lyrics: Suchard, Blues Lee', ja: '作詞：SUCHARD、Blues Lee'},
      {ko: '마스터링: 권남우', en: 'Mastering: Kwan Nam-woo', ja: 'マスタリング：Kwon Nam-woo'}
    ],
    image: 'solo-prescription.webp', link: 'https://www.youtube.com/watch?v=-oU884kEfpg',
    source: 'https://blendcompany.bandcamp.com/album/prescription', sourceKind: 'credits'
  },
  {
    id: 'lovestruck', title: 'Lovestruck', artist: 'Suchard', year: '2015', category: 'solo',
    role: {ko: '작사 · 작곡 · 편곡 · 녹음 · 연주', en: 'Lyrics · Composition · Arrangement · Recording · Performance', ja: '作詞 · 作曲 · 編曲 · レコーディング · 演奏'},
    additionalCredits: [
      {ko: '믹싱: 오승훈', en: 'Mixing: Oh Seung-hoon', ja: 'ミキシング：Oh Seung-hoon'},
      {ko: '마스터링: 권남우', en: 'Mastering: Kwan Nam-woo', ja: 'マスタリング：Kwon Nam-woo'}
    ],
    image: 'solo-lovestruck.webp', link: 'https://www.youtube.com/watch?v=NClswA5iXOg',
    source: 'https://music.bugs.co.kr/album/20005077', sourceKind: 'credits'
  },
  {
    id: 'cosmic', title: 'Cosmic Dancer', artist: 'Mongoose', year: '2011', category: 'band',
    role: {ko: '밴드 멤버 · 기타', en: 'Band member · Guitar', ja: 'バンドメンバー · ギター'},
    image: 'album-cosmic.webp', link: 'https://open.spotify.com/album/6TUaVwzoLyGDisaH7Z19kl',
    source: 'https://open.spotify.com/album/6TUaVwzoLyGDisaH7Z19kl', sourceKind: 'release'
  },
  {
    id: 'gus', title: 'Next To Me', artist: 'GUS', year: '2016', category: 'production',
    role: {ko: '공동 작곡 · 프로듀싱 · 기타 · 믹싱', en: 'Co-composition · Production · Guitar · Mixing', ja: '共同作曲 · プロデュース · ギター · ミキシング'},
    image: 'collab-gus.webp', link: 'https://www.youtube.com/watch?v=K7HGYki-ZGY',
    source: 'https://blendcompany.bandcamp.com/album/next-to-me', sourceKind: 'credits'
  },
  {
    id: 'drain', title: '사랑, 아마도', artist: 'Drain', year: '2018', category: 'production',
    role: {ko: '공동 작곡 · 편곡 · 프로듀싱 · 믹싱', en: 'Co-composition · Arrangement · Production · Mixing', ja: '共同作曲 · 編曲 · プロデュース · ミキシング'},
    image: 'collab-drain.webp', link: 'https://www.youtube.com/watch?v=urnDKBgxAHA',
    source: 'https://music.bugs.co.kr/album/20167584', sourceKind: 'credits'
  },
  {
    id: 'mongoose', title: 'The Mongoose', artist: 'Mongoose', year: '2007', category: 'band',
    role: {ko: '밴드 멤버 · 공동 작곡', en: 'Band member · Co-composition', ja: 'バンドメンバー · 共同作曲'},
    image: 'album-mongoose.webp', link: 'https://open.spotify.com/album/3Z8yHQwKp74tkkpidz7iq3',
    source: 'https://beatballmusic.bandcamp.com/album/the-mongoose', sourceKind: 'credits'
  },
  {
    id: 'girlfriend', title: 'Girlfriend', artist: 'Mongoose', year: '2012', category: 'band',
    role: {ko: '밴드 멤버', en: 'Band member', ja: 'バンドメンバー'},
    image: 'album-girlfriend.webp', link: 'https://open.spotify.com/album/3U3wEF6MJyE5gvyQWVxTCH',
    source: 'https://open.spotify.com/album/3U3wEF6MJyE5gvyQWVxTCH', sourceKind: 'release'
  },
  {
    id: 'shin', title: '좋아요', artist: 'Shin Byung-seop', year: '2017', category: 'production',
    role: {ko: '프로듀싱 · 편곡 · 기타 · 베이스', en: 'Production · Arrangement · Guitar · Bass', ja: 'プロデュース · 編曲 · ギター · ベース'},
    image: 'collab-shin.webp', link: 'https://www.youtube.com/watch?v=qpeqEQedemg',
    source: 'https://music.bugs.co.kr/album/20104679', sourceKind: 'credits'
  },
  {
    id: 'starchis', title: '궁금한게 있어', artist: 'Starchis', year: '2016', category: 'session',
    role: {ko: '베이스 기타 세션', en: 'Bass guitar session', ja: 'ベースのセッション演奏'},
    image: 'collab-starchis.webp', link: 'https://www.youtube.com/watch?v=H_NvRKZ_rOI',
    source: 'https://blendcompany.bandcamp.com/track/-', sourceKind: 'credits'
  },
  {
    id: 'dancing', title: 'Dancing Zoo', artist: 'Mongoose', year: '2005', category: 'band',
    role: {ko: '밴드 멤버 · 베이스', en: 'Band member · Bass', ja: 'バンドメンバー · ベース'},
    image: 'album-dancing.webp', link: 'https://open.spotify.com/album/6pIqApo7h4JDbZH8CWrOyc',
    source: 'https://koreanmusicawards.com/project/%EB%AA%BD%EA%B5%AC%EC%8A%A4-dancing-zoo-2/', sourceKind: 'award'
  },
  {
    id: 'early', title: 'Early Hits of the Mongoose', artist: 'Mongoose', year: '2004', category: 'band',
    role: {ko: '베이스 기타 · 보컬', en: 'Bass guitar · Vocals', ja: 'ベース · ボーカル'},
    image: 'album-early.webp', link: 'https://open.spotify.com/album/3siHbOhtac8dwgWduNgQn2',
    source: 'https://www.maniadb.com/album/115593', sourceKind: 'credits'
  }
];
