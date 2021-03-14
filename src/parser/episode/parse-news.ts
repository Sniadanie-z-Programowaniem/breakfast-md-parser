import { isDefined, linkFromListItem } from '../utils';
import { isLinkToken, isListToken, isTextToken } from '../marked-types';

import { BreakParsingError } from '../exceptions';
import { NewsToken } from './types';
import { Tokens } from 'marked';

const parseTitleAndDescriptionToken = (
    tokens: Tokens.DiscriminatedToken[],
): Pick<NewsToken, 'title' | 'description'> => {
    const titleToken = tokens?.find(isTextToken);

    if (!titleToken) {
        throw new BreakParsingError('News title not found');
    }

    const [title, ...descriptionLines] = titleToken.text.split(/\r?\n/);

    return {
        title,
        description: descriptionLines.join(' '),
    };
};

const whenTitleContainsLink = (titleTextTokens: Tokens.DiscriminatedToken[]): NewsToken => {
    const linkToken = titleTextTokens?.find(isLinkToken);

    if (!linkToken) {
        throw new BreakParsingError('News link not found');
    }

    return {
        ...parseTitleAndDescriptionToken(titleTextTokens),
        links: [linkToken.href],
    };
};

const whenLinksAreSubList = (itemTokens: Tokens.DiscriminatedToken[]): NewsToken => {
    const linksTokens = itemTokens
        ?.find(isListToken)
        ?.items.map(linkFromListItem)
        .filter(isDefined);

    if (!linksTokens) {
        throw new BreakParsingError('News links not found');
    }

    return {
        ...parseTitleAndDescriptionToken(itemTokens),
        links: linksTokens.map((link) => link.href),
    };
};

export const parseNews = (item: Tokens.ListItem): NewsToken => {
    if (!item.tokens) {
        throw new BreakParsingError('News root item does not contain any tokens');
    }

    const titleTextTokens = item.tokens
        .filter(isTextToken)
        .flatMap((textToken) => textToken.tokens)
        .filter(isDefined);

    if (titleTextTokens?.filter((token) => token.type !== 'text').length) {
        return whenTitleContainsLink(titleTextTokens);
    }

    return whenLinksAreSubList(item.tokens);
};
