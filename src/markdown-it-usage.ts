import MarkdownIt from 'markdown-it';

export default async (markdown: string): Promise<any> => {
    const md = new MarkdownIt();
    return md.parse(markdown, 'dev');
};
