####  Makefile for compilation on Unix-like operative systems  ####

OPT=-O3     # Optimization option by default

CC=gcc
ifeq "$(CC)" "gcc"
    COMPILER=gcc
else ifeq "$(CC)" "clang"
    COMPILER=clang
else ifeq "$(CC)" "cl"
    COMPILER=cl
endif

ARCHITECTURE=_AMD64_
USE_OPT_LEVEL=_GENERIC_
ifeq "$(ARCH)" "x64"
    ARCHITECTURE=_AMD64_
    USE_OPT_LEVEL=_GENERIC_
else ifeq "$(ARCH)" "x86"
    ARCHITECTURE=_X86_
    USE_OPT_LEVEL=_GENERIC_
else ifeq "$(ARCH)" "s390x"
    ARCHITECTURE=_S390X_
    USE_OPT_LEVEL=_GENERIC_
else ifeq "$(ARCH)" "ARM"
    ARCHITECTURE=_ARM_
    USE_OPT_LEVEL=_GENERIC_
    ARM_TARGET=YES
else ifeq "$(ARCH)" "ARM64"
    ARCHITECTURE=_ARM64_
    USE_OPT_LEVEL=_GENERIC_
    ARM_TARGET=YES
endif

ifeq "$(OPT_LEVEL)" "GENERIC"
    USE_OPT_LEVEL=_GENERIC_
endif

ifeq "$(ARM_TARGET)" "YES"
    ARM_SETTING=-lrt
endif

ifeq "$(ARCHITECTURE)" "_AMD64_"
    ifeq "$(USE_OPT_LEVEL)" "_FAST_"
        MULX=-D _MULX_
        ifeq "$(USE_MULX)" "FALSE"
            MULX=
        else
            ADX=-D _ADX_
            ifeq "$(USE_ADX)" "FALSE"
                ADX=
            endif
        endif
    endif
endif

AR=ar rcs
RANLIB=ranlib

ADDITIONAL_SETTINGS=-march=native
ifeq "$(CC)" "clang"
ifeq "$(ARM_TARGET)" "YES"
    ADDITIONAL_SETTINGS=
endif
endif
ifeq "$(ARCHITECTURE)" "_S390X_"
	ADDITIONAL_SETTINGS=-march=z10
endif

CFLAGS=$(OPT) -fpic $(ADDITIONAL_SETTINGS) -D $(ARCHITECTURE) -D __NIX__ -D $(USE_OPT_LEVEL) $(MULX) $(ADX)
LDFLAGS=-lm
ifeq "$(USE_OPT_LEVEL)" "_GENERIC_"
    EXTRA_OBJECTS_751=objs751/fp_generic.o
endif

OBJECTS_751=objs751/P751.o $(EXTRA_OBJECTS_751) objs/random.o objs/fips202.o

OBJECTS_751_COMP=objs751comp/P751_compressed.o $(EXTRA_OBJECTS_751) objs/random.o objs/fips202.o

all: lib751 lib751comp librandom libsha3

objs751/%.o: P751/%.c
	@mkdir -p $(@D)
	$(CC) -c $(CFLAGS) $< -o $@

objs751comp/%.o: P751/%.c
	@mkdir -p $(@D)
	$(CC) -c $(CFLAGS) $< -o $@

ifeq "$(USE_OPT_LEVEL)" "_GENERIC_"		

    objs751/fp_generic.o: P751/generic/fp_generic.c
	    $(CC) -c $(CFLAGS) P751/generic/fp_generic.c -o objs751/fp_generic.o

endif

objs/random.o: random/random.c
	@mkdir -p $(@D)
	$(CC) -c $(CFLAGS) random/random.c -o objs/random.o

objs/fips202.o: sha3/fips202.c
	$(CC) -c $(CFLAGS) sha3/fips202.c -o objs/fips202.o


lib751: $(OBJECTS_751)
	rm -rf lib751 sike751 sidh751
	mkdir lib751 sike751 sidh751
	$(AR) lib751/libsidh.a $^
	$(RANLIB) lib751/libsidh.a

lib751comp: $(OBJECTS_751_COMP)
	rm -rf lib751comp sike751_compressed sidh751_compressed
	mkdir lib751comp sike751_compressed sidh751_compressed
	$(AR) lib751comp/libsidh.a $^
	$(RANLIB) lib751comp/libsidh.a

libsha3: objs/fips202.o
	rm -rf libsha3
	mkdir libsha3
	$(AR) libsha3/libsha3.a $^
	$(RANLIB) libsha3/libsha3.a

librandom: objs/random.o
	rm -rf librandom
	mkdir librandom
	$(AR) librandom/librandom.a $^
	$(RANLIB) librandom/librandom.a

install: lib751 lib751comp libsha3 librandom
	

.PHONY: clean

clean:
	rm -rf *.req objs434* objs503* objs610* objs751* objs lib434* lib503* lib610* lib751* sidh434* sidh503* sidh610* sidh751* sike434* sike503* sike610* sike751* arith_tests-* librandom* libsha3*


