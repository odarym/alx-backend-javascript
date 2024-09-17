const fs = require('fs');

function countStudentsSync(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    const db = data.split('\n');
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
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudentsSync;
