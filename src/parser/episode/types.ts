import { Episode } from '../../model/episode';

export type EpisodeModel = Pick<Episode, 'hosts' | 'news'>;
