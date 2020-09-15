
#ifdef __cplusplus
extern "C" {
#endif

#include "P751_api.h"
// all of your legacy C code here

#ifdef __cplusplus
}
#endif
#include <stdio.h>
#include <string.h>


 int main(){

    unsigned int i;
    unsigned char PrivateKeyA[SIDH_SECRETKEYBYTES_A], PrivateKeyB[SIDH_SECRETKEYBYTES_B];
    unsigned char PublicKeyA[SIDH_PUBLICKEYBYTES], PublicKeyB[SIDH_PUBLICKEYBYTES];
    unsigned char SharedSecretA[SIDH_BYTES], SharedSecretB[SIDH_BYTES];
     
   random_mod_order_A_SIDHp751(PrivateKeyA);
   random_mod_order_B_SIDHp751(PrivateKeyB);

    EphemeralKeyGeneration_A_SIDHp751(PrivateKeyA, PublicKeyA);

    EphemeralKeyGeneration_B_SIDHp751(PrivateKeyB,PublicKeyB);

    EphemeralSecretAgreement_A_SIDHp751(PrivateKeyA, PublicKeyB, SharedSecretA);          
    EphemeralSecretAgreement_B_SIDHp751(PrivateKeyB, PublicKeyA, SharedSecretB);           

    
    for(i = 0; i < 188; i++) {
        printf("%X", (SharedSecretA[i]));
    }
    printf("\n\n");
    for(i = 0; i < 188; i++) {
        printf("%X", (SharedSecretB[i]));
    }
    printf("\n\n");

    return 0;
   
   

    

 }



