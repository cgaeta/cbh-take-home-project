const crypto = require("crypto");

// moving constants so that a) they're not declared on every call, and b) so they're available to other functions
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

/** Hashes an event object */
const hashEvent = (event) => {
  const data = JSON.stringify(event);
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

exports.deterministicPartitionKey = (event) => {
  let candidate;

  candidate = event && (event.partitionKey ?? hashEvent(event));

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};
