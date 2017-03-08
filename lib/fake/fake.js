const _ = require('lodash');
const db =require('./db');


module.exports = ( count ) => {
  const result = [];

  for (var i = 0; i < count.length; i++) {

    const user = {};

    user.name = db.users[_.ramdom(0, db.users.length)]
    user.age = _.random(1, 100)
    
  }
  return []
}
