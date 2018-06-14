const pg = require("pg");
require("dotenv").config();


class PostGresClient {
	constructor(options){
		this.args = options || {};
		this.connectToClient();
		return this;
	}

	connectToClient(){
		let args;
		if(!this.client){
			args = Object.assign(this.args, {
				user: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_DATABASE,
				port: process.env.DB_PORT,
				host: process.env.DB_HOST,
				ssl: process.env.DB_SSL
			});

			this.client = new pg.Client(args);
			this.client.connect();
		}
	}

	executeQuery(query){
		if(!this.client){
			return Promise.reject("No PostGres database connection");
		}
		
		return new Promise((resolve, reject) => {
			this.client.query(query.cql, query.keys, (err, data) => {
				if(err) reject(err);
				resolve(data && data.rows);
			});
		})
	}
}

let PostGresDriver = new PostGresClient();

module.exports = PostGresDriver;