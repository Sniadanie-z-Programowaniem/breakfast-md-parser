import { EpisodeToken, HostToken } from './types';

import { BreakParsingError } from '../exceptions';
import { Tokens } from 'marked';
import { asTokens } from '../marked-types';
import { linkFromListItem } from '../utils';
import { logger } from '../parser-logger';
import { tokenize } from '../tokenize';

const parseSocialLink = (socialLink: Tokens.Link): HostToken => ({
    name: socialLink.text.trim(),
    twitterHandler: (socialLink.href.match(/\btwitter\.com\b/) && socialLink.href) || undefined,
    githubHandler: (socialLink.href.match(/\bgithub\.com\b/) && socialLink.href) || undefined,
});

const parseHost = (item: Tokens.ListItem): HostToken => {
    const socialLink = linkFromListItem(item);

    if (!socialLink) {
        return {
            name: item.text?.trim(),
        };
    }

    return parseSocialLink(socialLink);
};

const parseHosts = (hosts: Tokens.TokenList): HostToken[] => hosts.items.map(parseHost);

export const parseEpisode = async (content: string): Promise<EpisodeToken> => {
    const tokens: Tokens.DiscriminatedToken[] = asTokens(await tokenize(content));

    // first list is always the hosts list
    const hostsList = tokens.find((token) => token.type === 'list');

    if (!hostsList || hostsList?.type !== 'list') {
        logger.error('Episodes list not found', {});
        throw new BreakParsingError('Episodes list not found');
    }

    return {
        hosts: parseHosts(hostsList),
        news: [],
    };
};
