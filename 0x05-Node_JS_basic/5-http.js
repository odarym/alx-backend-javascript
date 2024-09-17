const http = require('http');
const process = require('process');
const fs = require('fs');

const path = process.argv[2] !== undefined ? process.argv[2] : '';

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  }
  if (req.url === '/students') {
    const body = ['This is the list of our students'];
    fs.readFile(path, (err, data) => {
      if (err) {
        body.push('Cannot load the database');
        res.end(body.join('\n'));
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
        res.end(body.join('\n'));
      }
    });
  }
});

app.listen(1245, '0.0.0.0', () => {});

module.exports = app;
