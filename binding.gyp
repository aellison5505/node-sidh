{
  "targets": [
    {
      "target_name": "node-sidh",
       "cflags!": [ "-fno-exceptions"],
      "cflags_cc!": [ "-fno-exceptions"],
      "cflags": [ "-std=c++11" , "-fPIC"],
      "cflags_cc": [ "-std=c++11" , "-fPIC"],
        'libraries': ["-L/mnt/d/dev/node-sidh/include/","-lsidh" ],
      
      "sources": [ "src/sidh.cc" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "./include",
        "./node_modules/node-addon-api"
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    },
    {
      "target_name": "node-sike",
      "cflags!": [ "-fno-exceptions"],
      "cflags_cc!": [ "-fno-exceptions"],
      "cflags": [ "-std=c++11" , "-fPIC"],
      "cflags_cc": [ "-std=c++11" , "-fPIC"],
      "sources": [ "src/sike.cc" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "/mnt/d/dev/node-sidh/include",
        "/mnt/d/dev/node-sidh/node_modules/node-addon-api"
      ],
      'libraries': ["-L/mnt/d/dev/node-sidh/include/","-lsidhComp"],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ]
    }
  ]
}

