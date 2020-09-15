"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_sidh_node_1 = require("../include/node-sidh.node");
class SIDH {
    createKeyPair() {
        return new Promise((res, err) => {
            try {
                node_sidh_node_1.createKeyPairA((PrivateA, PubA) => {
                    this.PrivateKey = PrivateA;
                    this.PublicKey = PubA;
                    console.log(PrivateA.toString('hex'), PrivateA.length);
                    console.log(PubA.toString('hex'), PubA.length);
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
                    console.log(PrivateA.toString('hex'), PrivateA.length);
                    console.log(PubA.toString('hex'), PubA.length);
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
