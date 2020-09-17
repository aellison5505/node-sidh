
    /**
     * Creates P751 SIKE Key Pair
     * @param cb callback
     * @returns PrivateKey, PublicKey
     */
    export function createKEMKeyPair(cb: (PrivateKey: Buffer, PublicKey: Buffer) => void)

    /**
     * Takes Public key and returns Created SharedBytes, Encrypted shared bytes.
     * @param PublicKey 
     * @param cb 
     * 
     * @returns SharedBytes[32], CryptoBytes
     */
    export function KEMEncrypt(PublicKey: Buffer,cb: (SharedBytes: Buffer, CryptoBytes: Buffer) => void)
    /**
     * Takes private key and Encrypted bytes; return decrypted 
     * @param PrivateKey 
     * @param CryptoBytes 
     * @param cb 
     * 
     * @returns SharedBytes
     */
    export function KEMDecrypt(PrivateKey: Buffer,CryptoBytes: Buffer, cb: (SharedBytes: Buffer) => void)
