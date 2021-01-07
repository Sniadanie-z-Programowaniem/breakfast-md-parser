import { Tokens } from 'marked';

// take a look at `marked.d.ts` file to check typings namespaces merge

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const asTokens = (tokens: any): Tokens.DiscriminatedToken[] => tokens;
