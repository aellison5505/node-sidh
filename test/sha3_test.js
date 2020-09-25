const {  Sha3 } = require('../lib/index');
const expect = require('chai').expect;

describe('SHA3', () => { 
    before(() => {
        this.sha3 =new Sha3();
      
    });
    describe('#shake256', () => { 
        before( async () => {
            let send = Buffer.from('This is the best!');
            this.len = 64;
           this.hash = await this.sha3.shake256(send,this.len);
        });
        it('Should return hash length equal to request', () => {
            expect(this.hash.length).to.be.equal(64);
        });
    });
});