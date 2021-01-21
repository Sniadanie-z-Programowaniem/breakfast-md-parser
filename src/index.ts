import { parseBreakfastDir } from './parser';
import path from 'path';

const run = async () => {
    parseBreakfastDir(path.join(__dirname, '..', 'test-data'));
};

run();
