/// <reference types="node" />
const { SIKE } = require('../lib/index');
const expect = require('chai').expect



describe('SIKE TEST', () => {

    let privateKey = 'IDg36EqoFSRWppYozKC4kt96Lly0+j9agbd0jjWnV4JoKA657D0LRZalGDEygLGtT06/3NrAbaySjXkhVf2HZ/uEJ2u57ulXZn3tj1zJD9G0fM3HTkx8FblUiN7bvVG0XLZwB/Lzb+mmiRJKEFx2gcllc8wg6FRBT8RYOQceBKC5lf8vhs6Oz0vMGcvsOYh6SILkxXbmKIo4ynTyD/nPFqZAy1V15rX6URs6L17RAdkw5S6yY8tQdI4qb6bWhKkME3hOU49gNawgQMP7nX6Z4IS66r1Xe/0TEu7iLKvkBG59lLkej2Yp65Wmxng6eQiT+HLXHNmVRddsZK+PPAvtKFh91LbFvFt+XXptAaofkVGifZSaK6P6eaqL2RpXMrLAFTE5hT0HH/VwQhky8svABJLUDSVTUQs+NUFNSWXPClSbmHW7v6OsFyWX5TsICAShqanRRrqae8MZrHJMCV85C74ntbTC679jw7x34sMgX0fEeqgeS6+FXsQm20GSEqlQ7pAZVszZeFa8ByoEMuHcsOfLne5kBiLz6uhAAQIDmdfn+YMy83dkGcuVJ2Sm1twKGq88Jz1pyidZoYWVWq8Xbss4Qpt2/IfeLgHArsVHsYeWKU9DujfS8QPJKlxqtuWLXQMGWJzOt+Xe0uaoQzUx28VFGF/lZmI/4y7vSBwTgukJk9iU7SKQD1+AIL+CA385Cb3FkxsU92yAODIzOq2DyGpC+AymWWjWpq+sV2caoxbPz7U925jt1zDvwohncCOfs0OsCFTsPa6BHj8GJEA48Jz21rH7ZbmL/EE=';

    let publicKey = '0bR8zcdOTHwVuVSI3tu9UbRctnAH8vNv6aaJEkoQXHaByWVzzCDoVEFPxFg5Bx4EoLmV/y+Gzo7PS8wZy+w5iHpIguTFduYoijjKdPIP+c8WpkDLVXXmtfpRGzovXtEB2TDlLrJjy1B0jipvptaEqQwTeE5Tj2A1rCBAw/udfpnghLrqvVd7/RMS7uIsq+QEbn2UuR6PZinrlabGeDp5CJP4ctcc2ZVF12xkr488C+0oWH3UtsW8W35dem0Bqh+RUaJ9lJoro/p5qovZGlcyssAVMTmFPQcf9XBCGTLyy8AEktQNJVNRCz41QU1JZc8KVJuYdbu/o6wXJZflOwgIBKGpqdFGupp7wxmsckwJXzkLvie1tMLrv2PDvHfiwyBfR8R6qB5Lr4VexCbbQZISqVDukBlWzNl4VrwHKgQy4dyw58ud7mQGIvPq6EABAgM=';


    before(()=>{
        this.kem = new SIKE();
    });
    
    this.keyPair = {};
    describe('KeyPair', () => {
        
        
       before(async () => {
      
          this.keyPair = await this.kem.createKeyPair();
    
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
            const retVars = await this.kem.encryptKey(this.keyPair.PublicKey);
            this.cryptoBytes = retVars.cipherBytes;
            this.sharedSecret= retVars.secureKey;
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
        this.retBytes = await this.kem.decryptKey(this.keyPair.PrivateKey, this.cryptoBytes);
        });

        it('shared secret', () => {
        expect(this.retBytes.length).to.be.equal(32); 
        });
        it('Secrets are equal', () => {
        expect(this.retBytes.toString('hex')).to.be.equal(this.sharedSecret.toString('hex')); 
        });
    });
});
