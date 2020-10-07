
project(objSike C)

set(CMAKE_POSITION_INDEPENDENT_CODE true)
set (CMAKE_C_STANDARD 11)

#set (WINDOWS_EXPORT_ALL_SYMBOLS ON)

IF(WIN32)
    add_compile_options(/O2 /D_AMD64_ /D_GENERIC_  /D__WINDOWS__)
    add_definitions(/D__WINDOWS__ /D_AMD64_ /D_GENERIC_)
ELSE()
    add_compile_options(-O3 -D_AMD64_ -D_GENERIC_  -D__NIX__ -march=native)
    add_definitions(-D__NIX__  -D_AMD64_ -D_GENERIC_)
ENDIF()

include_directories(sha3 random P751)

add_subdirectory(sha3)
add_subdirectory(random)
add_subdirectory(P751)


