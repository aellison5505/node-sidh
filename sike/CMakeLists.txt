
add_library(node-sike SHARED $<TARGET_OBJECTS:sike> $<TARGET_OBJECTS:Shake256> $<TARGET_OBJECTS:random>  $<TARGET_OBJECTS:generic> $<TARGET_OBJECTS:P751_compressed>)
  
set_target_properties(node-sike PROPERTIES PREFIX "" SUFFIX ".node")


install(TARGETS node-sike
                    CONFIGURATIONS Release
                    LIBRARY DESTINATION "lib"
                    ARCHIVE DESTINATION "lib"
                    RUNTIME DESTINATION "lib"
                    COMPONENT library)
    

