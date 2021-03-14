import { parseBreakfastDir } from './parser';
import path from 'path';

const run = async () => {
    const result = await parseBreakfastDir({
        mainDirectoryPath: path.join(__dirname, '..', 'test-data'),
    });

    console.log('RESULT: ', JSON.stringify(result, null, 2));
};

run();
