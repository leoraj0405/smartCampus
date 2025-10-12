import crypto from 'crypto';

const generatedStrings = new Set();
const length = 50
export function generateUniqueRandomString() {
  let result;
  do {
    result = crypto.randomBytes(length)
      .toString('base64')
      .replace(/[+/=]/g, '')
      .substring(0, length);
  } while (generatedStrings.has(result));

  generatedStrings.add(result);
  return result;
}