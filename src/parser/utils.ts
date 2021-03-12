import { Tokens } from 'marked';

export const linkFromListItem = (item: Tokens.ListItem): Tokens.Link | undefined => {
    const link = item.tokens
        ?.flatMap((i) => i.tokens)
        .filter(Boolean)
        .find((token) => token?.type === 'link') as Tokens.Link | undefined;

    return link;
};
