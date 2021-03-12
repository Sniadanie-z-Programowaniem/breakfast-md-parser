import { Episode } from '../model/episode';
import { promises as fs } from 'fs';
import { parseEpisode } from './episode';
import { parseReadme } from './readme';
import path from 'path';

const readEpisodeFile = async (
    episodesDirectoryPath: string,
    episodeNumber: number,
): Promise<string> =>
    await fs.readFile(path.join(episodesDirectoryPath, episodeNumber.toString()), {
        encoding: 'utf-8',
    });

export const parseBreakfastDir = async ({
    mainDirectoryPath,
    episodesDirectoryPath,
}: {
    mainDirectoryPath: string;
    episodesDirectoryPath: string;
}): Promise<Episode[]> => {
    const readmeContent = await fs.readFile(path.join(mainDirectoryPath, 'README.md'), {
        encoding: 'utf-8',
    });

    const readmeModel = await parseReadme(readmeContent);

    readmeModel.forEach(async (element) => {
        const episodeContent = await readEpisodeFile(episodesDirectoryPath, element.number);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const episodeModel = parseEpisode(episodeContent);
    });

    return [];
};
