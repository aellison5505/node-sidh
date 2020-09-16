

    export function createKEMKeyPair(cb: (PrivateKey: Buffer, PublicKey: Buffer) => void): void

    export function KEMEncrypt(PublicKey: Buffer,cb: (SharedBytes: Buffer, CryptoBytes: Buffer) => void): void

    export function KEMDecrypt(PrivateKey: Buffer,CryptoBytes: Buffer, cb: (SharedBytes: Buffer) => void): void
