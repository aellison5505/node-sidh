

file(GLOB SRC "./*.h" "./*.c")

add_library(random OBJECT ${SRC})
