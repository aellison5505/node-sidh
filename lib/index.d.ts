/// <reference types="node" />
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
    createKeyPair(): Promise<keys>;
    get keyPair(): keys;
    get senderKeyPair(): keys;
    senderKeys(): Promise<keys>;
    sharedKey(PrivateKey: Buffer, SenderPublicKey: Buffer): Promise<Buffer>;
    sharedKeySender(SenderPrivateKey: Buffer, PublicKey: Buffer): Promise<Buffer>;
}
export declare class sike {
    PrivateKey: Buffer;
    PublicKey: Buffer;
    constructor();
    createKeyPair(): Promise<keys>;
    get keyPair(): keys;
    encrypt(publicKey: Buffer): Promise<[Buffer, Buffer]>;
    decrypt(privateKey: Buffer, cipherBytes: Buffer): Promise<Buffer>;
}
