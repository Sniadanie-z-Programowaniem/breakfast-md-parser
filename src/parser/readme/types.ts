import { Episode } from '../../model/episode';

export type EpisodeListItemModel = Pick<Episode, 'date' | 'number' | 'type'> & {
    streamUrl: string;
    episodeFileLink: string;
};
