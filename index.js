import fs from 'fs'
import readLine from 'readline'

const readStream = fs.createReadStream('./src/access_tmp.log.txt', 'utf-8');

const firstOutStream = fs.createWriteStream('./src/89.123.1.41_requests.log');
const secondOutStream = fs.createWriteStream('./src/34.48.240.111_requests.log');
const trashOutStream = fs.createWriteStream('./src/other_IP_requests.log');

const rl = readLine.createInterface({
  input: readStream,
});

rl.on('line', (line) => {
  if(line.includes('89.123.1.41')) {
    firstOutStream.write(line + '\n');
  } else if (line.includes('34.48.240.111')) {
    secondOutStream.write(line + '\n');
  } else {
    trashOutStream.write(line + '\n');
  }
})