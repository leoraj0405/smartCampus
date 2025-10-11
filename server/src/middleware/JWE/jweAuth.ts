import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { compactDecrypt, jwtVerify } from 'jose';
import { TextDecoder } from 'util';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

// Load keys from files
const signPrivateKeyPem = process.env.JWE_PRIVATE_KEY || '';
const signPublicKeyPem  = process.env.JWE_PUBLIC_KEY || '';


// Helper to strip PEM header/footer and convert to buffer
function importRsaKey(pem: string) {
  const b64 = pem.replace(/-----(BEGIN|END) [A-Z ]+-----/g, '').replace(/\s+/g, '');
  return Buffer.from(b64, 'base64');
}

const decoder = new TextDecoder();

export async function jweAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1]; // Expect "Bearer <token>"
    if (!token) return res.status(401).json({ error: 'Invalid token format' });

    const privateKey = await crypto.subtle.importKey(
      'pkcs8',
      importRsaKey(signPrivateKeyPem),
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      false,
      ['decrypt']
    );

    const { plaintext } = await compactDecrypt(token, privateKey);

    const signPublicKey = await crypto.subtle.importKey(
      'spki',
      importRsaKey(signPublicKeyPem),
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const verified = await jwtVerify(decoder.decode(plaintext), signPublicKey);
    (req as any).user = verified.payload;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
