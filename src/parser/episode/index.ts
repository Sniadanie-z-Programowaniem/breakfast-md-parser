import { EpisodeToken, HostToken, NewsToken } from './types';
import { asTokens, isListToken } from '../marked-types';

import { BreakParsingError } from '../exceptions';
import { Tokens } from 'marked';
import { linkFromListItem } from '../utils';
import { parseNews } from './parse-news';
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

const parseHostsList = (listToken: Tokens.TokenList): HostToken[] => listToken.items.map(parseHost);

const parseNewsList = (listToken: Tokens.TokenList): NewsToken[] => listToken.items.map(parseNews);

export const parseEpisode = async (content: string): Promise<EpisodeToken> => {
    const tokens: Tokens.DiscriminatedToken[] = asTokens(await tokenize(content));

    // two lists are standard structure of episode file
    const [hostsListToken, newsListToken] = tokens.filter(isListToken);

    if (!hostsListToken) {
        throw new BreakParsingError('Hosts list not found');
    }

    if (!newsListToken) {
        throw new BreakParsingError('News list not found');
    }

    return {
        hosts: parseHostsList(hostsListToken),
        news: parseNewsList(newsListToken),
    };
};
