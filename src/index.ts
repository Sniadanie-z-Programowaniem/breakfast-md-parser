import { promises as fs } from 'fs';
// import markdownItUsage from './markdown-it-usage';
import markedJsUsage from './marked-js-usage';

import path from 'path';

const run = async () => {
    const readmeContent = await fs.readFile(
        path.join(__dirname, '..', 'test-data', 'episodes', '63.md'),
        {
            encoding: 'utf-8',
        },
    );

    // const result = await markdownItUsage(readmeContent);
    const result = await markedJsUsage(readmeContent);

    console.log('==result', result);
};

run();
