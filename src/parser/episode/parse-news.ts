import { isDefined, linkFromListItem } from '../utils';
import { isLinkToken, isListToken, isTextToken } from '../marked-types';

import { BreakParsingError } from '../exceptions';
import { NewsToken } from './types';
import { Tokens } from 'marked';

const whenTitleContainsLink = (titleTextTokens?: Tokens.DiscriminatedToken[]): NewsToken => {
    const titleToken = titleTextTokens?.find(isTextToken);
    const linkToken = titleTextTokens?.find(isLinkToken);

    if (!titleToken) {
        throw new BreakParsingError('News title not found');
    }

    if (!linkToken) {
        throw new BreakParsingError('News link not found');
    }

    return {
        title: titleToken.text.trim(),
        description: '',
        links: [linkToken.href],
    };
};

const whenLinksAreSubList = (itemTokens?: Tokens.DiscriminatedToken[]): NewsToken => {
    const titleToken = itemTokens?.find(isTextToken);

    if (!titleToken) {
        throw new BreakParsingError('News title not found');
    }

    const linksTokens = itemTokens
        ?.find(isListToken)
        ?.items.map(linkFromListItem)
        .filter(isDefined);

    if (!linksTokens) {
        throw new BreakParsingError('News links not found');
    }

    return {
        title: titleToken.text.trim(),
        description: '',
        links: linksTokens.map((link) => link.href),
    };
};

export const parseNews = (item: Tokens.ListItem): NewsToken => {
    console.log('item', JSON.stringify(item, null, 2));

    const titleTextTokens = item.tokens
        ?.filter(isTextToken)
        .flatMap((textToken) => textToken.tokens)
        .filter(isDefined);

    if (titleTextTokens?.filter((token) => token.type !== 'text').length) {
        return whenTitleContainsLink(titleTextTokens);
    }

    return whenLinksAreSubList(item.tokens);
};
