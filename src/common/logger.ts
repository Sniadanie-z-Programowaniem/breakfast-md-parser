/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tokens } from 'marked';
import chalk from 'chalk';

type TokenPayload = { token?: Tokens.DiscriminatedToken; [k: string]: any };

const COLORS_HEX = {
    EXTRA_INFO: '#996600',
    TOKEN_INFO: '#cc6600',
};

const printDate = (): string => new Date().toUTCString();

const logPayload = ({ token, ...payload }: TokenPayload): string =>
    (token && Object.keys(token).length > 0
        ? `${chalk.bgHex(COLORS_HEX.TOKEN_INFO)('token: ')}${JSON.stringify(token, null, 2)}`
        : '') +
    (payload && Object.keys(payload).length > 0
        ? `\n${chalk.bgHex(COLORS_HEX.EXTRA_INFO)('extra payload: ')}${JSON.stringify(
              payload,
              null,
              2,
          )}`
        : '');

class ConsoleLogger {
    debug(message: string, payload?: TokenPayload): void {
        console.log(
            `${chalk.blue('DEBUG')} | ${printDate()} | ${chalk.blue.underline(message)}\n` +
                (payload && logPayload(payload)),
        );
    }

    info(message: string, payload?: TokenPayload): void {
        console.log(
            `${chalk.yellow('INFO')} | ${printDate()} | ${chalk.yellow.underline(message)}\n` +
                (payload && logPayload(payload)),
        );
    }

    error(message: string, payload: TokenPayload, error?: Error): void {
        console.log(
            `${chalk.red('ERROR')} | ${printDate()} | ${chalk.red.underline(message)}\n` +
                (error ? `${chalk.bgRed('ERROR')}: ${error}\n` : '') +
                `${logPayload(payload)}\n`,
        );
    }
}

export const logger = new ConsoleLogger();
