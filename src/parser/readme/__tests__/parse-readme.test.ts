import { EpisodeListItemModel, parseReadme } from '..';

import { EpisodeType } from '../../../model/episode';

describe('parse-readme', () => {
    describe('should parse', () => {
        it('when given readme with dash list syntax', async () => {
            const md = `
![top shot](./assets/top-shot.png)

# Śniadanie z Programowaniem

> Na tym repozytorium znajdziesz linki które publikujemy w ramach nagrań "Śniadanie z
> Programowaniem" na kanale [JustJoin IT](https://justjoin.it/).

Wszystkie nagrania -->
[facebook JustJoinIT](https://www.facebook.com/watch/JustJoinIT/1096965710647774/)

## Odcinki:

-   [Front-end] Śniadanie z programowaniem #65, 18.12.2020
    -   [video](https://www.youtube.com/watch?v=ZlQu4gcXmtA)
    -   [linki](./episodes/65.md)
-   [Back-end] Śniadanie z programowaniem #64, 11.12.2020
    -   [video](https://www.youtube.com/watch?v=nd-ncGlhhBY)
    -   [linki](./episodes/64.md)
-   [Front-end] Śniadanie z programowaniem #63, 04.12.2020
    -   [video](https://www.youtube.com/watch?v=ycfmC5qZLpo)
    -   [linki](./episodes/63.md)
-   [Back-end] Śniadanie z programowaniem #62, 27.11.2020
    -   [video](https://www.youtube.com/watch?v=XzYuiteMsOw)
    -   [linki](./episodes/62.md)
`;

            const actual = await parseReadme(md);
            const expected: EpisodeListItemModel[] = [
                {
                    type: EpisodeType.FRONTEND,
                    number: 65,
                    date: new Date('2020-12-18'),
                    streamUrl: 'https://www.youtube.com/watch?v=ZlQu4gcXmtA',
                    episodeFileLink: './episodes/65.md',
                },
                {
                    type: EpisodeType.BACKEND,
                    number: 64,
                    date: new Date('2020-12-11'),
                    streamUrl: 'https://www.youtube.com/watch?v=nd-ncGlhhBY',
                    episodeFileLink: './episodes/64.md',
                },
                {
                    type: EpisodeType.FRONTEND,
                    number: 63,
                    date: new Date('2020-12-04'),
                    streamUrl: 'https://www.youtube.com/watch?v=ycfmC5qZLpo',
                    episodeFileLink: './episodes/63.md',
                },
                {
                    type: EpisodeType.BACKEND,
                    number: 62,
                    date: new Date('2020-11-27'),
                    streamUrl: 'https://www.youtube.com/watch?v=XzYuiteMsOw',
                    episodeFileLink: './episodes/62.md',
                },
            ];

            expect(actual).toEqual(expected);
        });
    });

    it('when given readme with asterisk list syntax', async () => {
        const md = `
![top shot](./assets/top-shot.png)
# Śniadanie z Programowaniem 
> Na tym repozytorium znajdziesz linki które publikujemy w ramach nagrań "Śniadanie z Programowaniem" na kanale [JustJoin IT](https://justjoin.it/).


Wszystkie nagrania --> [facebook JustJoinIT](https://www.facebook.com/watch/JustJoinIT/1096965710647774/)

## Odcinki:

* [Front-end] Śniadanie z programowaniem #65, 18.12.2020
    * [video](https://www.youtube.com/watch?v=ZlQu4gcXmtA)
    * [linki](./episodes/65.md)
* [Back-end] Śniadanie z programowaniem #64, 11.12.2020
    * [video](https://www.youtube.com/watch?v=nd-ncGlhhBY)
    * [linki](./episodes/64.md)
* [Front-end] Śniadanie z programowaniem #63, 04.12.2020
    * [video](https://www.youtube.com/watch?v=ycfmC5qZLpo)
    * [linki](./episodes/63.md)
* [Back-end] Śniadanie z programowaniem #62, 27.11.2020
    * [video](https://www.youtube.com/watch?v=XzYuiteMsOw)
    * [linki](./episodes/62.md)
`;

        const actual = await parseReadme(md);
        const expected: EpisodeListItemModel[] = [
            {
                type: EpisodeType.FRONTEND,
                number: 65,
                date: new Date('2020-12-18'),
                streamUrl: 'https://www.youtube.com/watch?v=ZlQu4gcXmtA',
                episodeFileLink: './episodes/65.md',
            },
            {
                type: EpisodeType.BACKEND,
                number: 64,
                date: new Date('2020-12-11'),
                streamUrl: 'https://www.youtube.com/watch?v=nd-ncGlhhBY',
                episodeFileLink: './episodes/64.md',
            },
            {
                type: EpisodeType.FRONTEND,
                number: 63,
                date: new Date('2020-12-04'),
                streamUrl: 'https://www.youtube.com/watch?v=ycfmC5qZLpo',
                episodeFileLink: './episodes/63.md',
            },
            {
                type: EpisodeType.BACKEND,
                number: 62,
                date: new Date('2020-11-27'),
                streamUrl: 'https://www.youtube.com/watch?v=XzYuiteMsOw',
                episodeFileLink: './episodes/62.md',
            },
        ];

        expect(actual).toEqual(expected);
    });
});
