
export const SECRETKEYBYTES: number;
export const PUBLICKEYBYTES: number;
export const CIPHERTEXTBYTES: number;
export const CRYPTO_BYTES: number;

export function createKeyPair(publicKey: Buffer, privateKey: Buffer): number;

export function encrypt(crypto: Buffer, secret: Buffer, publicKey: Buffer): number;

export function decrypt(secret: Buffer, crypto: Buffer, privateKey: Buffer): number;