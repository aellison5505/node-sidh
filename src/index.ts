
import { createKeyPairA, createKeyPairB, sharedKeyA, sharedKeyB  }  from '../include/node-sidh.node';
import { createKEMKeyPair } from '../include/node-sike';

export interface keys {
    PrivateKey: Buffer;
    PublicKey: Buffer;
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

export class sike {
    PrivateKey: Buffer;
    PublicKey: Buffer;

    constructor() {
        this.PrivateKey = Buffer.alloc(0);
        this.PublicKey = Buffer.alloc(0);
    }

    createKeyPair(): Promise<keys> {
        return new Promise<keys>((ret) => {
            createKEMKeyPair((PriKey: Buffer, PubKey: Buffer) => {
                this.PrivateKey = PriKey,
                this.PublicKey = PubKey
                ret(this.keyPair);
            });
        });
    }

    get keyPair(): keys {
        return {
            PrivateKey: this.PrivateKey,
            PublicKey: this.PublicKey
        }
    }
}