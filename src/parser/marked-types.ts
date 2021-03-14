import { Tokens } from 'marked';

// take a look at `marked.d.ts` file to check typings namespaces merge

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const asTokens = (tokens: any): Tokens.DiscriminatedToken[] => tokens;

export const isListToken = (item: Tokens.DiscriminatedToken): item is Tokens.TokenList =>
    item.type === 'list';

export const isTextToken = (item: Tokens.DiscriminatedToken): item is Tokens.Text =>
    item.type === 'text';

export const isLinkToken = (item: Tokens.DiscriminatedToken): item is Tokens.Link =>
    item.type === 'link';
