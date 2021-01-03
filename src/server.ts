import http from 'http';
import https from 'https';
import url from 'url';
import { StringDecoder } from 'string_decoder';
import config from './config/serverConfig';
import fs from 'fs';
import { join } from 'path';


interface RouteHandler {
  [route: string]: (statusCode: number, payload: Payload) => void;
}

const httpServer = http.createServer((request, response) => {
  unifiedServer(request, response);
});

httpServer.listen(config.httpPort, () => {
  console.log(`🚀🚀 The HTTP server is listening on port ${config.httpPort} 🚀🚀`);
});

const httpsServer = https.createServer(
  {
    key: fs.readFileSync(join(__dirname, 'keys', 'https', 'key.pem')),
    cert: fs.readFileSync(join(__dirname, 'keys', 'https', 'cert.pem')),
  },
  (request, response) => {
    unifiedServer(request, response);
  }
);

httpsServer.listen(config.httpsPort, () => {
  console.log(`🚀🚀 The HTTPS server is listening on port ${config.httpsPort} 🚀🚀`);
});

function unifiedServer(request: http.IncomingMessage, response: http.ServerResponse) {
  const parsedUrl = url.parse(request.url, true);

  const path = parsedUrl.pathname;
  const trimmedPath = path?.replace(/^\/+|\/+$/g, '');
  const method = request.method?.toLocaleLowerCase();
  const queryStringObject = parsedUrl.query;
  const headers = request.headers;

  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  request.on('data', (data) => {
    buffer += decoder.write(data);
  });

  request.on('end', () => {
    buffer += decoder.end();

    const chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer,
    };

    chosenHandler(data, (statusCode, payload) => {
      const payload = typeof (payload) === 'object' ? payload : {};

      const payloadString = JSON.stringify(payload);

      response.setHeader('Content-type', 'application/json');
      response.writeHead(statusCode);
      response.end(payloadString);
    });
  });
}



const handlers: RouteHandler = {};

handlers.sample = (data, callback) => {
  callback(406, { 'name': 'sample handler' });
};

handlers.notFound = (data, callback) => {

};

const router = {
  sample: handlers.sample,
};
