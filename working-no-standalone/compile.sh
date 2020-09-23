#! /usr/bin/env bash

emcc sample.c -s ASYNCIFY=1 -s 'ASYNCIFY_IMPORTS=["async_sleep"]' -o sample.js -s ERROR_ON_UNDEFINED_SYMBOLS=0
