import { File as FormidableFile } from 'formidable';
import { readFile } from 'fs/promises';

async function convertFormidableToFile(file: FormidableFile): Promise<File> {
  const buffer = await readFile(file.filepath);
  return new File([buffer], file.originalFilename || 'file', { type: file.mimetype || '' });
}

export default convertFormidableToFile;
