import { parse, join } from "path";
import { createWriteStream } from "fs";
import getDirName from "../../utils/getDirName.js";

const __dirname = getDirName(import.meta.url);

const readFile = async (file) => {
  const { createReadStream, filename } = await file;
  const stream = createReadStream();
  var { ext, name } = parse(filename);
  name = `pic${Math.floor(Math.random() * 10000 + 1)}`;
  let url = join(__dirname, `../../../Public/${name}-${Date.now()}${ext}`);

  // writing the files to the file system.
  const imageStream = createWriteStream(url);
  await stream.pipe(imageStream);
  const baseUrl = process.env.BASE_URL;
  url = `${baseUrl}${url.split("Public")[1]}`;
  return url;
};

export default readFile;
