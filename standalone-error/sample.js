// Taken from: https://kripken.github.io/blog/wasm/2019/07/16/asyncify.html & modified
const fs = require('fs');

(async () => {
    const wasmFile = fs.readFileSync('sample.wasm')
    const module = await WebAssembly.instantiate(wasmFile.buffer, {
      wasi_snapshot_preview1: {
          proc_exit(code) {
              console.log('EXIT ' + code)
          }
      },
      env: {
        async_sleep: function(ms) {
          /*
          if (!sleeping) {
            // We are called in order to start a sleep/unwind.
            console.log('sleep...');
            // Fill in the data structure. The first value has the stack location,
            // which for simplicity we can start right after the data structure itself.
            view[DATA_ADDR >> 2] = DATA_ADDR + 8;
            // The end of the stack will not be reached here anyhow.
            view[DATA_ADDR + 4 >> 2] = 1024;
            wasmExports.asyncify_start_unwind(DATA_ADDR);
            sleeping = true;
            // Resume after the proper delay.
            setTimeout(function() {
              console.log('timeout ended, starting to rewind the stack');
              wasmExports.asyncify_start_rewind(DATA_ADDR);
              // The code is now ready to rewind; to start the process, enter the
              // first function that should be on the call stack.
              wasmExports._start();
            }, ms);
          } else {
            // We are called as part of a resume/rewind. Stop sleeping.
            console.log('...resume');
            wasmExports.asyncify_stop_rewind();
            sleeping = false;
          }
          */
        },
      }
    })
    const wasmExports = module.instance.exports;
    // const view = new Int32Array(wasmExports.memory.buffer);

    // // Global state for running the program.
    // const DATA_ADDR = 16; // Where the unwind/rewind data structure will live.
    // let sleeping = false;

    // Run the program. When it pauses control flow gets to here, as the
    // stack has unwound.
    wasmExports._start();
    //console.log('stack unwound');
    //wasmExports.asyncify_stop_unwind();
})()
