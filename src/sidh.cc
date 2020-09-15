#include <napi.h>
#ifdef __cplusplus  
extern "C" { 
#endif 
    #include "P751_api.h"
    /* Declarations of this file */
#ifdef __cplusplus 
} 
#endif 

// all of your legacy C code here


Napi::Value createPrivateA(const Napi::CallbackInfo& info) {

  unsigned char PrivateKeyA[SIDH_SECRETKEYBYTES_A];

  Napi::Env env = info.Env();

  random_mod_order_A_SIDHp751(PrivateKeyA);

  Napi::Buffer<unsigned char> retBuf = Napi::Buffer<unsigned char>::Copy(env,PrivateKeyA,SIDH_SECRETKEYBYTES_A);
  return retBuf;
}

Napi::Value createPrivateB(const Napi::CallbackInfo& info) {

   unsigned char PrivateKeyB[SIDH_SECRETKEYBYTES_B];

  Napi::Env env = info.Env();

  //random_mod_order_B_SIDHp751(PrivateKeyB);

  Napi::Buffer<unsigned char> retBuf1 = Napi::Buffer<unsigned char>::Copy(env,PrivateKeyB,SIDH_SECRETKEYBYTES_B);
  return retBuf1;
}

void createKeyPairA(const Napi::CallbackInfo& info) {

  Napi::Env env = info.Env();

  unsigned char PrivateKeyA[SIDH_SECRETKEYBYTES_A];

  unsigned char PublicKeyA[SIDH_PUBLICKEYBYTES];

  Napi::Function cb = info[0].As<Napi::Function>();

  random_mod_order_A_SIDHp751(PrivateKeyA);

  //unsigned int i;

  //for(i = 0; i < SIDH_SECRETKEYBYTES_A; i++) {
 //       printf("%02X", (PrivateKeyA[i]));
 // }
  //printf("\n\n");
 // unsigned char* PrivateKey = info[0].As<Napi::Buffer<unsigned char>>().Data();

//  unsigned char* PrivateKey1 = reinterpret_cast<unsigned char*>(info[0].As<Napi::Buffer<unsigned char>>().Data());

  EphemeralKeyGeneration_A_SIDHp751(PrivateKeyA, PublicKeyA);

  Napi::Buffer<unsigned char> bufPriPKA = Napi::Buffer<unsigned char>::Copy(env,PrivateKeyA,SIDH_SECRETKEYBYTES_A);
  Napi::Buffer<unsigned char> bufPubA = Napi::Buffer<unsigned char>::Copy(env,PublicKeyA,SIDH_PUBLICKEYBYTES);
  
 

  //for(i = 0; i < SIDH_SECRETKEYBYTES_A; i++) {
    //    printf("%02X", (PrivateKeyA[i]));
  //}
  //printf("\n\n");

   // for(i = 0; i < SIDH_PUBLICKEYBYTES; i++) {
    //    printf("%02X", (PublicKeyA[i]));
  //}
  //printf("\n\n");

 
  cb.Call(env.Global(), {bufPriPKA, bufPubA});

}

void createKeyPairB(const Napi::CallbackInfo& info) {

   Napi::Env env = info.Env();

  

  unsigned char PrivateKeyB[SIDH_SECRETKEYBYTES_B];

  unsigned char PublicKeyB[SIDH_PUBLICKEYBYTES];

  Napi::Function cb1 = info[0].As<Napi::Function>();

  random_mod_order_B_SIDHp751(PrivateKeyB);
 // unsigned char* PrivateKey = info[0].As<Napi::Buffer<unsigned char>>().Data();

//  unsigned char* PrivateKey1 = reinterpret_cast<unsigned char*>(info[0].As<Napi::Buffer<unsigned char>>().Data());
  
  //unsigned int i;

  //for(i = 0; i < SIDH_SECRETKEYBYTES_B; i++) {
    //    printf("%02X", (PrivateKeyB[i]));
  //}
  //printf("\n\n");

  EphemeralKeyGeneration_B_SIDHp751(PrivateKeyB, PublicKeyB);

  

  //for(i = 0; i < SIDH_SECRETKEYBYTES_B; i++) {
  //      printf("%02X", (PrivateKeyB[i]));
  //}
  //printf("\n\n");

    //for(i = 0; i < SIDH_PUBLICKEYBYTES; i++) {
    //    printf("%02X", (PublicKeyB[i]));
 // }
  //printf("\n\n");

  Napi::Buffer<unsigned char> bufPriPKB = Napi::Buffer<unsigned char>::Copy(env,PrivateKeyB,SIDH_SECRETKEYBYTES_B);
  Napi::Buffer<unsigned char> bufPubB = Napi::Buffer<unsigned char>::Copy(env,PublicKeyB,SIDH_PUBLICKEYBYTES);
  
  //unsigned int i;
 /*
  for(i = 0; i < SIDH_SECRETKEYBYTES_B; i++) {
        printf("%02X", (PrivateKeyB[i]));
  }
  printf("\n\n");

    for(i = 0; i < SIDH_PUBLICKEYBYTES; i++) {
        printf("%02X", (PublicKeyB[i]));
  }
  printf("\n\n");
 */
 
  cb1.Call(env.Global(), {bufPriPKB, bufPubB});
}

