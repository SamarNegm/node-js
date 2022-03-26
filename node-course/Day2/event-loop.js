const fs = require("fs");

// setTimeout(() => {
//     console.log("setTimeout");
// }, 0);
// setImmediate(() => {
//     console.log("setImmediate");
// });
// fs.readFile(__filename, () => {
//     console.log("readFile");
// });

setTimeout(() => {
    process.nextTick(() => {
        console.log('nextTick')
    })
    setTimeout(() => {
        console.log("setTimeout");
    }, 0);

    setTimeout(() => {
        console.log("setTimeout 100");
    }, 100);

    setImmediate(() => {
        console.log("setImmediate");
    });
    console.log('first st')
}, 0);

setImmediate(() => {
    console.log('top lvl immediate')
})

console.log("top lvl exec");
const data = fs.readFileSync(__filename)
console.log('blocking i/o ', data.length )