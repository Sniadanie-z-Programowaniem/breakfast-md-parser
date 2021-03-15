import { isDefined, linkFromListItem, linksFromNestedList } from '../utils';
import { isLinkToken, isListToken, isTextToken } from '../marked-types';

import { BreakParsingError } from '../exceptions';
import { NewsToken } from './types';
import { Tokens } from 'marked';
import findLast from 'lodash/findLast';
import { logger } from '@bf-md/common';

const whenTitleIsText = (tokens: Tokens.Text[]): Pick<NewsToken, 'title' | 'description'> => {
    const [titleToken, ...extraDescriptionTokens] = tokens;

    if (!titleToken) {
        logger.error('News title not found, suppose to be text', { tokens });
        throw new BreakParsingError('News title not found, suppose to be text');
    }

    const [title, ...descriptionLines] = titleToken.text.split(/\r?\n/);

    const description = [...descriptionLines, ...extraDescriptionTokens.map((token) => token.text)]
        .join('\n')
        .trim();

    return {
        title,
        description,
    };
};

const whenTitleIsOnlyLink = (tokens: Tokens.Link[]): Pick<NewsToken, 'title' | 'description'> => {
    const [titleToken] = tokens;

    if (!titleToken) {
        logger.error('News title not found, suppose to be a link', { tokens });
        throw new BreakParsingError('News title not found, suppose to be a link');
    }

    return {
        title: titleToken.text,
        description: '',
    };
};

const parseTitleAndDescriptionToken = (
    tokens: Tokens.DiscriminatedToken[],
): Pick<NewsToken, 'title' | 'description'> => {
    const textTokens = tokens?.filter(isTextToken);
    if (textTokens.length > 0) {
        return whenTitleIsText(textTokens);
    }

    const linkTokens = tokens?.filter(isLinkToken);
    if (linkTokens.length > 0) {
        return whenTitleIsOnlyLink(linkTokens);
    }

    logger.error('News title not found', { tokens });
    throw new BreakParsingError('News title not found');
};

const parseLinksFromList = (listToken: Tokens.List): NewsToken['links'] => {
    const linksFromFlatList = listToken.items.map(linkFromListItem).filter(isDefined);

    return (linksFromFlatList.length > 0 ? linksFromFlatList : linksFromNestedList(listToken)).map(
        (link) => link.href,
    );
};

const whenTitleContainsLink = (itemTokens: Tokens.DiscriminatedToken[]): NewsToken => {
    const titleTextTokens = itemTokens
        .filter(isTextToken)
        .flatMap((textToken) => textToken.tokens)
        .filter(isDefined);

    const linkToken = titleTextTokens.find(isLinkToken);

    if (!linkToken) {
        logger.error('News link not found, title suppose to contain link', { tokens: itemTokens });
        throw new BreakParsingError('News link not found');
    }

    return {
        ...parseTitleAndDescriptionToken(titleTextTokens),
        links: [linkToken.href],
    };
};

const whenLinksAreSubList = (itemTokens: Tokens.DiscriminatedToken[]): NewsToken => {
    const listToken = findLast(itemTokens, isListToken);

    if (!listToken) {
        logger.error('News link not found, links suppose to be as sub-list', {
            tokens: itemTokens,
        });
        throw new BreakParsingError('News links not found');
    }

    return {
        ...parseTitleAndDescriptionToken(itemTokens),
        links: parseLinksFromList(listToken),
    };
};

export const parseNews = (item: Tokens.ListItem): NewsToken => {
    if (!item.tokens) {
        logger.error('News root item does not contain any tokens', {
            token: item,
        });
        throw new BreakParsingError('News root item does not contain any tokens');
    }

    const containsLinksList = !!findLast(item.tokens, isListToken);

    return (containsLinksList ? whenLinksAreSubList : whenTitleContainsLink)(item.tokens);
};
