import { parseBreakfastDir } from './parser';
import path from 'path';

const run = async () => {
    parseBreakfastDir({
        mainDirectoryPath: path.join(__dirname, '..', 'test-data'),
    });
};

run();
