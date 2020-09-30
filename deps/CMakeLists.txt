
set(CMAKE_POSITION_INDEPENDENT_CODE true)
set (CMAKE_C_STANDARD 11)

add_compile_options(-O3 _AMD64_ _GENERIC_ __NIX__ -march=native)

file(GLOB SOURCE_FILES "sha3/*.h" "sha/*.c")

add_library(libsike OBJECT ${SOURCE_FILES})

set_target_properties(libsike PROPERTIES LINKER_LANGUAGE C)

