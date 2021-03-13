import { EpisodeToken } from '../types';
import { parseEpisode } from '..';

describe('parse-episode', () => {
    describe('hosts', () => {
        it.only('should parse hosts with twitter handlers', async () => {
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
                    name: '@cytrowski',
                    twitterHandler: 'https://twitter.com/cytrowski',
                },
            ] as EpisodeToken['hosts']);
        });

        it.skip('should parse hosts with mixed twitter handlers or none', async () => {
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

            const actual = await parseEpisode(md);

            expect(actual.hosts).toEqual([
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
            ] as EpisodeToken['hosts']);
        });
    });

    describe.skip('should parse', () => {
        it('when given readme with dash list syntax', async () => {
            const md = `
# Live 27.11.2020 #Back-end

Linkują:

-   Marcin Kwiatkowski
-   Mateusz Turzyński
-   Łukasz Grzybowski
-   [Tomasz Gański](https://www.linkedin.com/in/tomaszganski)

## Linki

-   Nowa wersja Spacy: Spacy 3.0 https://nightly.spacy.io/usage/v3

-   Guido van Rossum dołącza do Microsoftu
    https://www.centrumxp.pl/Publikacja/Microsoft-zatrudnil-tworce-Pythona-Guido-van-Rossuma-To-swietny-ruch

-   .NET Core dostępny w Google Cloud Functions
    https://cloud.google.com/blog/products/application-development/introducing-net-google-cloud-functions

-   .NET5 i C#9 released https://devblogs.microsoft.com/dotnet/announcing-net-5-0/

-   Odświeżanie starych filmów z użyciem sztucznej inteligencji
    https://www.wired.co.uk/article/history-colourisation-controversy?utm_campaign=SocialFlow&utm_medium=Social&utm_source=Facebook&fbclid=IwAR1RGysQjPF7wgtoviVt2aI0b9NAFioogsV54QXEYm4LDGkzYLwwbuqhDCg&fbclid=IwAR2a3neIYOyE0yrJdvvqFcWGNMIrn6LkWiEeTnPZBYzINbZLBAY41G6nKx8

-   Czy człowiek faktycznie wylądował na księżycu w 1969 roku w czasie misji Apollo 11? Deep Fake
    https://www.scientificamerican.com/article/a-nixon-deepfake-a-moon-disaster-speech-and-an-information-ecosystem-at-risk1/

-   M1X https://thinkapple.pl/2020/11/24/nowy-imac-macbook-pro-16-z-m1-x-2021/

-   Apple Silicon M1 Chips and Docker Revealed at Apple’s ‘One More Thing’ event on Nov 10th, Docker
    was excited to see new Macs feature Apple silicon and their M1 chip. At Docker we have been
    looking at the new hypervisor features and support that are required for Mac to continue to
    delight our millions of customers. We saw the first spotlight…

    -   https://www.docker.com/blog/apple-silicon-m1-chips-and-docker/

-   Linus chce Linuxa na M1 https://www.instalki.pl/aktualnosci/software/45089-macbook-m1-linux.html

-   Windows na M1
    https://myapple.pl/posts/22612-windows-na-macach-z-ukladem-m1-wedlug-wiceprezesa-apple-to-zalezy-tylko-od-microsoftu

-   Apple Silicon M1: Black. Magic. Fuckery. These are the words used by the user holdagold on
    reddit to describe their experience with the new Apple Silicon M1 Macbook Air. Rarely does a
    product leave people effusing to the extent Apple Silicon M1 has done this week.

    -   https://www.singhkays.com/blog/apple-silicon-m1-black-magic/

-   Youtube ogranicza wykorzystanie automatycznej weryfikacji treści.
    https://www.theverge.com/2020/9/21/21448916/youtube-automated-moderation-ai-machine-learning-increased-errors-takedowns

-   [Event] AWS re:Invent https://reinvent.awsevents.com/

-   [Event] DotNext 2020 https://dotnext-moscow.ru/en/

-   [Event] Grudniowy Klub Informatyka
    http://crossweb.pl/wydarzenia/grudniowy-klub-informatyka-perspektywy-profesjonalistow-informatyki/

-   [Event] SysOps/DevOps #23 http://crossweb.pl/wydarzenia/sysops-devops-meetup-online-23/

`;

            const actual = await parseEpisode(md);

            expect(actual).toEqual({} as EpisodeToken);
        });
    });
});
