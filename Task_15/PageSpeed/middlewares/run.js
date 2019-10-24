const fetch = require("node-fetch");
const logger = require('./logger');

function run(urlJSON) {
    const url = setUpQuery(urlJSON);
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try{
        fetch(url)
        .then(
            function(response) {  
            if (response.status !== 200) {  
                let string = 'Error:' + urlJSON + '\r\n' + response.statusText;
                console.error(string);
                logger.logError(string);
                return;  
            }
            // Examine the text in the response  
            response.json().then(function(data) {  
                //logger.logger(data); 
                logger.logStream(data); 
            });  
          }
        
        ).catch(function(error) {
            console.error(error);
        }); 
    } catch (error) {
        console.error(error);
        }
}


function setUpQuery(urlJSON) {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const parameters = {
        url: encodeURIComponent(urlJSON),
        key: 'AIzaSyD8tz8ht9OirE7RDWUdn4VE163zy2tV8V0',
        strategy: 'desktop',
        rejectUnauthorized: false
    };
    let query = `${api}?`;
    for (key in parameters) {
        query += `&${key}=${parameters[key]}`;
    }
    return query;
}

module.exports = run;