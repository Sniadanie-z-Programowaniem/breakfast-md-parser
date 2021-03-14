import chalk from 'chalk';
import { promises as fs } from 'fs';
import meow from 'meow';
import { parseBreakfastDir } from './parser';
import path from 'path';

const cli = meow(
    `
    Usage
      $ breakfast-md --dir <path-to-sniadanie-links-dir>

    Options
      --dir, -d Path to directory containing .md files
      --output, -o Path to file where result JSON will be saved
    
    Examples
      $ breakfast-md --dir ../path-to-sniadanie-links-dir --output result.json
`,
    {
        flags: {
            dir: {
                type: 'string',
                alias: 'd',
                isRequired: true,
                description: 'Path to directory containing .md files',
            },
            output: {
                type: 'string',
                alias: 'o',
                isRequired: false,
                desctiption: 'Path to file where result JSON will be saved',
            },
        },
        autoVersion: true,
    },
);

const outputResult = async (
    output: string | undefined,
    result: import('/Users/mmichalczuk/workspaces/github/breakfast-md-parser/src/model/episode').Episode[],
): Promise<void> => {
    if (!output) {
        console.log(chalk.underline.bold('🎉 Your result'), '\n', JSON.stringify(result, null, 2));
    } else {
        await fs.writeFile(output, JSON.stringify(result, null, 2));
        console.log(chalk.underline.bold('🎉 Result saved to'), chalk.italic(output));
    }
};

const run = async () => {
    const { dir, output } = cli.flags;
    const result = await parseBreakfastDir({
        mainDirectoryPath: path.join(dir),
    });

    await outputResult(output, result);
};

run();
