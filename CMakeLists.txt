cmake_minimum_required(VERSION 2.8)

project(node-sidh C CXX)

message(${CMAKE_HOST_SYSTEM_NAME}-${CMAKE_HOST_SYSTEM_PROCESSOR})
message(${CMAKE_HOST_SYSTEM_VERSION})

add_subdirectory(deps)

add_library(${PROJECT_NAME} SHARED $<TARGET_OBJECTS:libsike>)

set_target_properties(${PROJECT_NAME} PROPERTIES LINKER_LANGUAGE CXX)
