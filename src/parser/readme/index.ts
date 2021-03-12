import { BreakParsingError, assertParsingCondition } from '../exceptions';
import { Episode, EpisodeType } from '../../model/episode';
import { asTokens, isListToken } from '../marked-types';

import { EpisodeListItemModel } from './types';
import { Tokens } from 'marked';
import { linkFromListItem } from '../utils';
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

        const dateTime = parse(dateString, 'dd.MM.yyyy', new Date());
        const dateOnly = new Date(dateTime.valueOf() - dateTime.getTimezoneOffset() * 60 * 1000);

        return {
            type: mapEpisodeType(type),
            number: +episodeNumber,
            date: dateOnly,
        };
    }

    logger.error('Episode token is not text one', { token: item });

    // todo switch to rolling Result object than errors
    throw new BreakParsingError('Cannot parse episode name');
};

const parseEpisode = (item: Tokens.ListItem): EpisodeListItemModel => {
    const [nameToken, episodeLinksTokens] = item.tokens || [];

    // const episodesLinksIsList = ;
    if (!isListToken(episodeLinksTokens)) {
        assertParsingCondition(true, 'Episodes list is not a list token');
        throw new Error('');
    }

    const [streamLinkItem, episodeFileLinkItem] = episodeLinksTokens.items;

    const streamUrlToken = linkFromListItem(streamLinkItem);
    const episodeFileLinkToken = linkFromListItem(episodeFileLinkItem);

    if (!streamUrlToken) {
        throw new BreakParsingError('Stream URL not found');
    }

    if (!episodeFileLinkToken) {
        throw new BreakParsingError('Episode file link not found');
    }

    return {
        ...parseEpisodeName(nameToken),
        streamUrl: streamUrlToken.href,
        episodeFileLink: episodeFileLinkToken.href,
    };
};

const parseEpisodesList = (list: Tokens.TokenList): EpisodeListItemModel[] =>
    list.items.map(parseEpisode);

export const parseReadme = async (content: string): Promise<EpisodeListItemModel[]> => {
    const tokens: Tokens.DiscriminatedToken[] = asTokens(await tokenize(content));

    const episodesList = tokens.find((t) => t.type === 'list');

    if (!episodesList || episodesList?.type !== 'list') {
        logger.error('Episodes list not found', {});
        throw new BreakParsingError('Episodes list not found');
    }

    return parseEpisodesList(episodesList);
};

export * from './types';
