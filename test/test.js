// @ts-check

const {SIDH } =require('../lib/index')

const expect = require('chai').expect;

let keyPair;
let sender;
let shared;
let senderShared;

let startTest = async () => {
   
    let sidh= new SIDH();
    keyPair = await sidh.createKeyPair();
    sender = await sidh.senderKeys();
    shared = await sidh.sharedKey(keyPair.PrivateKey, sender.PublicKey);
    senderShared = await sidh.sharedKeySender(sender.PrivateKey, keyPair.PublicKey);
}

describe('SIDH TEST', () =>  {
    startTest();
        describe('Initiator keys should be equal in length', () => {
            it('Private Key', () =>{
                expect(keyPair.PrivateKey.length).to.be.equal(47);
            });
            it('Private Key', () =>{
                expect(keyPair.PublicKey.length).to.be.equal(564);
            });   
        });
        describe('Return Sender keys should be equal in length', () => {
            it('Private Key', () =>{
                expect(sender.PrivateKey.length).to.be.equal(48);
            });
            it('Private Key', () =>{
                expect(sender.PublicKey.length).to.be.equal(564);
            });   
        });
        describe('Shared secret should be equal', () => {
            it('Equal Secret', () =>{
                expect(shared.toString('hex')).to.be.equal(senderShared.toString('hex'));
            }); 
        });
});
        
   
/*
var PrivateKeyA;
var PubKeyA;

    let a = (PrivateKeyA, PubKeyA) => {
        createKeyPairA((PrivateA, PubA) => {
            PrivateKeyA = PrivateA;
            PubKeyA = PubA;
            console.log(PrivateKeyA.toString('hex'), PrivateKeyA.length);
            console.log(PubKeyA.toString('hex'), PubKeyA.length);
            b(PrivateKeyA, PubKeyA);
        });
    }
    

   
    
    let b = (PrivateKeyA, PubKeyA) => {
        createKeyPairB((PrivateB, PubB) => {
            var PrivateKeyB = PrivateB;
            var PubKeyB = PubB;
            console.log(PrivateKeyB.toString('hex'), PrivateKeyB.length);
            console.log(PubKeyB.toString('hex'), PubKeyB.length);
            let secA = sharedKeyA(PrivateKeyA, PubKeyB);
    
            console.log(secA.toString('hex'), secA.length);
            let secB = sharedKeyB(PrivateKeyB, PubKeyA);

            console.log(secB.toString('hex'), secB.length);
            (secA.toString('hex') === secB.toString('hex') ? console.log('true'): console.log('false'));
            assert(secA.toString('hex'), secB.toString('hex'));
        });
    }

a(PrivateKeyA, PubKeyA);
 

    







//let test = TEST();

//console.log(test.toString('hex'), test.length);
*/
