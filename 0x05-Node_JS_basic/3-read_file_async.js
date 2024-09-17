const fs = require('fs');

async function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) { reject(Error('Cannot load the database')); } else {
        const db = data.toString().split('\n');
        db.shift();
        const field = {};
        let totalStudents = 0;

        for (const elem of db) {
          if (elem !== '') {
            totalStudents += 1;
            const key = elem.split(',').pop();
            const name = elem.split(',')[0];
            if (Object.prototype.hasOwnProperty.call(field, key)) {
              field[key].push(name);
            } else {
              field[key] = [name];
            }
          }
        }
        console.log(`Number of students: ${totalStudents}`);
        for (const key in field) {
          if (Object.prototype.hasOwnProperty.call(field, key)) {
            const studentList = field[key];
            console.log(`Number of students in ${key}: ${studentList.length}. List: ${studentList.join(', ')}`);
          }
        }
        resolve();
      }
    });
  });
}

module.exports = countStudents;
