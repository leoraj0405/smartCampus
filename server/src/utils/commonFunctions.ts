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

export function pemToArrayBuffer(pem: string) {
   const b64 = pem
   .replace(/-----BEGIN PRIVATE KEY-----/, '')
   .replace(/-----END PRIVATE KEY-----/, '')
   .replace(/\s+/g, '');
  const binary = Buffer.from(b64, 'base64');
  return binary.buffer.slice(binary.byteOffset, binary.byteOffset + binary.byteLength);
}