import { BreakParsingError } from './parser/exceptions';
import { EpisodeThread } from './fiber';
import { EpisodeType } from './model/episode';
import { Tokens } from 'marked';
import { asTokens } from './parser/marked-types';
import { promises as fs } from 'fs';
import { logger } from './parser/parser-logger';
import markedJsUsage from './marked-js-usage';
import { parse } from 'date-fns';
import path from 'path';

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

const parseReadme = async (path: string) => {
    const readmeContent = await fs.readFile(path, {
        encoding: 'utf-8',
    });

    const tokens: Tokens.DiscriminatedToken[] = asTokens(await markedJsUsage(readmeContent));

    const episodesList = tokens.find((t) => t.type === 'list');

    if (!episodesList || episodesList?.type !== 'list') {
        logger.error('Episodes list not found', {});
        throw new BreakParsingError('Episodes list not found');
    }

    console.log(parseEpisodesList(episodesList));
};

const run = async () => {
    parseReadme(path.join(__dirname, '..', 'test-data', 'README.md'));
};

run();
