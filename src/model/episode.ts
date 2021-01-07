import type { Host } from './host';
import type { News } from './news';

export enum EpisodeType {
    BACKEND = 'BACKEND',
    FRONTEND = 'FRONTEND',
}

export interface Episode {
    number: number;
    date: Date;
    type: EpisodeType;
    hosts: Host[];
    news: News[];
}
