const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>my first node app</title></head>");
    res.write(
      "<body><form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'>Login</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
        const parsedBody = Buffer.concat(body).toString();
        console.log(parsedBody.split('=')[1]);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
    
  }
  if (url === "/users") {
    res.write("<html>");
    res.write(
      "<body><ul><li>user1</li><li>user2</li><li>user3</li></ul></body>"
    );
    res.write("</html>");
    return res.end();
  }

  res.setHeader("Content-type", "text/html");
  res.write("<html>");
  res.write("<head><title>my first node app</title></head>");
  res.write("<body><h1>hello from my node.js app</h1></body>");
  res.write("</html>");
  return res.end();
});

server.listen(3000);
