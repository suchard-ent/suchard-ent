import type {Work} from './credits';

export type MediaProvider = 'youtube' | 'spotify' | 'soundcloud';

export type EmbeddedMedia = {
  provider: MediaProvider;
  embedUrl: string;
  externalUrl: string;
};

const youtubeIdPattern = /^[A-Za-z0-9_-]{11}$/;
const spotifyIdPattern = /^[A-Za-z0-9]{22}$/;

export const getWorkMedia = (work: Work): EmbeddedMedia => {
  const url = new URL(work.link);

  if (url.hostname === 'www.youtube.com' && url.pathname === '/watch') {
    const id = url.searchParams.get('v');
    if (!id || !youtubeIdPattern.test(id)) throw new Error('Invalid YouTube video ID: ' + work.id);
    return {
      provider: 'youtube',
      embedUrl: 'https://www.youtube-nocookie.com/embed/' + id + '?playsinline=1&rel=0',
      externalUrl: work.link
    };
  }

  if (url.hostname === 'open.spotify.com' && url.pathname.startsWith('/album/')) {
    const [, type, id] = url.pathname.split('/');
    if (type !== 'album' || !id || !spotifyIdPattern.test(id)) {
      throw new Error('Invalid Spotify album ID: ' + work.id);
    }
    return {
      provider: 'spotify',
      embedUrl: 'https://open.spotify.com/embed/album/' + id + '?utm_source=generator',
      externalUrl: work.link
    };
  }

  throw new Error('Unsupported media provider for work: ' + work.id);
};

export const featuredMedia = {
  youtube: {
    provider: 'youtube',
    embedUrl: 'https://www.youtube-nocookie.com/embed/-oU884kEfpg?playsinline=1&rel=0',
    externalUrl: 'https://www.youtube.com/watch?v=-oU884kEfpg'
  },
  spotify: {
    provider: 'spotify',
    embedUrl: 'https://open.spotify.com/embed/artist/33NSPHPUhk5VQNkkMUv6fF?utm_source=generator',
    externalUrl: 'https://open.spotify.com/artist/33NSPHPUhk5VQNkkMUv6fF'
  },
  soundcloud: {
    provider: 'soundcloud',
    embedUrl: 'https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Fusers%2F102586863&show_artwork=true&auto_play=false&show_comments=false',
    externalUrl: 'https://soundcloud.com/band-mongoose'
  }
} satisfies Record<MediaProvider, EmbeddedMedia>;
