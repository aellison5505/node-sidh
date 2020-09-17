#ifdef __cplusplus
extern "C" {
#endif

#include "P751_compressed_api.h"

#ifdef __cplusplus
}
#endif
#include <napi.h>

void createKEMKeyPair(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  Napi::Function cb = info[0].As<Napi::Function>();

  unsigned char PrivateKey[CRYPTO_SECRETKEYBYTES];
  unsigned char PublicKey[CRYPTO_PUBLICKEYBYTES];

  crypto_kem_keypair_SIKEp751_compressed(PublicKey, PrivateKey);

   Napi::Buffer<unsigned char> bufKey = Napi::Buffer<unsigned char>::Copy(env,PrivateKey,CRYPTO_SECRETKEYBYTES);

   Napi::Buffer<unsigned char> bufPub = Napi::Buffer<unsigned char>::Copy(env,PublicKey,CRYPTO_PUBLICKEYBYTES);
  


  cb.Call(env.Global(), {bufKey, bufPub});

}

void KEMEncrypt(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  Napi::Buffer<unsigned char> publicKey = info[0].As<Napi::Buffer<unsigned char>>();

  Napi::Function cb = info[1].As<Napi::Function>();

  unsigned char sharedSecret[CRYPTO_BYTES];
  unsigned char cBytes[CRYPTO_CIPHERTEXTBYTES];

  memset(sharedSecret,0,CRYPTO_BYTES);
 
  crypto_kem_enc_SIKEp751_compressed(cBytes,sharedSecret,(unsigned char*)publicKey.Data());

   Napi::Buffer<unsigned char> bufSS = Napi::Buffer<unsigned char>::Copy(env,sharedSecret,CRYPTO_BYTES);

   Napi::Buffer<unsigned char> bufCrypt = Napi::Buffer<unsigned char>::Copy(env,cBytes,CRYPTO_CIPHERTEXTBYTES);
  
  cb.Call(env.Global(), {bufSS, bufCrypt});

}

void KEMDecrypt(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  Napi::Buffer<unsigned char> privateKey = info[0].As<Napi::Buffer<unsigned char>>();

  Napi::Buffer<unsigned char> cBytes = info[1].As<Napi::Buffer<unsigned char>>();

  Napi::Buffer<unsigned char>sharedSecret = Napi::Buffer<unsigned char>::New(env, CRYPTO_BYTES);

  Napi::Function cb = info[2].As<Napi::Function>();

  //unsigned char sharedSecret[CRYPTO_BYTES];

  //memset(sharedSecret,0,CRYPTO_BYTES);
 
  crypto_kem_dec_SIKEp751_compressed(sharedSecret.Data(),cBytes.Data(),privateKey.Data());

 // Napi::Buffer<unsigned char> bufSS = Napi::Buffer<unsigned char>::Copy(env,sharedSecret,CRYPTO_BYTES);
  


  cb.Call(env.Global(), {sharedSecret});

}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "createKEMKeyPair"),
              Napi::Function::New(env, createKEMKeyPair));
   exports.Set(Napi::String::New(env, "KEMEncrypt"),
              Napi::Function::New(env, KEMEncrypt));
  exports.Set(Napi::String::New(env, "KEMDecrypt"),
              Napi::Function::New(env, KEMDecrypt));
  return exports;
}

NODE_API_MODULE(sike, Init)
