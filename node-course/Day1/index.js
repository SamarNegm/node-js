const fs = require("fs");
const Stream = require("stream");

const upperTransformer = new Stream.Transform();

upperTransformer._transform = (chunk, encoding, callback) => {
    const transformedChunk = chunk.toString().toUpperCase();
    upperTransformer.push(transformedChunk);
    callback();
};

const readStream = fs.createReadStream("./text.txt", {
    encoding: "utf-8",
    highWaterMark: 1,
});
const witeStream = fs.createWriteStream("./write-stream-upper.txt");
readStream.pipe(upperTransformer).pipe(witeStream);
// readStream.on("data", (chunk) => {
//     console.log("chunk =>", chunk);
//     witeStream.write(chunk);
// });

// readStream.on("end", () => {
//     console.log("reading ended");
//     witeStream.end(() => {
//         console.log('end callback')
//     });
//     // witeStream.close(() => {
//     //     console.log('close writing')
//     // })
// });

// witeStream.on('finish', () => {
//     console.log('finished writing')
// })

// try {
//     console.log('no error')
//     throw Error()
//     console.log('error commented')
// } catch (error) {
//     console.log("error!!!!")
// } finally {
//     console.log('da kda kda')
// }
