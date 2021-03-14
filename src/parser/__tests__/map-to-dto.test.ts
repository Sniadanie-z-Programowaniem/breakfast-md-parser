import { Episode, EpisodeType } from '../../model/episode';
import { EpisodeInfoToken, EpisodeTypeToken } from '../readme';

import { EpisodeToken } from '../episode/types';
import { mapToEpisode } from '../map-to-dto';

describe('map-to-dto', () => {
    describe('mapToEpisode', () => {
        it('should combine data for front-end episode', () => {
            const episodeToken: EpisodeToken = {
                hosts: [
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
                ],
                news: [
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
                ],
            };

            const episodeInfoToken: EpisodeInfoToken = {
                type: EpisodeTypeToken.FRONTEND,
                number: 63,
                date: new Date('2020-12-04'),
                streamUrl: 'https://www.youtube.com/watch?v=ycfmC5qZLpo',
                episodeFileLink: './episodes/63.md',
            };

            const actual = mapToEpisode(episodeToken, episodeInfoToken);

            const expected: Episode = {
                date: new Date('2020-12-04'),
                number: 63,
                type: EpisodeType.FRONTEND,
                hosts: [
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
                ],
                news: [
                    {
                        title: 'M1X',
                        description: '',
                        links: [
                            {
                                url:
                                    'https://thinkapple.pl/2020/11/24/nowy-imac-macbook-pro-16-z-m1-x-2021/',
                            },
                        ],
                    },
                    {
                        title: 'Nx cloud',
                        description: 'Poniżej też nasza prezka gdzie wspominamy nx',
                        links: [
                            {
                                url: 'https://nx.app/',
                            },
                            {
                                url: 'https://www.youtube.com/watch?v=99ZtVKG5PzI',
                            },
                            {
                                url: 'https://nx.dev/',
                            },
                        ],
                    },
                ],
                stream: {
                    url: 'https://www.youtube.com/watch?v=ycfmC5qZLpo',
                },
            };

            expect(actual).toEqual(expected);
        });

        it('should combine data for back-end episode', () => {
            const episodeToken: EpisodeToken = {
                hosts: [
                    {
                        name: 'Mateusz Turzyński',
                        twitterHandler: 'https://twitter.com/michalczukm',
                    },
                    {
                        name: 'Tomasz Gański',
                        twitterHandler: 'https://twitter.com/mmiszy',
                    },
                    {
                        name: 'Marcin Kwiatkowski',
                        twitterHandler: 'https://twitter.com/cytrowski',
                    },
                ],
                news: [
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
                ],
            };

            const episodeInfoToken: EpisodeInfoToken = {
                type: EpisodeTypeToken.BACKEND,
                number: 64,
                date: new Date('2020-12-11'),
                streamUrl: 'https://www.youtube.com/watch?v=nd-ncGlhhBY',
                episodeFileLink: './episodes/64.md',
            };

            const actual = mapToEpisode(episodeToken, episodeInfoToken);

            const expected: Episode = {
                date: new Date('2020-12-11'),
                number: 64,
                type: EpisodeType.BACKEND,
                hosts: [
                    {
                        name: 'Mateusz Turzyński',
                        twitterHandler: 'https://twitter.com/michalczukm',
                    },
                    {
                        name: 'Tomasz Gański',
                        twitterHandler: 'https://twitter.com/mmiszy',
                    },
                    {
                        name: 'Marcin Kwiatkowski',
                        twitterHandler: 'https://twitter.com/cytrowski',
                    },
                ],
                news: [
                    {
                        title: 'Guido van Rossum dołącza do Microsoftu',
                        description: '',
                        links: [
                            {
                                url:
                                    'https://www.centrumxp.pl/Publikacja/Microsoft-zatrudnil-tworce-Pythona-Guido-van-Rossuma-To-swietny-ruch',
                            },
                        ],
                    },
                    {
                        title: '.NET Core dostępny w Google Cloud Functions',
                        description: '',
                        links: [
                            {
                                url:
                                    'https://cloud.google.com/blog/products/application-development/introducing-net-google-cloud-functions',
                            },
                        ],
                    },
                ],
                stream: {
                    url: 'https://www.youtube.com/watch?v=nd-ncGlhhBY',
                },
            };

            expect(actual).toEqual(expected);
        });
    });
});
