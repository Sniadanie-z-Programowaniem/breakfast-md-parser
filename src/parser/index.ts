import { Episode } from '../model/episode';
import { promises as fs } from 'fs';
import { parseReadme } from './readme';
import path from 'path';

export const parseBreakfastDir = async (directoryPath: string): Promise<Episode[]> => {
    const readmeContent = await fs.readFile(path.join(directoryPath, 'README.md'), {
        encoding: 'utf-8',
    });

    const readmeModel = await parseReadme(readmeContent);
    console.log(readmeModel);

    return [];
};
