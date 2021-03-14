import { Episode } from '../model/episode';
import { promises as fs } from 'fs';
import { mapToEpisode } from './map-to-dto';
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

    const episodes = await Promise.all(
        readmeToken.episodes.map((infoToken) =>
            readEpisodeFile(mainDirectoryPath, infoToken.episodeFileLink)
                .then(parseEpisode)
                .then((episodeToken) => mapToEpisode(episodeToken, infoToken)),
        ),
    );

    return episodes;
};
