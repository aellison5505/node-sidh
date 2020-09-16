"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_sidh_node_1 = require("../include/node-sidh.node");
const node_sike_1 = require("../include/node-sike");
/**
 * This class uses post-crypto SIDH and creates keyPairs and the shared secret.
 */
class SIDH {
    constructor() {
        this.PrivateKey = Buffer.alloc(0);
        this.PublicKey = Buffer.alloc(0);
        this.SenderKey = Buffer.alloc(0);
        this.SenderPublic = Buffer.alloc(0);
    }
    createKeyPair() {
        return new Promise((res, err) => {
            try {
                node_sidh_node_1.createKeyPairA((PrivateA, PubA) => {
                    this.PrivateKey = PrivateA;
                    this.PublicKey = PubA;
                    //   console.log(PrivateA.toString('hex'), PrivateA.length);
                    //     console.log(PubA.toString('hex'), PubA.length);
                    res(this.keyPair);
                });
            }
            catch (err1) {
                err(err1);
            }
        });
    }
    get keyPair() {
        return {
            PrivateKey: this.PrivateKey,
            PublicKey: this.PublicKey
        };
    }
    get senderKeyPair() {
        return {
            PrivateKey: this.SenderKey,
            PublicKey: this.SenderPublic
        };
    }
    senderKeys() {
        return new Promise((res, err) => {
            try {
                node_sidh_node_1.createKeyPairB((PrivateA, PubA) => {
                    this.SenderKey = PrivateA;
                    this.SenderPublic = PubA;
                    //       console.log(PrivateA.toString('hex'), PrivateA.length);
                    //     console.log(PubA.toString('hex'), PubA.length);
                    res(this.senderKeyPair);
                });
            }
            catch (err1) {
                err(err1);
            }
        });
    }
    sharedKey(PrivateKey, SenderPublicKey) {
        return new Promise((res, err) => {
            res(node_sidh_node_1.sharedKeyA(PrivateKey, SenderPublicKey));
        });
    }
    sharedKeySender(SenderPrivateKey, PublicKey) {
        return new Promise((res, err) => {
            res(node_sidh_node_1.sharedKeyB(SenderPrivateKey, PublicKey));
        });
    }
}
exports.SIDH = SIDH;
class sike {
    constructor() {
        this.PrivateKey = Buffer.alloc(0);
        this.PublicKey = Buffer.alloc(0);
    }
    createKeyPair() {
        return new Promise((ret) => {
            node_sike_1.createKEMKeyPair((PriKey, PubKey) => {
                this.PrivateKey = PriKey,
                    this.PublicKey = PubKey;
                ret(this.keyPair);
            });
        });
    }
    get keyPair() {
        return {
            PrivateKey: this.PrivateKey,
            PublicKey: this.PublicKey
        };
    }
}
exports.sike = sike;
