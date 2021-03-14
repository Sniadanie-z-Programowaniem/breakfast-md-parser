import { asTokens, isListToken } from '../../marked-types';

import { Tokens } from 'marked';
import { tokenize } from '../../tokenize';

export async function getListItemToken(content: string): Promise<Tokens.ListItem> {
    const listToken: Tokens.List | undefined = asTokens(await tokenize(content)).find(isListToken);

    const listItemToken = listToken?.items?.[0];

    expect(listItemToken).toBeDefined();

    if (!listItemToken) {
        throw new Error(
            'List item not found in test - looks like, there is bug in test, or incorrect MD was prepared',
        );
    }

    return listItemToken;
}
