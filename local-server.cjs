const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const dist = path.join(root, "dist");
const indexFile = path.join(root, "data", "library-index.json");
const host = "127.0.0.1";
const port = Number(process.env.PORT || 8019);

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function readIndex() {
  try {
    return JSON.parse(fs.readFileSync(indexFile, "utf8"));
  } catch {
    return { sourceRoot: "H:\\1中南办公室", generatedAt: null, total: 0, files: [] };
  }
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers);
  res.end(body);
}

function serveStatic(req, res, pathname) {
  const requested = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(dist, requested));
  if (!filePath.startsWith(dist)) {
    send(res, 403, "Forbidden", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }
  fs.readFile(filePath, (error, data) => {
    if (error) {
      fs.readFile(path.join(dist, "index.html"), (indexError, indexData) => {
        if (indexError) send(res, 404, "Not found", { "Content-Type": "text/plain; charset=utf-8" });
        else send(res, 200, indexData, { "Content-Type": "text/html; charset=utf-8" });
      });
      return;
    }
    send(res, 200, data, { "Content-Type": mime[path.extname(filePath).toLowerCase()] || "application/octet-stream" });
  });
}

function serveFile(res, id) {
  const index = readIndex();
  const file = index.files.find((item) => item.id === id);
  if (!file) {
    send(res, 404, "File id not found", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }
  if (!fs.existsSync(file.path)) {
    send(res, 404, "Original file is not available. Check whether the U disk is mounted.", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }
  const name = encodeURIComponent(file.name);
  res.writeHead(200, {
    "Content-Type": "application/octet-stream",
    "Content-Disposition": `attachment; filename*=UTF-8''${name}`
  });
  fs.createReadStream(file.path).pipe(res);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${host}:${port}`);
  const pathname = decodeURIComponent(url.pathname);

  if (pathname === "/api/library") {
    send(res, 200, JSON.stringify(readIndex()), { "Content-Type": "application/json; charset=utf-8" });
    return;
  }

  if (pathname.startsWith("/files/")) {
    serveFile(res, pathname.replace("/files/", ""));
    return;
  }

  serveStatic(req, res, pathname);
});

server.listen(port, host, () => {
  console.log(`不想加班工作宝已启动：http://${host}:${port}`);
});
