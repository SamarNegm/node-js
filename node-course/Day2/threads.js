const crypto = require("crypto");

process.env.UV_THREADPOOL_SIZE = 4;

const start = Date.now();

/** Non-Blocking */

crypto.pbkdf2("mypassword", "mysalt", 100000, 1024, "sha512", () => {
    console.log("time:", ((Date.now() - start) / 1000).toFixed(2));
});

crypto.pbkdf2("mypassword", "mysalt", 100000, 1024, "sha512", () => {
    console.log("time:", ((Date.now() - start) / 1000).toFixed(2));
});

crypto.pbkdf2("mypassword", "mysalt", 100000, 1024, "sha512", () => {
    console.log("time:", ((Date.now() - start) / 1000).toFixed(2));
});

crypto.pbkdf2("mypassword", "mysalt", 100000, 1024, "sha512", () => {
    console.log("time:", ((Date.now() - start) / 1000).toFixed(2));
});

/** Blocking!!! */

crypto.pbkdf2Sync("mypassword", "mysalt", 100000, 1024, "sha512");
console.log("time:", ((Date.now() - start) / 1000).toFixed(2));

crypto.pbkdf2Sync("mypassword", "mysalt", 100000, 1024, "sha512");
console.log("time:", ((Date.now() - start) / 1000).toFixed(2));

crypto.pbkdf2Sync("mypassword", "mysalt", 100000, 1024, "sha512");
console.log("time:", ((Date.now() - start) / 1000).toFixed(2));

crypto.pbkdf2Sync("mypassword", "mysalt", 100000, 1024, "sha512");
console.log("time:", ((Date.now() - start) / 1000).toFixed(2));
