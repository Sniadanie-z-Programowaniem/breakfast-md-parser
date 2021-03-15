import chalk from 'chalk';
import { promises as fs } from 'fs';
import { logger } from '@bf-md/common';
import meow from 'meow';
import ora from 'ora';
import { parseBreakfastDir } from './parser';
import path from 'path';

const cli = meow(
    `
    Usage
      $ breakfast-md --dir <path-to-sniadanie-links-dir>

    Options
      --dir, -d Path to directory containing .md files
      --out, -o Path to file where result JSON will be saved
    
    Examples
      $ breakfast-md --dir ../path-to-sniadanie-links-dir --out result.json
`,
    {
        flags: {
            dir: {
                type: 'string',
                alias: 'd',
                isRequired: true,
                description: 'Path to directory containing .md files',
            },
            out: {
                type: 'string',
                alias: 'o',
                isRequired: false,
                desctiption: 'Path to file where result JSON will be saved',
            },
            help: {
                type: 'boolean',
                isRequired: false,
            },
        },
        autoVersion: true,
        allowUnknownFlags: false,
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
    const { dir, out } = cli.flags;

    const spinner = ora({
        discardStdin: true,
        text: `Processing ${chalk.italic(dir)} dir\n`,
    }).start();

    try {
        const result = await parseBreakfastDir({
            mainDirectoryPath: path.join(dir),
        });

        spinner.stop();
        await outputResult(out, result);
    } catch (error) {
        logger.error('Run failed 😢', {}, error);
    } finally {
        spinner.stop();
    }
};

run();
