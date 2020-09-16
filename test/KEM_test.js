// @ts-check
const {sike } = require('../lib/index');
const expect = require('chai').expect



let main =  async () => {
    let ret = {};
    let kem = new sike();
    ret.keyPair = await kem.createKeyPair();
    return ret
}     

 
describe('KEM TEST', async () => {
 
    let ret = await main();

    describe('KeyPair', () => {
       it('Private Key', () => {
        expect(ret.keyPair.PrivateKey.length).to.be.equal(602); 
       });
       it('Public Key', () => {
        expect(ret.keyPair.PublicKey.length).to.be.equal(335); 
       });
    }); 
    console.log('end')
});
