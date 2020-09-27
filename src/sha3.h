#ifndef SHA3_H
#define SHA3_H

#ifdef __cplusplus
extern "C" {
#endif

#include "fips202.h"
#include "random.h"

#ifdef __cplusplus
}
#endif
#include <napi.h>

Napi::Number _shake256(const Napi::CallbackInfo& info);

#endif