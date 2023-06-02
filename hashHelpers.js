const crypto = require("crypto");

/** Hash that we're using consistently across this exercise */
const createHash = (data) =>
  crypto.createHash("sha3-512").update(data).digest("hex");

exports.createHash = createHash;
