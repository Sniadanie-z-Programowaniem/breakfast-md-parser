import { isLinkToken, isListToken } from './marked-types';

import { Tokens } from 'marked';

export const isDefined = <T>(item: T | undefined): item is T => !!item;

export const linkFromListItem = (item: Tokens.ListItem): Tokens.Link | undefined =>
    item.tokens
        ?.flatMap((itemToken) => itemToken.tokens)
        .filter(isDefined)
        .find(isLinkToken);

export const linksFromNestedList = (item: Tokens.List): Tokens.Link[] => {
    const listItemWithLinksToken = item.items
        .flatMap((itemToken) => itemToken.tokens)
        .filter(isDefined)
        .filter(isListToken)
        .flatMap((listToken) => listToken.items);

    return listItemWithLinksToken.map(linkFromListItem).filter(isDefined);
};
