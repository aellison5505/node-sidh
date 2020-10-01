
add_library(node-sidh SHARED $<TARGET_OBJECTS:sidh> $<TARGET_OBJECTS:Shake256> $<TARGET_OBJECTS:random>  $<TARGET_OBJECTS:generic> $<TARGET_OBJECTS:P751>)
  
set_target_properties(node-sidh PROPERTIES PREFIX "" SUFFIX ".node")


install(TARGETS node-sidh
                    CONFIGURATIONS Release
                    LIBRARY DESTINATION "lib"
                    ARCHIVE DESTINATION "lib"
                    RUNTIME DESTINATION "lib"
                    COMPONENT library)
    

