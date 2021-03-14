import { linkFromListItem, linksFromNestedList } from '../utils';

import { Tokens } from 'marked';

describe('utils', () => {
    describe('linkFromListItem', () => {
        it('should return link token', () => {
            const token: Tokens.ListItem = {
                type: 'list_item',
                raw:
                    '3. StackTrends: https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor',
                task: false,
                loose: false,
                checked: false,
                text:
                    'StackTrends: https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor',
                tokens: [
                    {
                        type: 'text',
                        raw:
                            'StackTrends: https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor',
                        text:
                            'StackTrends: https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor',
                        tokens: [
                            {
                                type: 'text',
                                raw: 'StackTrends: ',
                                text: 'StackTrends: ',
                            },
                            {
                                type: 'link',
                                raw:
                                    'https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor',
                                text:
                                    'https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor',
                                href:
                                    'https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor',
                                tokens: [
                                    {
                                        type: 'text',
                                        raw:
                                            'https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor',
                                        text:
                                            'https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };

            const actual = linkFromListItem(token);

            expect(actual).toEqual({
                type: 'link',
                raw: 'https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor',
                text: 'https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor',
                href: 'https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor',
                tokens: [
                    {
                        type: 'text',
                        raw:
                            'https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor',
                        text:
                            'https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor',
                    },
                ],
            });
        });

        it('should return undefined if no link found', () => {
            const token: Tokens.ListItem = {
                type: 'list_item',
                raw: '3. StackTrends',
                task: false,
                loose: false,
                checked: false,
                text: 'StackTrends',
                tokens: [
                    {
                        type: 'text',
                        raw: 'StackTrends',
                        text: 'StackTrends',
                        tokens: [
                            {
                                type: 'text',
                                raw: 'StackTrends',
                                text: 'StackTrends',
                            },
                        ],
                    },
                ],
            };

            const actual = linkFromListItem(token);

            expect(actual).toBeUndefined();
        });

        it('should return undefined for no tokens in given item', () => {
            const token: Tokens.ListItem = {
                type: 'list_item',
                raw: '3. StackTrends',
                task: false,
                loose: false,
                checked: false,
                text: 'StackTrends',
            };

            const actual = linkFromListItem(token);

            expect(actual).toBeUndefined();
        });
    });

    describe('linksFromNestedList', () => {
        it('should return links tokens', () => {
            const token: Tokens.List = {
                type: 'list',
                raw:
                    '- 2. Komponenty: https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx\n- 1. IDE: https://visualstudiomagazine.com/articles/2021/01/26/razor-editor-updates.aspx\n- 3. StackTrends: https://insights.stackoverflow.com/trends?tags=vue.js%2Cangular%2Cblazor',
                ordered: false,
                start: false,
                loose: false,
                items: [
                    {
                        type: 'list_item',
                        raw:
                            '- 2. Komponenty: https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx\n',
                        task: false,
                        loose: false,
                        checked: false,
                        text:
                            '2. Komponenty: https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                        tokens: [
                            {
                                type: 'list',
                                raw:
                                    '2. Komponenty: https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                                ordered: true,
                                start: false,
                                loose: false,
                                items: [
                                    {
                                        type: 'list_item',
                                        raw:
                                            '2. Komponenty: https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                                        task: false,
                                        loose: false,
                                        checked: false,
                                        text:
                                            'Komponenty: https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                                        tokens: [
                                            {
                                                type: 'text',
                                                raw:
                                                    'Komponenty: https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                                                text:
                                                    'Komponenty: https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                                                tokens: [
                                                    {
                                                        type: 'text',
                                                        raw: 'Komponenty: ',
                                                        text: 'Komponenty: ',
                                                    },
                                                    {
                                                        type: 'link',
                                                        raw:
                                                            'https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                                                        text:
                                                            'https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                                                        href:
                                                            'https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                                                        tokens: [
                                                            {
                                                                type: 'text',
                                                                raw:
                                                                    'https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                                                                text:
                                                                    'https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };

            const actual = linksFromNestedList(token);

            expect(actual).toEqual([
                {
                    type: 'link',
                    raw:
                        'https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                    text:
                        'https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                    href:
                        'https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                    tokens: [
                        {
                            type: 'text',
                            raw:
                                'https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                            text:
                                'https://visualstudiomagazine.com/articles/2021/01/21/radzen-open-source.aspx',
                        },
                    ],
                },
            ]);
        });
    });
});
