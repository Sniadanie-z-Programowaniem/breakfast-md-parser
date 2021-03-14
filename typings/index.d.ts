import * as marked from 'marked';

// looks like typings are not up 2 date. Temp solution
declare module 'marked' {
    namespace Tokens {
        // `Def` type doesn't have type, so we cannot use it as discriminated union with it
        // Below we're using only limited set of tokens - to simplify our case
        export type DiscriminatedToken = (
            | Extract<
                  Exclude<
                      marked.Token,
                      | marked.Tokens.Def
                      | marked.Tokens.Space
                      | marked.Tokens.Tag
                      | marked.Tokens.List
                  >,
                  { type: string }
              >
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
