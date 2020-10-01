
project(objSike C)

set(CMAKE_POSITION_INDEPENDENT_CODE true)
set (CMAKE_C_STANDARD 11)

add_compile_options(-O3 -D_AMD64_ -D_GENERIC_  -D__NIX__ -march=native)

add_subdirectory(sha3)
add_subdirectory(random)
add_subdirectory(P751)


