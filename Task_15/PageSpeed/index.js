const run = require('./middlewares/run');
const jsonFile = require('./data/url');
const logger = require('./middlewares/logger');

logger.clearFiles();
for (let i = 0; i < jsonFile.id.length; i++){
    run(jsonFile.id[i]);
}
