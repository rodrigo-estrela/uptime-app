import http from 'http';


const server = http.createServer((request, response) => {
  response.end('Hello, world!\n')
});

server.listen(3000, () => {
  console.log(`The server is listening on port 3000 now`)
})
