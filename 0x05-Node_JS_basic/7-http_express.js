const express = require('express');
const fs = require('fs');
const process = require('process');

const app = express();

const path = process.argv[2] !== undefined ? process.argv[2] : '';

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const body = ['This is the list of our students'];
  fs.readFile(path, (err, data) => {
    if (err) {
      body.push('Cannot load the database');
      res.send(body.join('\n'));
    } else {
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
      body.push(`Number of students: ${totalStudents}`);
      for (const key in field) {
        if (Object.prototype.hasOwnProperty.call(field, key)) {
          const studentList = field[key];
          body.push(`Number of students in ${key}: ${studentList.length}. List: ${studentList.join(', ')}`);
        }
      }
      res.send(body.join('\n'));
    }
  });
});

app.listen(1245, () => {});

module.exports = app;
