const request = require("request");
const logger = require("../services/logger");

class HTTP_REQUEST {
	constructor(){
		return this;
	}

	get (url, queryParam, headers){
		return new Promise((resolve, reject) => {
			let options = {
                url: url,
                json: true,
                gzip: true
            };

            queryParam && (options.qs = queryParam)
            headers && (options.headers = headers)

			request.get(options, 
			(err, httpResponse, body) => {
				logger.log("info", "http response", err, httpResponse.statusCode, body);
				if(err) return reject(err);

				resolve(body);
			})
		})
	}
}

let http_request = new HTTP_REQUEST();

module.exports = http_request;