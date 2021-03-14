export interface SocialHandlerToken {
    twitterHandler?: string;
    githubHandler?: string;
    linkedInHandler?: string;
    webPage?: string;
}

export interface HostToken extends SocialHandlerToken {
    name: string;
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
