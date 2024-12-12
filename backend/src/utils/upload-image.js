import * as path from 'path';
import * as fs from 'fs';
import Readable from 'node:stream';
import finished from 'node:stream/promises';

export function uploadImage(type, file, id) {
  const filepath = file.filepath;
  const mimetype = file.mimetype;
  const filesize = file.size;
  const maxSize = 1024 * 1024 * 5;
  if (!mimetype?.startsWith('image')) {
    throw new Error(`File is not an image.`);
  }
  if (filesize > maxSize) {
    throw new Error(`File is larger than 5 MB.`);
  }

  let imageName = `${id}.jpg`;
  let newPath = path.join('public', type);
  if (!fs.existsSync(newPath)) {
    fs.mkdirSync(newPath, { recursive: true });
  }
  newPath = path.join(newPath, imageName);
  fs.copyFileSync(filepath, newPath);
  let relativePath = path.join(type, imageName);
  return relativePath;
}

export async function downloadImage(type, imageUrl, id) {
  try {
    const response = await fetch(imageUrl);
    const destination = path.resolve(`public/${type}/${id}.jpg`);
    if (fs.existsSync(destination)) {
      fs.unlinkSync(destination);
    }
    const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
    await finished(Readable.fromWeb(response.body).pipe(fileStream));
    let relativePath = path.join(type, `${id}.jpg`);
    return relativePath;
  } catch (error) {
    throw new Error(`Error downloading the image: ${error}`);
  }
}
