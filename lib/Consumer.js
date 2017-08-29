/**
 * @params : queues
 * type: Object
 * 
 * Example:
 * {
 *  groupsinfo: {
 *    exchanges: [
 *    ]
 *  }
 * }
 */
const RabbitMQMaster = require("./main");

class Consumer extends RabbitMQMaster {
  constructor(queues, options) {
    super(options).then(parent => {
      this._queues = Object.keys(queues);
      this._queues.map(queue => {});
      console.log(this._channel);
    });
  }

  hello = () => {
    console.log(this);
  };
}
const options = {
  host: "139.162.9.68",
  user: {
    account: "admin",
    password: "password"
  }
};

const queues = {
  groupinfo: {
    options: {
      durable: false
    },
    exchanges: {
      topic: [
        {
          route_key: "facebook.group.#"
        }
      ]
    }
  }
};

module.exports = Consumer;
