// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = [];

var server = http.createServer(function(request, response) {
    var parseUrl = url.parse(request.url, true);
    var path = parseUrl.pathname;
    var query = parseUrl.query;
    if (path === '/post') {
        var comment = query.comment;
        comments.push(comment);
        response.writeHead(302, {'Location': '/'});
        response.end();
    } else if (path === '/') {
        fs.readFile('./comments.html', 'utf-8', function(err, data) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    } else if (path === '/get') {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(comments));
    } else {
        response.writeHead(404);
        response.end('Not Found');
    }
});

server.listen(3000);
console.log('Server is running at http://localhost:3000');
// Run the server and access it from the browser
// Open the browser and access http://localhost:3000
// Enter the comment in the text box and click the Post button
// The comment will be added to the comments array
// The browser will be redirected to the main page
// The added comment will be displayed in the comments list
// Open the browser and access http://localhost:3000/get
// The comments array will be displayed as a JSON string
// [{"comment":"First comment"},{"comment":"Second comment"}]
// The comments added by the user will be displayed as a JSON string
// The comments array will be displayed as a JSON string
// [{"comment":"First comment"},{"comment":"Second comment"}]
// The comments added by the user will be displayed as a JSON string
// [{"comment":"First comment"},{"comment":"Second comment"}]