export default class AppController {
  static getHomepage(request, response) {
    response.statusCode = 200;
    response.send('Hello Holberton School!');
  }
}
