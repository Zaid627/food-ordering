import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

function webRequestToNodeRequest(webReq) {
  const nodeReq = new ReadableStreamToNodeStream(webReq.body);
  nodeReq.headers = Object.fromEntries(webReq.headers);
  nodeReq.method = webReq.method;
  nodeReq.url = webReq.url;
  return nodeReq;
}

function ReadableStreamToNodeStream(readableStream) {
  const { Readable } = require("stream");

  const stream = new Readable({
    read() {},
  });

  const reader = readableStream.getReader();
  function pump() {
    reader.read().then(({ done, value }) => {
      if (done) {
        stream.push(null);
      } else {
        stream.push(Buffer.from(value));
        pump();
      }
    });
  }
  pump();
  return stream;
}

export async function POST(request) {
  const nodeReq = webRequestToNodeRequest(request);

  const uploadDir = path.join(process.cwd(), "public/uploads");
  fs.mkdirSync(uploadDir, { recursive: true });

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
  });

  return await new Promise((resolve) => {
    form.parse(nodeReq, (err, fields, files) => {
      if (err) {
        console.error("Parse error:", err);
        return resolve(
          Response.json({ error: "Upload failed" }, { status: 500 })
        );
      }

      const file = files.file?.[0] || files.file;
      if (!file) {
        return resolve(
          Response.json({ error: "No file uploaded" }, { status: 400 })
        );
      }

      const url = `/uploads/${path.basename(file.filepath)}`;
      return resolve(Response.json({ url }));
    });
  });
}
