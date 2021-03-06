import { EpisodeToken, NewsToken } from '../types';

import { BreakParsingError } from '../../exceptions';
import { parseEpisode } from '..';

describe('parse-episode', () => {
    describe('hosts', () => {
        it('should parse hosts with twitter handlers', async () => {
            const md = `
# Live 18.12.2020 #Front-end

Linkują:

-   [@michalczukm](https://twitter.com/michalczukm)
-   [@mmiszy](https://twitter.com/mmiszy)
-   [@cytrowski](https://twitter.com/cytrowski)

## Links

-   Virtual Event Starter Kit – Vercel Jumpstart your virtual event and scale to any size. Clone &
    deploy with one-click to Vercel, then customize for your event.

    -   https://vercel.com/virtual-event-starter-kit
            
`;

            const expected: EpisodeToken['hosts'] = [
                {
                    name: '@michalczukm',
                    twitterHandler: 'https://twitter.com/michalczukm',
                },
                {
                    name: '@mmiszy',
                    twitterHandler: 'https://twitter.com/mmiszy',
                },
                {
                    name: '@cytrowski',
                    twitterHandler: 'https://twitter.com/cytrowski',
                },
            ];

            const actual = await parseEpisode(md);

            expect(actual.hosts).toEqual(expected);
        });

        it('should parse hosts with linkedIn handlers', async () => {
            const md = `
# Live 27.11.2020 #Back-end

Linkują:

- [Marcin Kwiatkowski](https://www.linkedin.com/in/mkwiatko/?originalSubdomain=pl)
- [Mateusz Turzyński](https://www.linkedin.com/in/mateusz-turzy%C5%84ski-67a51419a)
- [Tomasz Gański](https://www.linkedin.com/in/tomaszganski)

## Linki

- Nowa wersja Spacy: Spacy 3.0
  https://nightly.spacy.io/usage/v3
`;

            const expected: EpisodeToken['hosts'] = [
                {
                    name: 'Marcin Kwiatkowski',
                    linkedInHandler: 'https://www.linkedin.com/in/mkwiatko/?originalSubdomain=pl',
                },
                {
                    name: 'Mateusz Turzyński',
                    linkedInHandler: 'https://www.linkedin.com/in/mateusz-turzy%C5%84ski-67a51419a',
                },
                {
                    name: 'Tomasz Gański',
                    linkedInHandler: 'https://www.linkedin.com/in/tomaszganski',
                },
            ];

            const actual = await parseEpisode(md);

            expect(actual.hosts).toEqual(expected);
        });

        it('should parse hosts with mixed twitter handlers or none', async () => {
            const md = `
# Live 18.12.2020 #Front-end

Linkują:

-   [@michalczukm](https://twitter.com/michalczukm)
-   [@mmiszy](https://twitter.com/mmiszy)
-   Przemysław Kosior

## Links

-   Virtual Event Starter Kit – Vercel Jumpstart your virtual event and scale to any size. Clone &
    deploy with one-click to Vercel, then customize for your event.

    -   https://vercel.com/virtual-event-starter-kit
            
`;

            const actual = await parseEpisode(md);

            expect(actual.hosts).toEqual([
                {
                    name: '@michalczukm',
                    twitterHandler: 'https://twitter.com/michalczukm',
                },
                {
                    name: '@mmiszy',
                    twitterHandler: 'https://twitter.com/mmiszy',
                },
                {
                    name: 'Przemysław Kosior',
                },
            ] as EpisodeToken['hosts']);
        });

        it('should parse hosts with external web page', async () => {
            const md = `
# Live 18.12.2020 #Front-end

Linkują:

- [michalczukm](https://michalczukm.xyz)
- [mmiszy](https://typeofweb.com/)
- [cytrowski](https://www.cytrowski.com/)

## Links

- Virtual Event Starter Kit – Vercel Jumpstart your virtual event and scale to any size. Clone &
  deploy with one-click to Vercel, then customize for your event.

  - https://vercel.com/virtual-event-starter-kit

`;
            const expected: EpisodeToken['hosts'] = [
                {
                    name: 'michalczukm',
                    webPage: 'https://michalczukm.xyz',
                },
                {
                    name: 'mmiszy',
                    webPage: 'https://typeofweb.com/',
                },
                {
                    name: 'cytrowski',
                    webPage: 'https://www.cytrowski.com/',
                },
            ];

            const actual = await parseEpisode(md);

            expect(actual.hosts).toEqual(expected);
        });

        it('should parse hosts without social media handlers', async () => {
            const md = `
# Live 27.11.2020 #Back-end

Linkują:

-   Marcin Kwiatkowski
-   Mateusz Turzyński
-   Łukasz Grzybowski
-   Tomasz Gański

## Linki

-   Nowa wersja Spacy: Spacy 3.0 https://nightly.spacy.io/usage/v3

`;
            const expected: EpisodeToken['hosts'] = [
                {
                    name: 'Marcin Kwiatkowski',
                },
                {
                    name: 'Mateusz Turzyński',
                },
                {
                    name: 'Łukasz Grzybowski',
                },
                {
                    name: 'Tomasz Gański',
                },
            ];

            const actual = await parseEpisode(md);

            expect(actual.hosts).toEqual(expected);
        });

        it('should throw an exception when hosts list not found', async () => {
            const md = `
# Live 27.11.2020 #Back-end

Linkują:
`;
            await expect(parseEpisode(md)).rejects.toThrowError(
                new BreakParsingError('Hosts list not found'),
            );
        });
    });

    describe('news', () => {
        it('should parse news', async () => {
            const md = `
# Live 27.11.2020 #Back-end

Linkują:

-   Marcin Kwiatkowski
-   Mateusz Turzyński
-   Łukasz Grzybowski
-   [Tomasz Gański](https://www.linkedin.com/in/tomaszganski)

## Linki

- Nowa wersja Spacy: Spacy 3.0
  https://nightly.spacy.io/usage/v3

- Guido van Rossum dołącza do Microsoftu
  https://www.centrumxp.pl/Publikacja/Microsoft-zatrudnil-tworce-Pythona-Guido-van-Rossuma-To-swietny-ruch

- .NET Core dostępny w Google Cloud Functions
  https://cloud.google.com/blog/products/application-development/introducing-net-google-cloud-functions

- M1X
  https://thinkapple.pl/2020/11/24/nowy-imac-macbook-pro-16-z-m1-x-2021/

- Nx cloud
  Poniżej też nasza prezka gdzie wspominamy nx

  - https://nx.app/
  - https://www.youtube.com/watch?v=99ZtVKG5PzI
  - https://nx.dev/
`;

            const expected: NewsToken[] = [
                {
                    title: 'Nowa wersja Spacy: Spacy 3.0',
                    description: '',
                    links: ['https://nightly.spacy.io/usage/v3'],
                },
                {
                    title: 'Guido van Rossum dołącza do Microsoftu',
                    description: '',
                    links: [
                        'https://www.centrumxp.pl/Publikacja/Microsoft-zatrudnil-tworce-Pythona-Guido-van-Rossuma-To-swietny-ruch',
                    ],
                },
                {
                    title: '.NET Core dostępny w Google Cloud Functions',
                    description: '',
                    links: [
                        'https://cloud.google.com/blog/products/application-development/introducing-net-google-cloud-functions',
                    ],
                },
                {
                    title: 'M1X',
                    description: '',
                    links: [
                        'https://thinkapple.pl/2020/11/24/nowy-imac-macbook-pro-16-z-m1-x-2021/',
                    ],
                },
                {
                    title: 'Nx cloud',
                    description: 'Poniżej też nasza prezka gdzie wspominamy nx',
                    links: [
                        'https://nx.app/',
                        'https://www.youtube.com/watch?v=99ZtVKG5PzI',
                        'https://nx.dev/',
                    ],
                },
            ];

            const actual = await parseEpisode(md);

            expect(actual.news).toEqual(expected);
        });

        it('should throw an exception when links news not found', async () => {
            const md = `
# Live 27.11.2020 #Back-end

Linkują:

-   Marcin Kwiatkowski
-   Mateusz Turzyński
-   Łukasz Grzybowski
-   Tomasz Gański

## Linki
    `;
            await expect(parseEpisode(md)).rejects.toThrowError(
                new BreakParsingError('News list not found'),
            );
        });
    });
});
