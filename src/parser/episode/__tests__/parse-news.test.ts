import { asTokens, isListToken } from '../../marked-types';

import { NewsToken } from '../types';
import { Tokens } from 'marked';
import { parseNews } from '../parse-news';
import { tokenize } from '../../tokenize';

describe('parse-news', () => {
    it('should parse when news have url in description', async () => {
        const md = `
- Nowa wersja Spacy: Spacy 3.0
  https://nightly.spacy.io/usage/v3
`;
        const expected: NewsToken = {
            title: 'Nowa wersja Spacy: Spacy 3.0',
            description: '',
            links: ['https://nightly.spacy.io/usage/v3'],
        };

        const actual = await parseNews(await getListItemToken(md));

        expect(actual).toEqual(expected);
    });

    it('should parse when news url as sub-list', async () => {
        const md = `
- 4Developers 2020, Michał Michalczuk, Mateusz Turzyński .NET: What's Blazor - Front .NET
  - https://www.youtube.com/watch?v=P-QMHJiVrlk
`;
        const expected: NewsToken = {
            title:
                "4Developers 2020, Michał Michalczuk, Mateusz Turzyński .NET: What's Blazor - Front .NET",
            description: '',
            links: ['https://www.youtube.com/watch?v=P-QMHJiVrlk'],
        };

        const actual = await parseNews(await getListItemToken(md));

        expect(actual).toEqual(expected);
    });

    async function getListItemToken(content: string): Promise<Tokens.ListItem> {
        const listToken: Tokens.List | undefined = asTokens(await tokenize(content)).find(
            isListToken,
        );

        const listItemToken = listToken?.items?.[0];

        expect(listItemToken).toBeDefined();

        if (!listItemToken) {
            throw new Error(
                'List item not found in test - looks like, there is bug in test, or incorrect MD was prepared',
            );
        }

        return listItemToken;
    }
});
