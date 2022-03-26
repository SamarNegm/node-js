const fs = require("fs");
const util = require("util");

/** Callback Hell */

fs.readFile("./data/text.txt", (err, data) => {
    fs.writeFile("./data/write.txt", data, (err) => {
        console.log("writing is done");
    });
});

/** Promises */

const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve('promise resolved')
    } else {
        reject("promise reject");
    }
});

promise
    .then((data) => {
        console.log("then => ", data);
    })
    .catch((err) => console.log("catch =>", err));
console.log(promise);


/** Promisify'ing fs module functions  */

const readFileCB = (resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
}

const readFilePromiseV1 = (path) => {
    return new Promise(readFileCB);
};

const writeFilePromiseV1 = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

readFilePromise("./data/text.txt")
    .then((data) => {
        console.log("data =>", data);
        // writeFilePromise("./data/write.txt", data)
        //     .then(() => {
        //         console.log("file is written");
        //     })
        //     .catch((err) => {
        //         console.log("err =>", err);
        //     });
    })
    .catch((err) => {
        console.log("err =>", err);
    });

/** Promisify'ing fs module functions using utils  */

const readFilePromiseV2 = util.promisify(fs.readFile);
const writeFilePromiseV2 = util.promisify(fs.writeFile);

readFilePromise("./data/text.txt")
    .then((data) => {
        console.log("data =>", data);
        return writeFilePromise("./data/write.txt", data);
    })
    .then(() => {
        console.log("file is written");
    })
    .catch((err) => {
        console.log("err =>", err);
    });

(async () => {
    const data = await readFilePromise("./data/text.txt");
    await writeFilePromise("./data/write.txt", data);
})();

