import { Tokens } from 'marked';
import { isLinkToken } from './marked-types';

export const isDefined = <T>(item: T | undefined): item is T => !!item;

export const linkFromListItem = (item: Tokens.ListItem): Tokens.Link | undefined => {
    const link = item.tokens
        ?.flatMap((i) => i.tokens)
        .filter(isDefined)
        .find(isLinkToken);

    return link;
};
