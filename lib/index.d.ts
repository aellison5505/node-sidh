/// <reference types="node" />
/**
 * Keys interface
 * PrivateJey: Buffer
 * PublicKey: Buffer
 */
export interface keys {
    PrivateKey: Buffer;
    PublicKey: Buffer;
}
export interface encRet {
    secureKey: Buffer;
    cipherBytes: Buffer;
}
/**
 * This class uses post-crypto SIDH and creates keyPairs and the shared secret.
 */
export declare class SIDH {
    PrivateKey: Buffer;
    PublicKey: Buffer;
    SenderKey: Buffer;
    SenderPublic: Buffer;
    constructor();
    /**
     * Produces random bytes
     * @param length bytes
     */
    randomBytes(length: number): Promise<Buffer>;
    /**
     * Creates a key pair
     * @returns key object
     */
    createKeyPair(): Promise<keys>;
    get keyPair(): keys;
    get senderKeyPair(): keys;
    createPubA(privateKey: Buffer): Promise<Buffer>;
    senderKeys(): Promise<keys>;
    sharedKey(PrivateKey: Buffer, SenderPublicKey: Buffer): Promise<Buffer>;
    sharedKeySender(SenderPrivateKey: Buffer, PublicKey: Buffer): Promise<Buffer>;
}
/**
 * This class implements the SIKE CryptoPQ.
 */
export declare class SIKE {
    constructor();
    /**
     * @returns KeyPair as keys object
     */
    createKeyPair(): Promise<keys>;
    /**
     * Takes a public key and returns 32 bytes of shared data, and the bytes encrypted.
     * @param publicKey from SIKE key pair
     * @returns [shared bytes, Crypto Bytes]
     */
    encryptKey(publicKey: Buffer): Promise<encRet>;
    /**
     * Takes the privatekey and ciphered bytes and returns the decrypted bytes
     * @param privateKey Key from key pair.
     * @param cipherBytes The encrypted bytes.
     * @returns The decrypted shared bytes.
     */
    decryptKey(privateKey: Buffer, cipherBytes: Buffer): Promise<Buffer>;
}
export declare class Sha3 {
    shake256(input: Buffer, outLength: number): Promise<Buffer>;
}
