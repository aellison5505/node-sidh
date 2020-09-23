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
    PrivateKey: Buffer;
    PublicKey: Buffer;
    constructor();
    /**
     * @returns KeyPair as keys object
     */
    createKeyPair(): Promise<keys>;
    get keyPair(): keys;
    /**
     * Takes a public key and returns 32 bytes of shared data, and the bytes encrypted.
     * @param publicKey from SIKE key pair
     * @returns [shared bytes, Crypto Bytes]
     */
    encrypt(publicKey: Buffer): Promise<[Buffer, Buffer]>;
    /**
     * Takes the privatekey and ciphered bytes and returns the decrypted bytes
     * @param privateKey Key from key pair.
     * @param cipherBytes The encrypted bytes.
     * @returns The decrypted shared bytes.
     */
    decrypt(privateKey: Buffer, cipherBytes: Buffer): Promise<Buffer>;
}
