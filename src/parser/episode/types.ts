import { News } from '../../model/news';

export interface HostToken {
    name: string;
    twitterHandler?: string;
    githubHandler?: string;
}

export interface EpisodeToken {
    hosts: HostToken[];
    news: News[];
}
