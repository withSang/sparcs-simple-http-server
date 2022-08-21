const http = require("http");

const {
  handleMainPage,
  handleLoginPage,
  handleLogoutPage,
  handleTeapotPage,
  handle404Page,
} = require("./handlers");

const port = 3000; // 변경 가능

http
  .createServer((req, res) => {
    console.log("request arrvied");

    const body = "";
    req.on("data", (chunk) => {
      body += chunk; // 필요한 경우 body 사용
    });

    // HTTP 버전 검사
    if (req.httpVersion !== "1.1") {
      res.writeHead(505, { "Content-Type": "text/html" });
      res.end(`HTTP version ${req.httpVersion} is not supported by server`);
      return;
    }

    // 라우팅
    const reqURL = new URL(req.url, `http://${req.headers.host}`);
    const pathname = reqURL.pathname;
    switch (pathname) {
      case "/":
        handleMainPage(req, res);
        break;
      case "/login":
        handleLoginPage(req, res);
        break;
      case "/logout":
        handleLogoutPage(req, res);
        break;
      case "/teapot":
        handleTeapotPage(req, res);
        break;
      default:
        handle404Page(req, res);
        break;
    }
  })
  .listen(port, () => {
    console.log("Server listening on " + port);
  });
