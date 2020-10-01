cmake_minimum_required(VERSION 2.8)

add_definitions(-DNAPI_EXPERIMENTAL)
add_definitions(-DNAPI_VERSION=3)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/lib)

project(lib-SI CXX)

message(${CMAKE_HOST_SYSTEM_NAME}-${CMAKE_HOST_SYSTEM_PROCESSOR})
message(${CMAKE_HOST_SYSTEM_VERSION})

set(CMAKE_POSITION_INDEPENDENT_CODE true)
set (CMAKE_CXX_STANDARD 11)


add_subdirectory(deps)
add_subdirectory(src)

#add_subdirectory(sidh)
#add_subdirectory(sike)

add_library(node-sidh SHARED $<TARGET_OBJECTS:sidh> $<TARGET_OBJECTS:Shake256> $<TARGET_OBJECTS:random>  $<TARGET_OBJECTS:generic> $<TARGET_OBJECTS:P751>)

add_library(node-sike SHARED $<TARGET_OBJECTS:sike> $<TARGET_OBJECTS:Shake256> $<TARGET_OBJECTS:random>  $<TARGET_OBJECTS:generic> $<TARGET_OBJECTS:P751_compressed>)

add_library(node-sha3 SHARED $<TARGET_OBJECTS:Shake256> $<TARGET_OBJECTS:sha3>)
  
set_target_properties(node-sidh node-sike node-sha3 PROPERTIES PREFIX "" SUFFIX ".node")

install(TARGETS node-sidh node-sike node-sha3
                    CONFIGURATIONS Release
                    LIBRARY DESTINATION "lib"
                    ARCHIVE DESTINATION "lib"
                    RUNTIME DESTINATION "lib"
                    COMPONENT library)
    

