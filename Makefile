PWD := $(shell echo %cd%)

rwildcard=$(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2) $(filter $(subst *,%,$2),$d))
UI_CODE = $(call rwildcard, ui-src/src, *)
UI_CODE += $(wildcard ui-src/*.*)
SOURCES = $(wildcard *.* client/* server/* lib/*)
SOURCES := $(filter-out README.md, $(SOURCES))
UI_BUNDLE=ui-build/bundle.js

default: $(UI_BUNDLE) README.md

all: check-devserver $(UI_BUNDLE) README.md

README.md: $(SOURCES) $(UI_CODE)
	-robocopy . //fivem.sszt.ml/server-data/resources/[wtf]/wtf_characters /MIR /FFT /Z /XA:H /W:5 \
		/XD "${PWD}\.git" \
			"${PWD}\ui-src"
	copy /b README.md +,,

$(UI_BUNDLE): $(UI_CODE)
	cd ui-src && yarn && yarn build

check-devserver:
	@netstat -nao | findstr "LISTENING" | findstr "0:3000" >nul 2>nul && (echo dev-server running, stopping 1>&2 && exit 1) || exit 0

.PHONY: default all