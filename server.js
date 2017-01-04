var express = require('express'),
  // DONE: require in our request proxy module
  requestProxy = require('express-request-proxy'), // library requre('') is assigned to requestProxy
  port = process.env.PORT || 3000,
  app = express();

// DONE: now use our proxy within a function to request
//        our github data on the server.

function proxyGitHub(request, response) {
  console.log('Routing Github request for', request.params[0]);
  // console.log('api key is: ', API_KEY);
  // console.log('process.env: ', process.env);
  (requestProxy({
    url: 'https://api.github.com/' + request.params[0],
    query: {
      access_token: process.env.API_KEY // the API_KEY:value is a property on the process.env obj
    }
  }))(request, response);
};

app.get('/github/*', proxyGitHub);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
