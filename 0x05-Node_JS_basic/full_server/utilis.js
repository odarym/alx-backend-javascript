const fs = require('fs');

export default function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) { reject(Error('Cannot load the database')); } else {
        const db = data.toString().split('\n');
        db.shift();
        const field = {};

        for (const elem of db) {
          if (elem !== '') {
            const key = elem.split(',').pop();
            const name = elem.split(',')[0];
            if (Object.prototype.hasOwnProperty.call(field, key)) {
              field[key].push(name);
            } else {
              field[key] = [name];
            }
          }
        }
        resolve(field);
      }
    });
  });
}
