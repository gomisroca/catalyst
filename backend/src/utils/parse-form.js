import formidable from 'formidable';

/**
 * Utility function to parse a request with formidable.
 * @param {object} req - The HTTP request object.
 * @returns {Promise<{ fields: object, files: object }>} - Parsed fields and files.
 */
export default function parseForm(req) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      resolve({ fields, files });
    });
  });
}
