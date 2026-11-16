import type {Lang, SourceKind} from './credits';

export const contactEmail = 'suchard337@gmail.com';

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
    contactTitle: '작업 문의',
    contactText: '작곡·편곡·프로듀싱 및 베이스·기타 세션 문의',
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
    returnHome:'처음으로 돌아가기',
    all:'전체',
    backToTop:'맨 위로',
    albumArt:'앨범 표지',
    media:{play:'여기서 듣기',watch:'뮤직비디오 보기',player:'음악 플레이어',close:'플레이어 닫기',openExternal:'원본 플랫폼에서 열기',playHere:'이 페이지에서 재생',soundcloud:'SoundCloud에서 듣기',playing:'재생할 음원',listenHere:'바로 듣기 · 영상 보기',listenHint:'선택한 음반이나 영상을 이 페이지에서 재생할 수 있습니다.',fallback:'일부 음원은 플랫폼 정책에 따라 미리듣기만 제공되거나 로그인이 필요할 수 있습니다.'}
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
    returnHome:'Back to home',
    all:'All',
    backToTop:'Back to top',
    albumArt:'Album artwork',
    media:{play:'Listen here',watch:'Watch music video',player:'Music player',close:'Close player',openExternal:'Open on platform',playHere:'Play on this page',soundcloud:'Listen on SoundCloud',playing:'Selected recording',listenHere:'Listen & Watch',listenHint:'Play music and videos here without leaving the page.',fallback:'Full playback may require a sign-in or opening the original platform.'}
  },
  ja: {
    name: 'SUCHARD',
    role: 'ミュージシャン · 作曲家 · プロデューサー',
    nav: {music:'音楽', about:'プロフィール', press:'活動記録', contact:'お問い合わせ', credits:'参加作品'},
    eyebrow: {music:'MUSIC', about:'ABOUT', press:'ARCHIVE', contact:'CONTACT', follow:'LISTEN'},
    discography:'主なディスコグラフィー',
    aboutTitle:'音楽家・\nプロデューサー',
    pressTitle:'活動記録',
    followTitle:'音楽を聴く',
    contactTitle:'制作・演奏の\nご相談',
    contactText:'作曲・編曲・プロデュース、ベース／ギターの演奏依頼について。',
        musicianDetails:'Mongooseでの作品、SUCHARDのソロ音源、他のアーティストとの制作・演奏参加作品を紹介します。',
    category: {band:'バンド',solo:'ソロ',production:'プロデュース',session:'セッション'},
    year:'リリース',
    listen:'音楽を聴く',
    back:'作品一覧に戻る',
    more:'作品の詳細を見る',
    scroll:'スクロール',
    allWorks:'主な音源と参加作品',
    categoryLabel:'参加形態',
    pageLabel:'参加クレジット',
    returnHome:'トップに戻る',
    all:'すべて',
    backToTop:'ページ上部へ',
    albumArt:'ジャケット画像',
    media:{play:'ここで聴く',watch:'MVを見る',player:'音楽プレーヤー',close:'プレーヤーを閉じる',openExternal:'元のサイトで開く',playHere:'このページで再生',soundcloud:'SoundCloudで聴く',playing:'再生する作品',listenHere:'音楽・映像を再生',listenHint:'ページを移動せずに音楽や映像を再生できます。',fallback:'一部の音源は試聴のみ、またはログインが必要な場合があります。'}
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
  },
  ja: {
    credits:'クレジットを見る',
    release:'音源情報を見る',
    award:'受賞記録を見る',
    listing:'作品情報を見る',
    video:'動画を見る'
  }
};

export const getSourceLabel = (lang: Lang, kind: SourceKind) => sourceLabels[lang][kind];
export const getUiCopy = (lang: Lang) => uiCopy[lang];
