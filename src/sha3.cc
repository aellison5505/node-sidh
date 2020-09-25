#include "sha3.h"


Napi::Value _shake256(const Napi::CallbackInfo& info) {

     Napi::Env env = info.Env();

    Napi::Number outlen = info[0].As<Napi::Number>();

    Napi::Buffer<unsigned char> input = info[1].As<Napi::Buffer<unsigned char>>();

    Napi::Number inlen = Napi::Number::New(env, input.Length());

    Napi::Buffer<unsigned char> output = Napi::Buffer<unsigned char>::New(env, outlen.DoubleValue());

    shake256(output.Data(),outlen.DoubleValue(),input.Data(),inlen.DoubleValue());

    return output;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "shake256"),
              Napi::Function::New(env, _shake256));
return exports;

}

NODE_API_MODULE(sha3, Init)
