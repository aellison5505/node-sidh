#ifndef H_SIKE
#define H_SIKE

#ifdef __cplusplus
extern "C" {
#endif

#include "P751_compressed_api.h"

#ifdef __cplusplus
}
#endif

#include <napi.h>

#define SECRETKEYBYTES     602     
#define PUBLICKEYBYTES     335   
#define CRYPTO_BYTES       32
#define CIPHERTEXTBYTES    410    

#define keypair crypto_kem_keypair_SIKEp751_compressed
#define enc crypto_kem_enc_SIKEp751_compressed
#define dec crypto_kem_dec_SIKEp751_compressed

Napi::Value createKeyPair(const Napi::CallbackInfo& info);

Napi::Value encrypt(const Napi::CallbackInfo& info);

Napi::Value decrypt(const Napi::CallbackInfo& info);

#endif

