import formidable from 'formidable';
import { IncomingMessage } from 'http';

/**
 * Utility function to parse a request with formidable.
 * @param {IncomingMessage} req - The HTTP request object.
 * @returns {Promise<{ fields: object, files: object }>} - Parsed fields and files.
 */
export default function parseForm(
  req: IncomingMessage
): Promise<{ fields: Record<string, any>; files: formidable.Files }> {
  console.log('Content-Type:', req.headers['content-type']); // Debug log

  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Formidable error:', err); // Debug log
        return reject(err);
      }
      console.log('Parsed fields:', fields); // Debug log
      console.log('Parsed files:', files); // Debug log
      resolve({ fields, files });
    });
  });
}
