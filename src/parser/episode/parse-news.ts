import { isDefined, linkFromListItem, linksFromNestedList } from '../utils';
import { isLinkToken, isListToken, isTextToken } from '../marked-types';

import { BreakParsingError } from '../exceptions';
import { NewsToken } from './types';
import { Tokens } from 'marked';
import findLast from 'lodash/findLast';

const parseTitleAndDescriptionToken = (
    tokens: Tokens.DiscriminatedToken[],
): Pick<NewsToken, 'title' | 'description'> => {
    const [titleToken, ...extraDescriptionTokens] = tokens?.filter(isTextToken);

    if (!titleToken) {
        throw new BreakParsingError('News title not found');
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
        throw new BreakParsingError('News links not found');
    }

    return {
        ...parseTitleAndDescriptionToken(itemTokens),
        links: parseLinksFromList(listToken),
    };
};

export const parseNews = (item: Tokens.ListItem): NewsToken => {
    if (!item.tokens) {
        throw new BreakParsingError('News root item does not contain any tokens');
    }

    const containsLinksList = !!findLast(item.tokens, isListToken);

    return (containsLinksList ? whenLinksAreSubList : whenTitleContainsLink)(item.tokens);
};
