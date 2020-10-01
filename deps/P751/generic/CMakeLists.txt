

file(GLOB SRC "./*.h" "./*.c")

add_library(generic OBJECT ${SRC})
