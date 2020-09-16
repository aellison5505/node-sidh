/// <reference types="node" />
const { sike } = require('../lib/index');
const expect = require('chai').expect



describe('SIKE TEST', () => {
   // let kem;
    let keyPair;
    let sharedSecret;
    let cryptoBytes;
    let kem;

    before(()=>{
        this.kem = new sike();
    });
    

    describe('KeyPair', () => {

       before(async () => {
        this.keyPair = await this.kem.createKeyPair();
        console.log('')
       });

       it('Private Key', () => {
        expect(this.keyPair.PrivateKey.length).to.be.equal(602); 
       });
       it('Public Key', () => {
        expect(this.keyPair.PublicKey.length).to.be.equal(335); 
       });
    }); 

    describe('Encrypt', () => {
           before(async () => {
            [this.sharedSecret, this.cryptoBytes] = await this.kem.encrypt(this.keyPair.PublicKey);
           });
    
           it('shared secret', () => {
            expect(this.sharedSecret.length).to.be.equal(32); 
           });
           it('Crypto Bytes', () => {
            expect(this.cryptoBytes.length).to.be.equal(410); 
           });
    });

    describe('Decrypt', () => {
        before(async () => {
           this.retBytes = await this.kem.decrypt(this.keyPair.PrivateKey, this.cryptoBytes);
        });
 
        it('shared secret', () => {
         expect(this.retBytes.length).to.be.equal(32); 
        });
        it('Secrets are equal', () => {
         expect(this.retBytes.toString('hex')).to.be.equal(this.sharedSecret.toString('hex')); 
        });
 });
    
});
