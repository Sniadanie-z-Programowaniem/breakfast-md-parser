import { EpisodeInfoToken, EpisodeTypeToken, ReadmeToken } from './types';
import { asTokens, isListToken, isTextToken } from '../marked-types';

import { BreakParsingError } from '../exceptions';
import { Tokens } from 'marked';
import { linkFromListItem } from '../utils';
import { logger } from '@bf-md/common';
import { parse } from 'date-fns';
import { tokenize } from '../tokenize';

type EpisodeMetaToken = Pick<EpisodeInfoToken, 'date' | 'number' | 'type'>;

const mapEpisodeType = (type: string): EpisodeTypeToken => {
    switch (type) {
        case 'Front-end':
            return EpisodeTypeToken.FRONTEND;
        case 'Back-end':
            return EpisodeTypeToken.BACKEND;
        default:
            logger.error('Unknown episode type', { type });
            throw new BreakParsingError('Unknown episode type');
    }
};

const parseEpisodeMeta = (item: Tokens.DiscriminatedToken): EpisodeMetaToken => {
    if (isTextToken(item)) {
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

    logger.error('Episode title token is not text token', { token: item });

    // todo switch to rolling Result object than errors
    throw new BreakParsingError('Episode title token is not text token');
};

const parseEpisode = (item: Tokens.ListItem): EpisodeInfoToken => {
    const [nameToken, episodeLinksTokens] = item.tokens || [];

    if (!isListToken(episodeLinksTokens) || episodeLinksTokens.items.length < 2) {
        logger.error('Episodes list is not a list token', { token: item });
        throw new BreakParsingError('Episodes list is not a list token');
    }

    const [streamLinkItem, episodeFileLinkItem] = episodeLinksTokens.items;

    const streamUrlToken = linkFromListItem(streamLinkItem);
    const episodeFileLinkToken = linkFromListItem(episodeFileLinkItem);

    if (!streamUrlToken) {
        logger.error('Stream URL not found', { token: item });
        throw new BreakParsingError('Stream URL not found');
    }

    if (!episodeFileLinkToken) {
        logger.error('Episode file link not found', { token: item });
        throw new BreakParsingError('Episode file link not found');
    }

    return {
        ...parseEpisodeMeta(nameToken),
        streamUrl: streamUrlToken.href,
        episodeFileLink: episodeFileLinkToken.href,
    };
};

const parseEpisodesList = (list: Tokens.TokenList): EpisodeInfoToken[] =>
    list.items.map(parseEpisode);

export const parseReadme = async (content: string): Promise<ReadmeToken> => {
    const tokens: Tokens.DiscriminatedToken[] = asTokens(await tokenize(content));

    const episodesList = tokens.find(isListToken);

    if (!episodesList) {
        logger.error('Episodes list not found', { token: tokens });
        throw new BreakParsingError('Episodes list not found');
    }

    return {
        episodes: parseEpisodesList(episodesList),
    };
};

export * from './types';
