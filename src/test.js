//const  P751 = require('/mnt/d/dev/node-sidh/build/Release/node-sidh.node');
// @ts-check
const { createPrivateA,createPrivateB, createKeyPairA, createKeyPairB, sharedKeyA, sharedKeyB, TEST }  = require('./node-sidh.node');
const assert= require('assert');

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
        });
    }

a(PrivateKeyA, PubKeyA);
 

    







//let test = TEST();

//console.log(test.toString('hex'), test.length);


