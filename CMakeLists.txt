cmake_minimum_required(VERSION 2.8)

project(lib-SI CXX)

add_definitions(-DNAPI_EXPERIMENTAL)

add_definitions(-DNAPI_VERSION=3)

IF(${CMAKE_SYSTEM_PROCESSOR} MATCHES "64")
    IF(${CMAKE_SYSTEM_PROCESSOR} MATCHES "AMD" OR ${CMAKE_SYSTEM_PROCESSOR} MATCHES "amd" OR ${CMAKE_SYSTEM_PROCESSOR} MATCHES "X86" OR ${CMAKE_SYSTEM_PROCESSOR} MATCHES "x86")
        set(arch _AMD64_)
    ELSEIF(${CMAKE_SYSTEM_PROCESSOR} MATCHES "arm" OR ${CMAKE_SYSTEM_PROCESSOR} MATCHES "ARM")
        set(arch _ARM64_)
    ELSE()
        message("Unsupported ARCHITECTURE")
        return()
    ENDIF()
ELSEIF(${CMAKE_SYSTEM_PROCESSOR} MATCHES "x86" OR ${CMAKE_SYSTEM_PROCESSOR} MATCHES "x86") 
    set(arch _X86_)
ELSEIF(${CMAKE_SYSTEM_PROCESSOR} MATCHES "arm" OR ${CMAKE_SYSTEM_PROCESSOR} MATCHES "ARM")
    set(arch _ARM_)
ELSEIF(${CMAKE_SYSTEM_PROCESSOR} MATCHES "390")
    set(arch _S390X_)
ELSE()
    message("Unsupported ARCHITECTURE")
    return()
ENDIF()

IF(WIN32)
    add_compile_options(/O2 /D_GENERIC_ /D${arch} /Wd4244 /D__WINDOWS__)
    add_definitions(/D__WINDOWS__ /D${arch} /D_GENERIC_)
    set(blib Bcrypt.lib)
ELSE()
    add_compile_options(-O3 -D_GENERIC_ -D${arch} -D__NIX__ -march=native)
    add_definitions(-D__NIX__ -D${arch} -D_GENERIC_)
    set(blib )
ENDIF()

set(CMAKE_POSITION_INDEPENDENT_CODE true)

set (CMAKE_CXX_STANDARD 11)

message(${CMAKE_HOST_SYSTEM_NAME}-${CMAKE_HOST_SYSTEM_PROCESSOR})

add_subdirectory(deps)
add_subdirectory(src)

add_library(node-sidh SHARED $<TARGET_OBJECTS:sidh> $<TARGET_OBJECTS:Shake256> $<TARGET_OBJECTS:random>  $<TARGET_OBJECTS:generic> $<TARGET_OBJECTS:P751>)

add_library(node-sike SHARED $<TARGET_OBJECTS:sike> $<TARGET_OBJECTS:Shake256> $<TARGET_OBJECTS:random>  $<TARGET_OBJECTS:generic> $<TARGET_OBJECTS:P751_compressed>)

add_library(node-sha3 SHARED $<TARGET_OBJECTS:Shake256> $<TARGET_OBJECTS:sha3>)

target_link_libraries(node-sidh ${CMAKE_JS_LIB} ${blib})

target_link_libraries(node-sike ${CMAKE_JS_LIB} ${blib})

target_link_libraries(node-sha3 ${CMAKE_JS_LIB} ${blib})

set_target_properties(node-sidh node-sike node-sha3 PROPERTIES PREFIX "" SUFFIX ".node")

    

