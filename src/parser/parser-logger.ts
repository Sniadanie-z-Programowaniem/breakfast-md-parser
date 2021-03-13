/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tokens } from 'marked';
import chalk from 'chalk';

type TokenPayload = { token?: Tokens.DiscriminatedToken; [k: string]: any };

const logPayload = ({ token, ...payload }: TokenPayload): string => `
    ${JSON.stringify(payload, null, 2)}
    ${chalk.bgBlue('token: ')}${token}
`;

class ConsoleLogger {
    debug(message: string, payload?: TokenPayload): void {
        console.log(`
            ${chalk.blue('DEBUG')} | ${new Date().toUTCString()} | ${chalk.bgBlueBright.underline(
            message,
        )}
              ${payload && logPayload(payload)}
        `);
    }

    info(message: string, payload?: TokenPayload): void {
        console.log(`
            ${chalk.yellow('INFO')} | ${new Date().toUTCString()} | ${chalk.yellow.underline(
            message,
        )}
              ${payload && logPayload(payload)}
        `);
    }

    error(message: string, payload: TokenPayload, error?: Error): void {
        console.log(`
            ${chalk.red('ERROR')} | ${new Date().toUTCString()} | ${chalk.bgRed.underline(message)}
              ${logPayload(payload)}
              ${chalk.bgRed('ERROR')}: ${error}
        `);
    }
}

export const logger = new ConsoleLogger();
