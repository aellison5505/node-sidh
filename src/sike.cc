#include "sike.h"
#include <napi.h>

using namespace Napi;

void createKEMKeyPair(const CallbackInfo& info) {
  Env env = info.Env();

  Function cb = info[0].As<Function>();

  //unsigned char PrivateKey[CRYPTO_SECRETKEYBYTES];
  //unsigned char PublicKey[CRYPTO_PUBLICKEYBYTES];

  Buffer<unsigned char> PrivateKey = Buffer<unsigned char>::New(env, CRYPTO_SECRETKEYBYTES);

  Buffer<unsigned char> PublicKey = Buffer<unsigned char>::New(env, CRYPTO_PUBLICKEYBYTES);

  crypto_kem_keypair_SIKEp751_compressed(PublicKey.Data(), PrivateKey.Data());

  //Buffer<unsigned char> bufKey = Buffer<unsigned char>::Copy(env,PrivateKey,CRYPTO_SECRETKEYBYTES);

  //Buffer<unsigned char> bufPub = Buffer<unsigned char>::Copy(env,PublicKey,CRYPTO_PUBLICKEYBYTES);

  cb.Call(env.Global(), {PrivateKey, PublicKey});

}

void KEMEncrypt(const CallbackInfo& info) {
  Env env = info.Env();

  Buffer<unsigned char> publicKey = info[0].As<Buffer<unsigned char>>();

  Function cb = info[1].As<Function>();

  Buffer<unsigned char> sharedSecret = Buffer<unsigned char>::New(env, CRYPTO_BYTES);

  Buffer<unsigned char> cBytes = Buffer<unsigned char>::New(env, CRYPTO_CIPHERTEXTBYTES);

  memset(sharedSecret.Data(), 0, CRYPTO_BYTES);
 
  crypto_kem_enc_SIKEp751_compressed(cBytes.Data(),sharedSecret.Data(),publicKey.Data());
  
  cb.Call(env.Global(), {sharedSecret,cBytes});

  //return json_string;

}

void KEMDecrypt(const CallbackInfo& info) {
  Env env = info.Env();

  Buffer<unsigned char> privateKey = info[0].As<Buffer<unsigned char>>();

  Buffer<unsigned char> cBytes = info[1].As<Buffer<unsigned char>>();

  Buffer<unsigned char>sharedSecret = Buffer<unsigned char>::New(env, CRYPTO_BYTES);

  Function cb = info[2].As<Function>();

  //unsigned char sharedSecret[CRYPTO_BYTES];

  //memset(sharedSecret,0,CRYPTO_BYTES);
 
  crypto_kem_dec_SIKEp751_compressed(sharedSecret.Data(),cBytes.Data(),privateKey.Data());

 // Buffer<unsigned char> bufSS = Buffer<unsigned char>::Copy(env,sharedSecret,CRYPTO_BYTES);
  


  cb.Call(env.Global(), {sharedSecret});

}

Object Init(Env env, Object exports) {
  exports.Set(String::New(env, "createKEMKeyPair"),
              Function::New(env, createKEMKeyPair));
   exports.Set(String::New(env, "KEMEncrypt"),
              Function::New(env, KEMEncrypt));
  exports.Set(String::New(env, "KEMDecrypt"),
              Function::New(env, KEMDecrypt));
  return exports;
}

NODE_API_MODULE(sike, Init)
