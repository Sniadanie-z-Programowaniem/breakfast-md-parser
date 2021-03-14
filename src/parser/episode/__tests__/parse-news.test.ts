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

    it('should parse when news url as sub-list, with multiple links', async () => {
        const md = `
- Open Web Docs
  - https://web.dev/open-web-docs/
  - https://opencollective.com/open-web-docs
  - https://hacks.mozilla.org/2021/01/welcoming-open-web-docs-to-the-mdn-family/
  - https://opencollective.com/open-web-docs/updates/introducing-open-web-docs
`;
        const expected: NewsToken = {
            title: 'Open Web Docs',
            description: '',
            links: [
                'https://web.dev/open-web-docs/',
                'https://opencollective.com/open-web-docs',
                'https://hacks.mozilla.org/2021/01/welcoming-open-web-docs-to-the-mdn-family/',
                'https://opencollective.com/open-web-docs/updates/introducing-open-web-docs',
            ],
        };

        const actual = await parseNews(await getListItemToken(md));

        expect(actual).toEqual(expected);
    });

    it('should parse when has url as sub-list and contains single-line description', async () => {
        const md = `
- Blitz.js - The Fullstack React Framework
  Blitz is a hyper-productive fullstack React framework that's built on Next.js and features a "Zero-API" data layer.

  - https://blitzjs.com/
`;
        const expected: NewsToken = {
            title: 'Blitz.js - The Fullstack React Framework',
            description: `Blitz is a hyper-productive fullstack React framework that's built on Next.js and features a "Zero-API" data layer.`,
            links: ['https://blitzjs.com/'],
        };

        const actual = await parseNews(await getListItemToken(md));

        expect(actual).toEqual(expected);
    });

    it('should parse when has urls as sub-list and contains single-line description with multiple links', async () => {
        const md = `
- Gather.town - wirtualne biuro w formie gierki, czy to ma sens?
  description description.

  - http://gather.town
  - https://news.ycombinator.com/item?id=25039370
`;
        const expected: NewsToken = {
            title: 'Gather.town - wirtualne biuro w formie gierki, czy to ma sens?',
            description: `description description.`,
            links: ['http://gather.town', 'https://news.ycombinator.com/item?id=25039370'],
        };

        const actual = await parseNews(await getListItemToken(md));

        expect(actual).toEqual(expected);
    });

    it('should parse when has urls as sub-list and links have extra text', async () => {
        const md = `
- Microsoft ogłasza dodatkowy support dla Blazora w IDE + wychodzą darmowe biblioteki komponentów open source
  Blazor nabiera tempa

  - 2. Komponenty: https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx
  - 1. IDE: https://visualstudiomagazine.com/articles/2021/01/26/razor-editor-updates.aspx
  - 3. StackTrends: https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor
`;
        const expected: NewsToken = {
            title:
                'Microsoft ogłasza dodatkowy support dla Blazora w IDE + wychodzą darmowe biblioteki komponentów open source',
            description: `Blazor nabiera tempa`,
            links: [
                'https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                'https://visualstudiomagazine.com/articles/2021/01/26/razor-editor-updates.aspx',
                'https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor',
            ],
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
