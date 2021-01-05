import marked from 'marked';

export default async (markdownContent: string): Promise<marked.TokensList> => {
    return marked.lexer(markdownContent);
};
