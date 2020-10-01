
add_subdirectory(generic)

#file(GLOB SRC "P751_api.h" "P751_compressed_api.h" "P751_compressed.c" "P751.c" "P751_internal.h")

add_library(P751 OBJECT "P751_api.h" "P751.c" "P751_internal.h")

add_library(P751_compressed OBJECT "P751_compressed_api.h" "P751_compressed.c" "P751_internal.h")


