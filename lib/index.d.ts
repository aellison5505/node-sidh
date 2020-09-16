/// <reference types="node" />
export interface keys {
    PrivateKey: Buffer;
    PublicKey: Buffer;
}
export declare class SIDH {
    "PrivateKey": Buffer;
    "PublicKey": Buffer;
    "SenderKey": Buffer;
    "SenderPublic": Buffer;
    createKeyPair(): Promise<keys>;
    get keyPair(): keys;
    get senderKeyPair(): keys;
    senderKeys(): Promise<keys>;
    sharedKey(PrivateKey: Buffer, SenderPublicKey: Buffer): Promise<Buffer>;
    sharedKeySender(SenderPrivateKey: Buffer, PublicKey: Buffer): Promise<Buffer>;
}