Napi::Value sharedKeyA(const Napi::CallbackInfo& info) {

  Napi::Env env = info.Env();

  unsigned char* PrivateKeyAS = info[0].As<Napi::Buffer<unsigned char>>().Data();

  unsigned char* PublicKeyBS = info[1].As<Napi::Buffer<unsigned char>>().Data();

  unsigned char SharedSecretA[SIDH_BYTES];
     


  EphemeralSecretAgreement_A_SIDHp751(PrivateKeyAS, PublicKeyBS, SharedSecretA);   

  Napi::Buffer<unsigned char> retBuf4 = Napi::Buffer<unsigned char>::Copy(env,SharedSecretA,SIDH_BYTES);

  return retBuf4;
}

Napi::Value sharedKeyB(const Napi::CallbackInfo& info) {

  Napi::Env env = info.Env();

  unsigned char* PrivateKeyBS = info[0].As<Napi::Buffer<unsigned char>>().Data();

  unsigned char* PublicKeyBS = info[1].As<Napi::Buffer<unsigned char>>().Data();

  unsigned char SharedSecretB[SIDH_BYTES];
     

  EphemeralSecretAgreement_B_SIDHp751(PrivateKeyBS, PublicKeyBS, SharedSecretB);   

  Napi::Buffer<unsigned char> retBuf5 = Napi::Buffer<unsigned char>::Copy(env,SharedSecretB,SIDH_BYTES);

  
  //unsigned int i;
   //for(i = 0; i < SIDH_BYTES; i++) {
   //     printf("%02X", (SharedSecretB[i]));
  //}
  //printf("\n\n");
//
  return retBuf5;
}

Napi::Value TEST(const Napi::CallbackInfo& info) {

  Napi::Env env = info.Env();

 // unsigned char* PrivateKeyBS = info[0].As<Napi::Buffer<unsigned char>>().Data();

 //  unsigned char* PublicKeyBS = info[1].As<Napi::Buffer<unsigned char>>().Data();
    unsigned char PrivateKeyA[SIDH_SECRETKEYBYTES_A], PrivateKeyB[SIDH_SECRETKEYBYTES_B];
    unsigned char PublicKeyA[SIDH_PUBLICKEYBYTES], PublicKeyB[SIDH_PUBLICKEYBYTES];
    unsigned char SharedSecretA[SIDH_BYTES], SharedSecretB[SIDH_BYTES];


    random_mod_order_A_SIDHp751(PrivateKeyA);
   //random_mod_order_B_SIDHp751(PrivateKeyB);

    EphemeralKeyGeneration_A_SIDHp751(PrivateKeyA, PublicKeyA);

    EphemeralKeyGeneration_B_SIDHp751(PrivateKeyB,PublicKeyB);

    EphemeralSecretAgreement_A_SIDHp751(PrivateKeyA, PublicKeyB, SharedSecretA);          
    EphemeralSecretAgreement_B_SIDHp751(PrivateKeyB, PublicKeyA, SharedSecretB);           

    //int i;

    //for(i = 0; i < 188; i++) {
     //   printf("%X", (SharedSecretA[i]));
    //}
    //printf("\n\n");
    //for(i = 0; i < 188; i++) {
    //    printf("%X", (SharedSecretB[i]));
    //}
    //printf("\n\n");
 

  Napi::Buffer<unsigned char> retBuf5 = Napi::Buffer<unsigned char>::Copy(env,SharedSecretB,SIDH_BYTES);


  return retBuf5;
}


Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "createPrivateA"),
              Napi::Function::New(env, createPrivateA));
  exports.Set(Napi::String::New(env, "createPrivateB"),
              Napi::Function::New(env, createPrivateB));
  exports.Set(Napi::String::New(env, "createKeyPairA"),
              Napi::Function::New(env, createKeyPairA));
  exports.Set(Napi::String::New(env, "createKeyPairB"),
              Napi::Function::New(env, createKeyPairB));
  exports.Set(Napi::String::New(env, "sharedKeyA"),
              Napi::Function::New(env, sharedKeyA));
  exports.Set(Napi::String::New(env, "sharedKeyB"),
              Napi::Function::New(env, sharedKeyB));
  exports.Set(Napi::String::New(env, "TEST"),
              Napi::Function::New(env, TEST));
  return exports;
}

NODE_API_MODULE(sidh, Init)
