import { Episode } from '../../model/episode';

export type ReadmeModel = Pick<Episode, 'date' | 'number' | 'type'>;
