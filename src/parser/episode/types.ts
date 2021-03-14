export interface HostToken {
    name: string;
    twitterHandler?: string;
    githubHandler?: string;
}

export interface NewsToken {
    title: string;
    description: string;
    links: string[];
}

export interface EpisodeToken {
    hosts: HostToken[];
    news: NewsToken[];
}
