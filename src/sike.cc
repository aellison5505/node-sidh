#include "sike.h"

Napi::Value createKeyPair(const Napi::CallbackInfo& info) {

  Napi::Env env = info.Env();

    Napi::Buffer<uint8_t> pk = info[0].As<Napi::Buffer<uint8_t>>();

    Napi::Buffer<uint8_t> sk = info[1].As<Napi::Buffer<uint8_t>>();

    int i = keypair(pk.Data(),sk.Data());

    return Napi::Number::New(env, i);

}

Napi::Value encrypt(const Napi::CallbackInfo& info) {

  Napi::Env env = info.Env();

  Napi::Buffer<uint8_t> ct = info[0].As<Napi::Buffer<uint8_t>>();

  Napi::Buffer<uint8_t> ss = info[1].As<Napi::Buffer<uint8_t>>();

  Napi::Buffer<uint8_t> pk = info[2].As<Napi::Buffer<uint8_t>>();
  
  int i = enc(ct.Data(),ss.Data(), pk.Data()); 

  return Napi::Number::New(env, i);

}

Napi::Value decrypt(const Napi::CallbackInfo& info) {

  Napi::Env env = info.Env();

  Napi::Buffer<uint8_t> ss = info[0].As<Napi::Buffer<uint8_t>>();

  Napi::Buffer<uint8_t> ct = info[1].As<Napi::Buffer<uint8_t>>();

  Napi::Buffer<uint8_t> sk = info[2].As<Napi::Buffer<uint8_t>>();

  int i = dec(ss.Data(), ct.Data(), sk.Data());

  return Napi::Number::New(env, i);

}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "createKeyPair"),
              Napi::Function::New(env, createKeyPair));
   exports.Set(Napi::String::New(env, "encrypt"),
              Napi::Function::New(env, encrypt));
  exports.Set(Napi::String::New(env, "decrypt"),
              Napi::Function::New(env, decrypt));
  exports.Set(Napi::String::New(env, "SECRETKEYBYTES"),
              Napi::Number::New(env, SECRETKEYBYTES));
  exports.Set(Napi::String::New(env, "PUBLICKEYBYTES"),
              Napi::Number::New(env, PUBLICKEYBYTES));
  exports.Set(Napi::String::New(env, "CIPHERTEXTBYTES"),
              Napi::Number::New(env, CIPHERTEXTBYTES));
  exports.Set(Napi::String::New(env, "CRYPTO_BYTES"),
              Napi::Number::New(env, CRYPTO_BYTES));
  return exports;
}

NODE_API_MODULE(kyber, Init)
