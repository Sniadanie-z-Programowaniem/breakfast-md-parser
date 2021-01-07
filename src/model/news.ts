import { Link } from './link';

export interface News {
    title: string;
    description: string;
    date: Date;
    links: Link[];
}
