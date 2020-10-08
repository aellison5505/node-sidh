
project(objSike C)

set(CMAKE_POSITION_INDEPENDENT_CODE true)
set (CMAKE_C_STANDARD 11)

#set (WINDOWS_EXPORT_ALL_SYMBOLS ON)

include_directories(sha3 random P751)

add_subdirectory(sha3)
add_subdirectory(random)
add_subdirectory(P751)


