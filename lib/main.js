/**
 * options : {
 *  host: '139.162.9.68',
 *  user : {
 *    account: "admin",
 *    password: "password"
 *  }  
 * }
 */

const amqp = require("amqplib/callback_api");

class RabbitMQ {
  constructor(options) {
    this.init(options)
      .then(connection => {
        this._connection = connection;
        return this._createChannel(connection);
      })
      .then(channel => {
        this._channel = channel;
      })
      .catch(error => console.error(error));
  }

  init(options) {
    const uri = this._compareURI(options);
    return new Promise((resolve, reject) => {
      amqp.connect(uri, (error, connection) => {
        if (error) {
          reject(error);
        } else {
          resolve(connection);
        }
      });
    });
  }

  _createChannel(connection) {
    return new Promise((resolve, reject) => {
      connection.createChannel((error, channel) => {
        if (error) {
          reject(error);
        } else {
          resolve(channel);
        }
      });
    });
  }

  _compareURI(options) {
    let uri = "amqp://";
    if (options.port) {
      uri = `${uri}:${options.port}`;
    }
    if (options.user) {
      uri = `${uri}${options.user.account}:${options.user.password}`;
    }

    uri = `${uri}@${options.host}`;

    return uri;
  }
}

module.exports = RabbitMQ;
