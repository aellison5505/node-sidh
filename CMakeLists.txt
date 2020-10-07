cmake_minimum_required(VERSION 2.8)

add_definitions(-DNAPI_EXPERIMENTAL)
add_definitions(-DNAPI_VERSION=3)
#set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/lib)


IF(WIN32)
    add_compile_options(/O2 /D_AMD64_ /D_GENERIC_  /D__WINDOWS__)
ELSE()
    add_compile_options(-O3 -D_AMD64_ -D_GENERIC_  -D__NIX__ -march=native)
ENDIF()

project(lib-SI CXX)

message(${CMAKE_HOST_SYSTEM_NAME}-${CMAKE_HOST_SYSTEM_PROCESSOR})


set(CMAKE_POSITION_INDEPENDENT_CODE true)

set (CMAKE_CXX_STANDARD 11)


add_subdirectory(deps)
add_subdirectory(src)

add_library(node-sidh SHARED $<TARGET_OBJECTS:sidh> $<TARGET_OBJECTS:Shake256> $<TARGET_OBJECTS:random>  $<TARGET_OBJECTS:generic> $<TARGET_OBJECTS:P751>)

add_library(node-sike SHARED $<TARGET_OBJECTS:sike> $<TARGET_OBJECTS:Shake256> $<TARGET_OBJECTS:random>  $<TARGET_OBJECTS:generic> $<TARGET_OBJECTS:P751_compressed>)

add_library(node-sha3 SHARED $<TARGET_OBJECTS:Shake256> $<TARGET_OBJECTS:sha3>)

target_link_libraries(node-sidh ${CMAKE_JS_LIB})

target_link_libraries(node-sike ${CMAKE_JS_LIB})

target_link_libraries(node-sha3 ${CMAKE_JS_LIB})

set_target_properties(node-sidh node-sike node-sha3 PROPERTIES PREFIX "" SUFFIX ".node")

    

