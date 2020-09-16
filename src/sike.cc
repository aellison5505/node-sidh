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


Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "createKEMKeyPair"),
              Napi::Function::New(env, createKEMKeyPair));
  return exports;
}

NODE_API_MODULE(sike, Init)
