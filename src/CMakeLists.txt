
include_directories(${CMAKE_JS_INC} ${CMAKE_SOURCE_DIR}/deps/P751 
    ${CMAKE_SOURCE_DIR}/deps/random
    ${CMAKE_SOURCE_DIR}/deps/sha3 )
#file(GLOB SRC "P751_api.h" "P751_compressed_api.h" "P751_compressed.c" "P751.c" "P751_internal.h")

add_library(sha3 OBJECT "sha3.cc" "sha3.h")

add_library(sidh OBJECT "sidh.cc" "sidh.h")

add_library(sike OBJECT "sike.cc" "sike.h")

execute_process(COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR
        )
string(REPLACE "\n" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
string(REPLACE "\"" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
target_include_directories(sha3 PRIVATE ${NODE_ADDON_API_DIR})
target_include_directories(sidh PRIVATE ${NODE_ADDON_API_DIR})
target_include_directories(sike PRIVATE ${NODE_ADDON_API_DIR})


