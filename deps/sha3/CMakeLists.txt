

file(GLOB SHA_FILES "./*.h" "./*.c")

add_library(Shake256 OBJECT ${SHA_FILES})
