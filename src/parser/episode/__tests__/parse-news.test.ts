import { NewsToken } from '../types';
import { getListItemToken } from './test-utils';
import { parseNews } from '../parse-news';

describe('parseNews', () => {
    describe('news url in description', () => {
        it('should parse with simple title', async () => {
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

        it('should parse when title has square brackets', async () => {
            const md = `
- [Event] Hacknarok
  https://hacknarok.eestec.pl/
    `;
            const expected: NewsToken = {
                title: '[Event] Hacknarok',
                description: '',
                links: ['https://hacknarok.eestec.pl/'],
            };

            const actual = await parseNews(await getListItemToken(md));

            expect(actual).toEqual(expected);
        });
    });
    describe('news url(s) in sub-list', () => {
        it('should parse with simple title', async () => {
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

        it('should parse with multiple links', async () => {
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

        it('should parse when contains single-line description', async () => {
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

        it('should parse when contains multi-line description', async () => {
            const md = `
- GitHub CLI 1.0 is now available - The GitHub Blog
  GitHub CLI brings GitHub to your terminal. It reduces context switching, helps you focus, and enables you to more easily script and create your own workflows. Earlier this year, we announced the beta of GitHub
    
  users have created over 250,000 pull requests, performed over 350,000 merges, and created over 20,000 issues with GitHub CLI.
        
  - https://github.blog/2020-09-17-github-cli-1-0-is-now-available/`;
            const expected: NewsToken = {
                title: 'GitHub CLI 1.0 is now available - The GitHub Blog',
                description: `GitHub CLI brings GitHub to your terminal. It reduces context switching, helps you focus, and enables you to more easily script and create your own workflows. Earlier this year, we announced the beta of GitHub\nusers have created over 250,000 pull requests, performed over 350,000 merges, and created over 20,000 issues with GitHub CLI.`,
                links: ['https://github.blog/2020-09-17-github-cli-1-0-is-now-available/'],
            };

            const actual = await parseNews(await getListItemToken(md));

            expect(actual).toEqual(expected);
        });

        it('should parse when contains multi-line description with markdown', async () => {
            const md = `
- Spartez ma się dobrze
	Rekrutujemy! https://spartez.com/jobs
	
	(https://justjoin.it/live lepsze niż Condor bo weryfikuje wpisy)
	
	Wspominaliśmy o Charity Kudos wcześniej - po pierwszym kwartale:
	
	- Fundacja Dzieciom - Adam Stępski (19)
	- OTOZ (Ogólnopolskie Towarzystwo Ochrony Zwierząt) (5)
	- Na Ratunek (4)
	
	Mimo kryzysu związanego z epidemią firma ma się dobrze i komunikuje to z pracownikami otwarcie.
	
	Dzięki temu pojawiło się oddolnie kilka nowych akcji:
	
	Laptopy dla nauczycieli (12 macbooków)
	Zbiórka dla szpitala zakaźnego (17 500 PLN)
	

  - https://justjoin.it/live
  - https://spartez.com/jobs
`;
            const expected: NewsToken = {
                title: 'Spartez ma się dobrze',
                description: `Rekrutujemy! https://spartez.com/jobs
  (https://justjoin.it/live lepsze niż Condor bo weryfikuje wpisy)
  Wspominaliśmy o Charity Kudos wcześniej - po pierwszym kwartale:
  Mimo kryzysu związanego z epidemią firma ma się dobrze i komunikuje to z pracownikami otwarcie.
  Dzięki temu pojawiło się oddolnie kilka nowych akcji:
  Laptopy dla nauczycieli (12 macbooków)
  Zbiórka dla szpitala zakaźnego (17 500 PLN)`,
                links: ['https://justjoin.it/live', 'https://spartez.com/jobs'],
            };

            const actual = await parseNews(await getListItemToken(md));

            expect(actual).toEqual(expected);
        });

        it('should parse when contains single-line description with multiple links', async () => {
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

        it('should parse when links have extra text', async () => {
            const md = `
- Koniec płatnych rozszerzeń do chrome
  - google-paid-chrome-extension-monetize-shut-down-end: https://www.theverge.com/2020/9/22/21451111/google-paid-chrome-extension-monetize-shut-down-end`;
            const expected: NewsToken = {
                title: 'Koniec płatnych rozszerzeń do chrome',
                description: '',
                links: [
                    'https://www.theverge.com/2020/9/22/21451111/google-paid-chrome-extension-monetize-shut-down-end',
                ],
            };

            const actual = await parseNews(await getListItemToken(md));

            expect(actual).toEqual(expected);
        });

        it('should parse when links have extra text containing long id', async () => {
            const md = `
- Odczyt/zapis do lokalnego pliku w Chrome
  - 1313798240043753473?s=19: https://twitter.com/sulco/status/1313798240043753473?s=19
    `;
            const expected: NewsToken = {
                title: 'Odczyt/zapis do lokalnego pliku w Chrome',
                description: '',
                links: ['https://twitter.com/sulco/status/1313798240043753473?s=19'],
            };

            const actual = await parseNews(await getListItemToken(md));

            expect(actual).toEqual(expected);
        });

        it('should parse when links have extra text which is ordered list', async () => {
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
                description: 'Blazor nabiera tempa',
                links: [
                    'https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                    'https://visualstudiomagazine.com/articles/2021/01/26/razor-editor-updates.aspx',
                    'https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor',
                ],
            };

            const actual = await parseNews(await getListItemToken(md));

            expect(actual).toEqual(expected);
        });
    });

    describe('news url in title', () => {
        it('should parse when url is in title and as single sub-list element', async () => {
            const md = `
- https://github.com/antfu/reactivue
  - https://github.com/antfu/reactivue
`;
            const expected: NewsToken = {
                title: 'https://github.com/antfu/reactivue',
                description: '',
                links: ['https://github.com/antfu/reactivue'],
            };

            const actual = await parseNews(await getListItemToken(md));

            expect(actual).toEqual(expected);
        });

        it('should parse when url is in title and has multiple urls on sub-list', async () => {
            const md = `
- https://github.com/antfu/reactivue
  - https://github.com/antfu/reactivue
  - https://github.com/tannerlinsley/react-query
`;
            const expected: NewsToken = {
                title: 'https://github.com/antfu/reactivue',
                description: '',
                links: [
                    'https://github.com/antfu/reactivue',
                    'https://github.com/tannerlinsley/react-query',
                ],
            };

            const actual = await parseNews(await getListItemToken(md));

            expect(actual).toEqual(expected);
        });
    });

    it('should parse when news has urls as sub-list and extra one in description', async () => {
        const md = `
- HTTP/3 is finally happening!Last week: Cloudflare begins emailing users that H3 will be automatically enabled starting this month.Today: Chrome Stable at 25% rollout!https://t.co/jahksz05CY— fks (@FredKSchott) October 7, 2020
  - https://twitter.com/FredKSchott/status/1313910775199612929
`;
        const expected: NewsToken = {
            title:
                'HTTP/3 is finally happening!Last week: Cloudflare begins emailing users that H3 will be automatically enabled starting this month.Today: Chrome Stable at 25% rollout!https://t.co/jahksz05CY— fks (@FredKSchott) October 7, 2020',
            description: '',
            links: ['https://twitter.com/FredKSchott/status/1313910775199612929'],
        };

        const actual = await parseNews(await getListItemToken(md));

        expect(actual).toEqual(expected);
    });
});
