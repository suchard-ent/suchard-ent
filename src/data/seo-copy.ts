import type {Lang, Work} from './credits';

export const getHomeMeta = (lang: Lang) => lang === 'ko'
  ? {
      title: '슈샤드 | 몽구스 · 솔로 · 음악 프로듀싱',
      description: '몽구스에서 베이스와 기타를 연주한 슈샤드의 솔로 싱글 〈Lovestruck〉·〈처방전〉과 작곡·편곡·프로듀싱 참여작.'
    }
  : {
      title: 'Suchard | Mongoose, Solo Recordings & Production',
      description: 'Suchard’s work with Mongoose, his solo singles Lovestruck and Prescription, and selected composition, arrangement and production credits.'
    };

export const getCreditsMeta = (lang: Lang) => lang === 'ko'
  ? {
      title: '슈샤드 주요 참여작 | 음반·싱글 크레딧',
      description: '몽구스 음반과 슈샤드의 솔로 싱글, 외부 음악가와 함께한 작업을 연도별로 살펴보세요.'
    }
  : {
      title: 'Selected Recordings & Credits | Suchard',
      description: 'A selection of Mongoose albums, Suchard’s solo releases and recordings with other artists, organized by year and contribution.'
    };

export const getWorkMeta = (lang: Lang, work: Work) => ({
  title: work.title + ' (' + work.year + ') | Suchard',
  description: lang === 'ko'
    ? work.artist + '의 ' + work.title + ' (' + work.year + '). 슈샤드의 참여: ' + work.role.ko + '.'
    : work.title + ' (' + work.year + ') by ' + work.artist + '. Suchard’s credits: ' + work.role.en + '.'
});
