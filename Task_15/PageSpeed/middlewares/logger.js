const fs = require('fs');
const pathToBigFile = './data/bigfile.txt';
const pathToErrors = './data/errors.txt';
const pathToStream = './data/logstream.txt';

function clearFiles() {
    try {
        if (fs.existsSync(pathToBigFile)) {
            fs.unlink(pathToBigFile, function (err) {
                if (err) {console.error(err);}
                console.log('Data file has been deleted');
            });
        }
    } catch(err) { console.error(err); }

    try {
        if (fs.existsSync(pathToErrors)) {
            fs.unlink(pathToErrors, function (err) {
                if (err) {console.error(err);}
                console.log('Errors handling file has been deleted');
            });
        }
    } catch(err) { console.error(err); }

    try {
        if (fs.existsSync(pathToStream)) {
            fs.unlink(pathToStream, function (err) {
                if (err) {console.error(err);}
                console.log('Data stream file has been deleted');
            });
        }
    } catch(err) { console.error(err); }
}

function logger(json) {
    const now = new Date();
    const lighthouse = json.lighthouseResult; 
    const lighthouseMetrics = {
    'First Contentful Paint': lighthouse.audits['first-contentful-paint'].displayValue,
    'Speed Index': lighthouse.audits['speed-index'].displayValue,
    'Time To Interactive': lighthouse.audits['interactive'].displayValue,
    'First Meaningful Paint': lighthouse.audits['first-meaningful-paint'].displayValue,
    'First CPU Idle': lighthouse.audits['first-cpu-idle'].displayValue,
    'Estimated Input Latency': lighthouse.audits['estimated-input-latency'].displayValue
    };

    console.log(`${now.toUTCString()}`, '\n', json.id, '\n', lighthouseMetrics);
    fs.appendFile(pathToBigFile, now.toUTCString() + '\r\n', function (err) {
        if (err) {
            console.error(err);
            throw err;
        } 
    });
    fs.appendFile(pathToBigFile, JSON.stringify(json.id) + '\r\n', function (err) {
        if (err) {
            console.error(err);
            throw err;
        } 
    });   
    fs.appendFile(pathToBigFile, JSON.stringify(lighthouseMetrics) + '\r\n', function (err) {
        if (err) {
            console.error(err);
            throw err;
        } 
    });       
}

function logError(string) {
    const now = new Date();

    fs.appendFile(pathToErrors, now.toUTCString() + '\r\n', function (err) {
        if (err) {
            console.error(err);
            throw err;
        }    
    });
    fs.appendFile(pathToErrors, string + '\r\n', function (err) {
        if (err) {
            console.error(err);
            throw err;
        }  
    });   
          
}

function logStream(json){
    const now = new Date();
    const lighthouse = json.lighthouseResult; 
    const lighthouseMetrics = {
    'First Contentful Paint': lighthouse.audits['first-contentful-paint'].displayValue,
    'Speed Index': lighthouse.audits['speed-index'].displayValue,
    'Time To Interactive': lighthouse.audits['interactive'].displayValue,
    'First Meaningful Paint': lighthouse.audits['first-meaningful-paint'].displayValue,
    'First CPU Idle': lighthouse.audits['first-cpu-idle'].displayValue,
    'Estimated Input Latency': lighthouse.audits['estimated-input-latency'].displayValue
    };
    
    let writeStream = fs.createWriteStream(pathToStream, {flags: 'a'});
    console.log(json.id);
    // write some data 
    writeStream.write(now.toUTCString() + '\r\n', function (err) {
        if (err) {
            console.error(err);
            throw err;
        }    
    });
    writeStream.write(JSON.stringify(json.id) + '\r\n', function (err) {
        if (err) {
            console.error(err);
            throw err;
        }    
    });
    writeStream.write(JSON.stringify(lighthouseMetrics) + '\r\n', function (err) {
        if (err) {
            console.error(err);
            throw err;
        }    
    });
    
    // the finish event is emitted when all data has been flushed from the stream
    /* writeStream.on('finish', () => {
        console.log('wrote all data to file');
    }); */

    // close the stream
    writeStream.end();
}

module.exports = {logger, logError, logStream, clearFiles};