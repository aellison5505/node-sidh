{
  "targets": [
    {
      "target_name": "node-sidh",
      "cflags!": [ "-fno-exceptions"],
      "cflags_cc!": [ "-fno-exceptions"],
      "cflags": [ "-std=c++11" , "-fPIC"],
      "cflags_cc": [ "-std=c++11" , "-fPIC"],
      "sources": [ "src/sidh.cc" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "/mnt/d/dev/node-sidh/include",
        "/mnt/d/dev/node-sidh/node_modules/node-addon-api"
      ],
      'libraries': ["-L/mnt/d/dev/node-sidh/include/","-lsidh"],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ]
    }
  ]
}
