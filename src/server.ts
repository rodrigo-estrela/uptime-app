import http from 'http';
import url from 'url';


const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);

  const path = parsedUrl.pathname;
  const trimmedPath = path?.replace(/^\/+|\/+$/g, '');
  const method = request.method?.toLocaleLowerCase();
  const queryStringObject = parsedUrl.query;
  const headers = request.headers;


  response.end('Hello, world!\n');

  console.log(`Request received on path: ${trimmedPath} with method: ${method} and with these parameters`, queryStringObject);
});

server.listen(3000, () => {
  console.log(`The server is listening on port 3000 now`);
});
