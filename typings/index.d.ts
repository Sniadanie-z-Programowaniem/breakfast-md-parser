import * as marked from 'marked';

// looks like typings are not up 2 date. Temp solution
declare module 'marked' {
    namespace Tokens {
        // `Def` type doesn't have type, so we cannot use it as discriminated union with it
        export type DiscriminatedToken = (
            | Exclude<marked.Token, marked.Tokens.Def | Tokens.List>
            | marked.Tokens.Link
            | TokenList
        ) & { tokens?: DiscriminatedToken[] };
        export type TokenList = Omit<marked.Tokens.List, 'type'> & { type: 'list' };
        export interface Text {
            tokens?: DiscriminatedToken[];
        }
        export interface ListItem {
            tokens?: DiscriminatedToken[];
        }
        export interface Tag {
            tokens?: DiscriminatedToken[];
        }
    }
}
