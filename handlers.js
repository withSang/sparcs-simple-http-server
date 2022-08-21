const fs = require("fs");

const set500Error = (res) => {
  res.statusCode = 500;
  res.body = "Internal Server Error";
  return;
};

const handleMainPage = (req, res) => {
  const cookie = req.headers.cookie;
  if (cookie.includes("authenticated=true")) {
    fs.readFile("./public/index.html", (err, data) => {
      if (err) {
        set500Error(res);
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
    return;
  } else {
    res.writeHead(303, { location: "/login" });
    res.end();
  }
};

const handleLoginPage = (req, res) => {
  if (req.method === "GET") {
    // GET request.
    fs.readFile("./public/login.html", (err, data) => {
      if (err) {
        set500Error(res);
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    // POST request.
    res.setHeader("Set-Cookie", ["authenticated=true"]);
    res.writeHead(308, { location: "/" });
    res.end();
  }
};

const handleLogoutPage = (_, res) => {
  res.setHeader("Set-Cookie", ["authenticated="]);
  res.writeHead(308, { location: "/" });
  res.end();
};

const handleTeapotPage = (_, res) => {
  fs.readFile("./public/teapot.html", (err, data) => {
    if (err) {
      set500Error(res);
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
  return;
};

const handle404Page = (_, res) => {
  fs.readFile("./public/not-found.html", (err, data) => {
    if (err) {
      set500Error(res);
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
  return;
};

module.exports = {
  handleMainPage,
  handleLoginPage,
  handleLogoutPage,
  handleTeapotPage,
  handle404Page,
};
