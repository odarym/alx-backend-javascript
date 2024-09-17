import readDatabase from '../utilis';

export default class StudentsController {
  static getAllStudents(request, response) {
    const body = ['This is the list of our students'];
    readDatabase(process.argv[2] !== undefined ? process.argv[2] : '')
      .then((field) => {
        for (const key in field) {
          if (Object.prototype.hasOwnProperty.call(field, key)) {
            const studentList = field[key];
            body.push(`Number of students in ${key}: ${studentList.length}. List: ${studentList.join(', ')}`);
          }
        }
        response.statusCode = 200;
        response.send(body.join('\n'));
      })
      .catch((error) => {
        response.statusCode = 500;
        response.send(error.message);
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    if (major !== 'CS' && major !== 'SWE') {
      response.statusCode = 500;
      response.send('Major parameter must be CS or SWE');
    } else {
      readDatabase(process.argv[2] !== undefined ? process.argv[2] : '')
        .then((field) => {
          response.statusCode = 200;
          response.send(`List: ${field[major].join(', ')}`);
        })
        .catch((error) => {
          response.statusCode = 500;
          response.send(error.message);
        });
    }
  }
}
