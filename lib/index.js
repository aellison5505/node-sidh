"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sha3 = exports.SIKE = exports.SIDH = void 0;
const node_sidh_1 = require("../lib/node-sidh");
const node_sike_1 = require("../lib/node-sike");
const node_sha3_1 = require("../lib/node-sha3");
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
    /**
     * Produces random bytes
     * @param length bytes
     */
    randomBytes(length) {
        return new Promise((res, err) => __awaiter(this, void 0, void 0, function* () {
            let retBuf = Buffer.alloc(length);
            let r = node_sidh_1.random(retBuf, length);
            res(retBuf);
        }));
    }
    /**
     * Creates a key pair
     * @returns key object
     */
    createKeyPair() {
        return new Promise((res, err) => {
            try {
                node_sidh_1.createKeyPairA((PrivateA, PubA) => {
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
    createPubA(privateKey) {
        return new Promise((res, err) => {
            let pubKey = node_sidh_1.createPublicA(privateKey);
            res(pubKey);
        });
    }
    senderKeys() {
        return new Promise((res, err) => {
            try {
                node_sidh_1.createKeyPairB((PrivateA, PubA) => {
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
            res(node_sidh_1.sharedKeyA(PrivateKey, SenderPublicKey));
        });
    }
    sharedKeySender(SenderPrivateKey, PublicKey) {
        return new Promise((res, err) => {
            res(node_sidh_1.sharedKeyB(SenderPrivateKey, PublicKey));
        });
    }
}
exports.SIDH = SIDH;
/**
 * This class implements the SIKE CryptoPQ.
 */
class SIKE {
    constructor() {
    }
    /**
     * @returns KeyPair as keys object
     */
    createKeyPair() {
        return new Promise((ret) => {
            let pubKey = Buffer.alloc(node_sike_1.PUBLICKEYBYTES);
            let priKey = Buffer.alloc(node_sike_1.SECRETKEYBYTES);
            node_sike_1.createKeyPair(pubKey, priKey);
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
    encryptKey(publicKey) {
        return new Promise((ret) => {
            let ct = Buffer.alloc(node_sike_1.CIPHERTEXTBYTES);
            let sKey = Buffer.alloc(node_sike_1.CRYPTO_BYTES);
            node_sike_1.encrypt(ct, sKey, publicKey);
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
    decryptKey(privateKey, cipherBytes) {
        return new Promise((ret) => {
            let sKey = Buffer.alloc(node_sike_1.CRYPTO_BYTES);
            node_sike_1.decrypt(sKey, cipherBytes, privateKey);
            ret(sKey);
        });
    }
}
exports.SIKE = SIKE;
class Sha3 {
    shake256(input, outLength) {
        return new Promise((ret) => {
            let out = Buffer.alloc(outLength, 0);
            node_sha3_1.shake256(outLength, input, out);
            ret(out);
        });
    }
}
exports.Sha3 = Sha3;
//# sourceMappingURL=index.js.map