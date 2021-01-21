import marked from 'marked';

export const tokenize = async (markdownContent: string): Promise<marked.TokensList> => {
    return marked.lexer(markdownContent);
};
