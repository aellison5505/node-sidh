#include "sha3.h"


Napi::Number _shake256(const Napi::CallbackInfo& info) {

     Napi::Env env = info.Env();

    Napi::Number outlen = info[0].As<Napi::Number>();

    Napi::Buffer<unsigned char> input = info[1].As<Napi::Buffer<unsigned char>>();

    Napi::Buffer<unsigned char> output = info[2].As<Napi::Buffer<unsigned char>>();

    Napi::Number inlen = Napi::Number::New(env, input.Length());

   // Napi::Buffer<unsigned char> output = Napi::Buffer<unsigned char>::New(env, outlen.DoubleValue());

    shake256(output.Data(),outlen.DoubleValue(),input.Data(),inlen.DoubleValue());

    return Napi::Number::New(env,0);

}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "shake256"),
              Napi::Function::New(env, _shake256));
return exports;

}

NODE_API_MODULE(sha3, Init)
