import { Episode } from '../model/episode';
import { promises as fs } from 'fs';
import { parseEpisode } from './episode';
import { parseReadme } from './readme';
import path from 'path';

const readEpisodeFile = async (
    mainDirectoryPath: string,
    relativeFileLink: string,
): Promise<string> =>
    await fs.readFile(path.join(mainDirectoryPath, relativeFileLink), {
        encoding: 'utf-8',
    });

export const parseBreakfastDir = async ({
    mainDirectoryPath,
}: {
    mainDirectoryPath: string;
}): Promise<Episode[]> => {
    const readmeContent = await fs.readFile(path.join(mainDirectoryPath, 'README.md'), {
        encoding: 'utf-8',
    });

    const readmeToken = await parseReadme(readmeContent);

    readmeToken.episodes.forEach(async (element) => {
        console.log('===', path.join(mainDirectoryPath, element.episodeFileLink));
        const episodeContent = await readEpisodeFile(mainDirectoryPath, element.episodeFileLink);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const episodeModel = await parseEpisode(episodeContent);
        console.log(JSON.stringify(episodeModel, null, 2));
    });

    return [];
};
