
project(objSike C)

set(CMAKE_POSITION_INDEPENDENT_CODE true)
set (CMAKE_C_STANDARD 11)

IF(WIN32)
    add_compile_options(/O2 /D_AMD64_ /D_GENERIC_  /D__WINDOWS__)
ELSE()
    add_compile_options(-O3 -D_AMD64_ -D_GENERIC_  -D__NIX__ -march=native)
ENDIF()

add_subdirectory(sha3)
add_subdirectory(random)
add_subdirectory(P751)
 

