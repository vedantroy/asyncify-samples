#! /usr/bin/bash

emcc sample.c -s ASYNCIFY=1 -s 'ASYNCIFY_IMPORTS=["async_sleep"]' -o sample.wasm -s ERROR_ON_UNDEFINED_SYMBOLS=0
