export class BreakParsingError extends Error {
    name = 'Breaking parsing';
}

export const assertParsingCondition = (
    condition: boolean | (() => boolean),
    message: string,
): void | never => {
    const lazyConditionFailed = typeof condition === 'function' && !condition();

    if (lazyConditionFailed || !condition) {
        throw new BreakParsingError(message);
    }
};
