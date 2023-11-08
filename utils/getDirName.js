import { fileURLToPath } from "url";

function getDirName(url) {
  return fileURLToPath(url);
}

export default getDirName;
