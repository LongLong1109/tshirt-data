const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("server.json");
const auth = require("json-server-auth");

server.db = router.db;

server.use((req, res, next) => {
  const corsWhitelist = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://t-shirts-project.vercel.app",
  ];

  if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
  }

  next();
});

server.use(auth);
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port);
