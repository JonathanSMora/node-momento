var http = require("http");
var url = require("url");
var querystring = require("querystring");
var { info, error } = require("./modules/mylog.js");
var { countries } = require("countries-list");

var server = http.createServer(function (request, response) {
  var parsed = url.parse(request.url);
  console.log("parsed : ", parsed);

  var pathname = parsed.pathname;
  var query = querystring.parse(parsed.query);
  console.log("query: ", query);
    try{
        switch (pathname) {
          case "/":
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write("<html><body><p>Home Page</p></body></html>");
            response.end();
            break;
          case "/salida":
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write("<html><body><p>Bye</p></body></html>");
            response.end();
            break;
          case "/info":
            var result = info(request.url);
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(result);
            response.end();
            break;
          case "/error":
            var result = error(request.url);
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(result);
            response.end();
            break;
          case "/country":
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(countries[query.ctr]));
            response.end();
            break;
          default:
            response.writeHead(404, { "Content-Type": "text/html" });
            response.write(
              "<html><body><p>404 Página no encontrada</p></body></html>"
            );
            response.end();
        }
    }catch(err){
        response.writeHead(404, { "Content-Type": "text/html" });
        response.write(
          "<html><body><p>ERROR FATAL</p></body></html>"
        );
        response.end();
    }
});

server.listen(4000);
console.log("running on 4000");
