import { Episode, EpisodeType } from '../model/episode';
import { EpisodeInfoToken, EpisodeTypeToken } from './readme';

import { EpisodeToken } from './episode/types';

const mapEpisodeType = (infoToken: EpisodeInfoToken): EpisodeType => {
    switch (infoToken.type) {
        case EpisodeTypeToken.BACKEND:
            return EpisodeType.BACKEND;
        case EpisodeTypeToken.FRONTEND:
            return EpisodeType.FRONTEND;
    }
};

export const mapToEpisode = (episodeToken: EpisodeToken, infoToken: EpisodeInfoToken): Episode => {
    return {
        date: infoToken.date,
        number: infoToken.number,
        type: mapEpisodeType(infoToken),
        hosts: episodeToken.hosts,
        news: episodeToken.news.map((token) => ({
            title: token.title,
            description: token.description,
            links: token.links.map((linkToken) => ({
                url: linkToken,
            })),
        })),
    };
};
