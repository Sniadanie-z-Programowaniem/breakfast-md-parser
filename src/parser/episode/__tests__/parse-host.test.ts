import { HostToken } from '../types';
import { getListItemToken } from './test-utils';
import { parseHost } from '../parse-host';

describe('parseHost', () => {
    it('should parse host with twitter handler', async () => {
        const md = `- [@michalczukm](https://twitter.com/michalczukm)`;

        const expected: HostToken = {
            name: '@michalczukm',
            twitterHandler: 'https://twitter.com/michalczukm',
        };

        const actual = await parseHost(await getListItemToken(md));

        expect(actual).toEqual(expected);
    });

    it('should parse host with github handler', async () => {
        const md = `- [@michalczukm](https://github.com/michalczukm)`;

        const expected: HostToken = {
            name: '@michalczukm',
            githubHandler: 'https://github.com/michalczukm',
        };

        const actual = await parseHost(await getListItemToken(md));

        expect(actual).toEqual(expected);
    });

    it('should parse host with linkedIn handler', async () => {
        const md = `- [Tomasz Gański](https://www.linkedin.com/in/tomaszganski)`;
        const expected: HostToken = {
            name: 'Tomasz Gański',
            linkedInHandler: 'https://www.linkedin.com/in/tomaszganski',
        };

        const actual = await parseHost(await getListItemToken(md));

        expect(actual).toEqual(expected);
    });

    it('should parse host with external web page', async () => {
        const md = `- [Michał Michalczuk](https://michalczukm.xyz)`;

        const expected: HostToken = {
            name: 'Michał Michalczuk',
            webPage: 'https://michalczukm.xyz',
        };

        const actual = await parseHost(await getListItemToken(md));

        expect(actual).toEqual(expected);
    });

    it('should parse host without social media handlers', async () => {
        const md = `- Michał Michalczuk`;

        const expected: HostToken = {
            name: 'Michał Michalczuk',
        };

        const actual = await parseHost(await getListItemToken(md));

        expect(actual).toEqual(expected);
    });
});
