// @ts-check

const {SIDH } =require('../lib/index')

const expect = require('chai').expect;

describe('SIDH TEST', () =>  {
    before(() => {
        this.sidh = new SIDH();
    });
        describe('create random bytes', () => {
            before(async () =>{
                this.bytes = await this.sidh.randomBytes(64);
            });
            it('should return bytes', () => {
                expect(this.bytes.length).to.equal(64);
            });
        });
        describe('Initiator keys should be equal in length', () => {
            before(async () => {
                this.keyPair = await this.sidh.createKeyPair();
                await this.sidh.createPubA(this.keyPair.PrivateKey);
            }); 
            it('Private Key', () =>{
                expect(this.keyPair.PrivateKey.length).to.be.equal(47);
            });
            it('Public Key', () =>{
                expect(this.keyPair.PublicKey.length).to.be.equal(564);
            });   
        });
        describe('Return Sender keys should be equal in length', () => {
            before(async () => {
                this.sender = await this.sidh.senderKeys();
            }); 
            it('Private Key', () =>{
                expect(this.sender.PrivateKey.length).to.be.equal(48);
            });
            it('Public Key', () =>{
                expect(this.sender.PublicKey.length).to.be.equal(564);
            });   
        });
        describe('Shared secret should be equal', () => {
            before(async () => {
                this.shared = await this.sidh.sharedKey(this.keyPair.PrivateKey, this.sender.PublicKey);
                this.senderShared = await this.sidh.sharedKeySender(this.sender.PrivateKey, this.keyPair.PublicKey);
            });
            it('Equal Secret', () =>{
                expect(this.shared.toString('hex')).to.be.equal(this.senderShared.toString('hex'));
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
