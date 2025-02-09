
import { createKeyPairA, createKeyPairB, sharedKeyA, sharedKeyB, createPublicA, random }  from '../lib/node-sidh';
import { CIPHERTEXTBYTES, CRYPTO_BYTES, PUBLICKEYBYTES, SECRETKEYBYTES, createKeyPair, decrypt, encrypt } from '../lib/node-sike';

import { shake256 } from '../lib/node-sha3';
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
    secureKey: Buffer,
    cipherBytes: Buffer
}


/**
 * This class uses post-crypto SIDH and creates keyPairs and the shared secret.
 */
export class SIDH {

    PrivateKey: Buffer;
    PublicKey: Buffer;
    SenderKey:Buffer;
    SenderPublic:Buffer;
    
    constructor() {
        this.PrivateKey = Buffer.alloc(0);
        this.PublicKey = Buffer.alloc(0);
        this.SenderKey = Buffer.alloc(0);
        this.SenderPublic = Buffer.alloc(0);
    }

    /**
     * Produces random bytes
     * @param length bytes
     */
    randomBytes(length: number): Promise<Buffer> {
        return new Promise(async (res,err) => {
            let retBuf = Buffer.alloc(length);
            let r = random(retBuf, length);
            res(retBuf);
         });
    }
    /**
     * Creates a key pair
     * @returns key object
     */
    createKeyPair(): Promise<keys> {
        return new Promise((res,err) => {
            try{
                createKeyPairA((PrivateA, PubA) => {
                    this.PrivateKey = PrivateA;
                    this.PublicKey = PubA;
                 //   console.log(PrivateA.toString('hex'), PrivateA.length);
               //     console.log(PubA.toString('hex'), PubA.length);
                    res(this.keyPair);
                });
            }catch(err1){
                err(err1);
            }
        })
    }

    get keyPair():keys {
        return {
            PrivateKey: this.PrivateKey,
            PublicKey: this.PublicKey
        }
    }

    get senderKeyPair():keys {
        return {
            PrivateKey: this.SenderKey,
            PublicKey: this.SenderPublic
        }
    }

    createPubA(privateKey: Buffer): Promise<Buffer> {
        return new Promise((res,err) => {
            let pubKey = createPublicA(privateKey);
            res(pubKey);
        });
    }

    senderKeys():Promise<keys> {
        return new Promise((res,err) => {
            try{
                createKeyPairB((PrivateA, PubA) => {
                    this.SenderKey = PrivateA;
                    this.SenderPublic = PubA;
             //       console.log(PrivateA.toString('hex'), PrivateA.length);
               //     console.log(PubA.toString('hex'), PubA.length);
                    res(this.senderKeyPair);
                });
            }catch(err1){
                err(err1);
            }
        })
    }

    sharedKey(PrivateKey: Buffer, SenderPublicKey:Buffer): Promise<Buffer> {
        return new Promise((res,err) => {
            res(sharedKeyA(PrivateKey, SenderPublicKey));
        });       
    }

    sharedKeySender(SenderPrivateKey: Buffer, PublicKey:Buffer): Promise<Buffer> {
        return new Promise((res,err) => {
            res(sharedKeyB(SenderPrivateKey, PublicKey));
        });       
    }

}

/**
 * This class implements the SIKE CryptoPQ.
 */
export class SIKE {

    constructor() {
       
    }

    /**
     * @returns KeyPair as keys object
     */
    createKeyPair(): Promise<keys> {
        return new Promise<keys>((ret) => {
            let pubKey = Buffer.alloc(PUBLICKEYBYTES);
            let priKey = Buffer.alloc(SECRETKEYBYTES);
            createKeyPair(pubKey, priKey);
            ret({
                PrivateKey: priKey,
                PublicKey: pubKey
            });
        });
    }

    /**
     * Takes a public key and returns 32 bytes of shared data, and the bytes encrypted.
     * @param publicKey from SIKE key pair
     * @returns [shared bytes, Crypto Bytes]
     */
    encryptKey(publicKey: Buffer):  Promise<encRet> {
        return new Promise<encRet>((ret) => { 
            let ct = Buffer.alloc(CIPHERTEXTBYTES);
            let sKey = Buffer.alloc(CRYPTO_BYTES);
            encrypt(ct, sKey, publicKey);
            ret({
                secureKey: sKey,
                cipherBytes: ct
            });
        });
    }

    /**
     * Takes the privatekey and ciphered bytes and returns the decrypted bytes
     * @param privateKey Key from key pair.
     * @param cipherBytes The encrypted bytes.
     * @returns The decrypted shared bytes.
     */
    decryptKey(privateKey: Buffer, cipherBytes: Buffer):  Promise<Buffer> {
        return new Promise<Buffer>((ret) => { 
            let sKey = Buffer.alloc(CRYPTO_BYTES);
            decrypt(sKey, cipherBytes, privateKey);
            ret(sKey);
        });
    }
}

export class Sha3 {

    shake256(input: Buffer, outLength: number): Promise<Buffer> {
        return new Promise<Buffer>((ret) => {
            let out = Buffer.alloc(outLength, 0);
            shake256(outLength,input, out);
            ret(out);
        });
        
    }
}