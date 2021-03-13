export enum EpisodeTypeToken {
    BACKEND = 'BACKEND',
    FRONTEND = 'FRONTEND',
}

export interface EpisodeListItemToken {
    number: number;
    date: Date;
    type: EpisodeTypeToken;
    streamUrl: string;
    episodeFileLink: string;
}

export interface ReadmeToken {
    episodes: EpisodeListItemToken[];
}
