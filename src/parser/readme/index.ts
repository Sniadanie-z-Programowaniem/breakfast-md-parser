import { Episode, EpisodeType } from '../../model/episode';

import { BreakParsingError } from '../exceptions';
import { ReadmeModel } from './types';
import { Tokens } from 'marked';
import { asTokens } from '../marked-types';
import { logger } from '../parser-logger';
import { parse } from 'date-fns';
import { tokenize } from '../tokenize';

type EpisodeThread = Pick<Episode, 'date' | 'number' | 'type'>;

const mapEpisodeType = (type: string): EpisodeType => {
    switch (type) {
        case 'Front-end':
            return EpisodeType.FRONTEND;
        case 'Back-end':
            return EpisodeType.BACKEND;
        default:
            logger.error('Unknown episode type', { type });
            throw new BreakParsingError('Unknown episode type');
    }
};

const parseEpisodeName = (item: Tokens.DiscriminatedToken): EpisodeThread => {
    if (item.type === 'text') {
        const [, type, episodeNumber, dateString] =
            item.text.match(/^\[(.*)\].*#(\d*), (.*)$/) || [];

        const date = parse(dateString, 'dd.MM.yyyy', new Date());

        return {
            type: mapEpisodeType(type),
            number: +episodeNumber,
            date,
        };
    }

    logger.error('Episode token is not text one', { token: item });

    // todo switch to rolling Result object than errors
    throw new BreakParsingError('Cannot parse episode name');
};

const parseEpisode = (item: Tokens.ListItem): EpisodeThread => {
    // todo second element in array is linksToken - handle it
    const [nameToken] = item.tokens || [];

    return parseEpisodeName(nameToken);
};

const parseEpisodesList = (list: Tokens.TokenList): EpisodeThread[] => list.items.map(parseEpisode);

export const parseReadme = async (content: string): Promise<ReadmeModel[]> => {
    const tokens: Tokens.DiscriminatedToken[] = asTokens(await tokenize(content));

    const episodesList = tokens.find((t) => t.type === 'list');

    if (!episodesList || episodesList?.type !== 'list') {
        logger.error('Episodes list not found', {});
        throw new BreakParsingError('Episodes list not found');
    }

    return parseEpisodesList(episodesList);
};

export * from './types';
